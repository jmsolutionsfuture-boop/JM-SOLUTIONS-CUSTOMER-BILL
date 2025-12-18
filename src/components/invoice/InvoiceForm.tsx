
import React, { useState, useEffect, useMemo } from 'react';
import { useStorage } from '../../hooks/useStorage';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import InvoiceTemplate from './InvoiceTemplate';
import type { InvoiceItem, Customer, Invoice } from '../../scripts/storage';

export const InvoiceForm: React.FC = () => {
  const { 
    settings, 
    customers, 
    saveInvoice, 
    getNextInvoiceNumber,
    getCustomer
  } = useStorage();

  const [invoiceData, setInvoiceData] = useState<Partial<Invoice>>({
    invoiceNumber: '',
    customerId: '',
    customerName: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    notes: '',
    items: [],
  });

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  useEffect(() => {
    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: getNextInvoiceNumber()
    }));
    
    // Check for pre-selected customer from URL
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    if (customerId) {
      handleCustomerChange(customerId);
    }
  }, [getNextInvoiceNumber]);

  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    const customer = getCustomer(id);
    if (customer) {
      setInvoiceData(prev => ({
        ...prev,
        customerId: id,
        customerName: customer.name
      }));
    }
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: field === 'description' ? value : parseFloat(value) || 0 };
        updated.total = updated.quantity * updated.unitPrice;
        return updated;
      }
      return item;
    }));
  };

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.total, 0), [items]);
  const tax = useMemo(() => subtotal * (settings.taxPercentage / 100), [subtotal, settings.taxPercentage]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const selectedCustomer = useMemo(() => 
    customers.find(c => c.id === selectedCustomerId), 
    [customers, selectedCustomerId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId) {
      alert('Por favor selecciona un cliente');
      return;
    }

    if (items.length === 0 || (items.length === 1 && !items[0].description)) {
      alert('Por favor agrega al menos un item con descripción');
      return;
    }

    const finalInvoice: any = {
      ...invoiceData,
      items: items.filter(i => i.description),
      subtotal,
      tax,
      taxPercentage: settings.taxPercentage,
      total,
    };

    try {
      saveInvoice(finalInvoice);
      window.location.href = '/facturas';
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al guardar la factura');
    }
  };

  const handleCancel = () => {
    if (confirm('¿Estás seguro de cancelar? Los cambios se perderán.')) {
      window.location.href = '/facturas';
    }
  };

  // Initial item
  useEffect(() => {
    if (items.length === 0) {
      addItem();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
      {/* Form Side */}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center gap-6">
           <h2 className="text-2xl font-bold">Datos de Factura</h2>
           <div className="flex gap-4">
            <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
            <Button variant="primary" onClick={handleSubmit}>✅ Guardar Factura</Button>
           </div>
        </div>

        <Card title="Información del Cliente">
          <Select 
            label="Seleccionar Cliente *"
            value={selectedCustomerId}
            onChange={(e) => handleCustomerChange(e.target.value)}
            options={[
              { value: '', label: '-- Seleccionar un cliente --' },
              ...customers.map(c => ({ value: c.id, label: `${c.name} (${c.rif})` }))
            ]}
          />
          {selectedCustomer && (
            <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <strong className="text-slate-900 text-lg">{selectedCustomer.name}</strong>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
                    <span>RIF: {selectedCustomer.rif}</span>
                    <span>📧 {selectedCustomer.email}</span>
                    <span>📱 {selectedCustomer.phone}</span>
                  </div>
                  <p className="m-0 text-sm text-slate-400 italic line-clamp-1 mt-1">📍 {selectedCustomer.address}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card title="Detalles de Facturación">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Número de Factura" 
              value={invoiceData.invoiceNumber} 
              readOnly 
              className="font-bold text-primary bg-slate-50" 
            />
            <Select 
              label="Estado"
              value={invoiceData.status}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, status: e.target.value as any }))}
              options={[
                { value: 'draft', label: 'Borrador' },
                { value: 'sent', label: 'Enviada' },
                { value: 'paid', label: 'Pagada' },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Input 
              label="Fecha de Emisión *" 
              type="date" 
              value={invoiceData.date}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
              required 
            />
            <Input 
              label="Fecha de Vencimiento *" 
              type="date" 
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
              required 
            />
          </div>
        </Card>

        <Card title="Items y Servicios">
          <div className="overflow-x-auto bg-slate-50 rounded-xl border border-slate-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[10px] uppercase tracking-widest font-bold text-slate-500">
                  <th className="p-4 text-left">Descripción</th>
                  <th className="p-4 text-center w-24">Cant.</th>
                  <th className="p-4 text-right w-32">Precio Unit.</th>
                  <th className="p-4 text-right w-32">Total</th>
                  <th className="p-4 text-center w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {items.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="p-2">
                      <textarea 
                        className="form-input !bg-transparent border-transparent group-hover:border-slate-200 focus:border-primary !px-3 font-medium text-slate-700" 
                        placeholder="Descripción del servicio..."
                        rows={1}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input 
                        type="number" 
                        className="form-input !bg-transparent border-transparent group-hover:border-slate-200 focus:border-primary !text-center !px-1" 
                        value={item.quantity}
                        min="0"
                        step="0.01"
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <input 
                        type="number" 
                        className="form-input !bg-transparent border-transparent group-hover:border-slate-200 focus:border-primary !text-right !px-1" 
                        value={item.unitPrice}
                        min="0"
                        step="0.01"
                        onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                      />
                    </td>
                    <td className="p-4 text-right font-bold text-slate-900">
                      ${item.total.toFixed(2)}
                    </td>
                    <td className="p-2 text-center">
                      <button 
                        type="button" 
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-error/10 text-slate-300 hover:text-error transition-all"
                        onClick={() => removeItem(item.id)}
                      >✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <Button variant="secondary" size="sm" onClick={addItem}>➕ Agregar Item</Button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-end gap-3 px-4">
            <div className="flex justify-between w-full max-w-[240px] text-slate-500 font-medium">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full max-w-[240px] text-slate-500 font-medium">
              <span>IVA ({settings.taxPercentage}%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full max-w-[240px] text-2xl font-bold text-slate-900 pt-4 border-t-2 border-slate-100">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Card title="Notas Adicionales">
          <textarea 
            className="form-textarea h-32" 
            placeholder="Términos de pago, información bancaria o agradecimientos..."
            value={invoiceData.notes}
            onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
          />
        </Card>
      </div>

      {/* Preview Side */}
      <div className="sticky top-28 h-fit">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 shrink-0 font-primary">Vista Previa Real</h2>
          <div className="h-1 flex-grow mx-6 bg-slate-100 rounded-full"></div>
          <span className="badge badge-info whitespace-nowrap">Actualización Automática</span>
        </div>
        <div className="bg-slate-200/50 p-8 rounded-2xl shadow-inner border border-slate-200 flex justify-center min-h-[900px] overflow-auto">
          <InvoiceTemplate 
            invoice={{ ...invoiceData, items, subtotal, tax, total } as any} 
            businessSettings={settings} 
            customer={selectedCustomer} 
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
