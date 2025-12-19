
import React, { useState, useEffect, useMemo } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import InvoiceTemplate from './InvoiceTemplate';
import type { InvoiceItem, Customer, Invoice } from '@/scripts/storage';
import { Plus, Trash2, Save, XCircle } from 'lucide-react';

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
      const savedInvoice = saveInvoice(finalInvoice);
      window.location.href = `/facturas/ver?id=${savedInvoice.id}`;
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
    <div className="grid grid-cols-1 xl:grid-cols-[1fr,500px] gap-8 pb-12">
      {/* Form Side */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-6">
           <div>
             <h2 className="text-2xl font-bold">Nueva Factura</h2>
             <p className="text-muted-foreground text-sm">Completa los campos para generar el documento.</p>
           </div>
           <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel}>
              <XCircle className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="w-4 h-4 mr-2" />
              Guardar Factura
            </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Seleccionar Cliente *</Label>
                <Select value={selectedCustomerId} onValueChange={handleCustomerChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Busca un cliente..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name} ({c.rif})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCustomer && (
                <div className="p-4 bg-muted/50 rounded-lg border text-sm">
                  <p className="font-bold flex items-center justify-between">
                    {selectedCustomer.name}
                    <Badge variant="outline">{selectedCustomer.rif}</Badge>
                  </p>
                  <p className="text-muted-foreground mt-1">{selectedCustomer.email}</p>
                  <p className="text-muted-foreground">{selectedCustomer.phone}</p>
                  <p className="text-muted-foreground truncate italic mt-2">{selectedCustomer.address}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalles Legales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Nº Factura</Label>
                  <Input value={invoiceData.invoiceNumber} readOnly className="bg-muted font-bold" />
                </div>
                <div className="grid gap-2">
                  <Label>Estado</Label>
                  <Select 
                    value={invoiceData.status} 
                    onValueChange={(v) => setInvoiceData(prev => ({ ...prev, status: v as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="sent">Enviada</SelectItem>
                      <SelectItem value="paid">Pagada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Emisión</Label>
                  <Input 
                    type="date" 
                    value={invoiceData.date}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Vencimiento</Label>
                  <Input 
                    type="date" 
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-bold">Items del Recibo</CardTitle>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Item
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="w-24 text-center">Cant.</TableHead>
                  <TableHead className="w-32 text-right">Precio</TableHead>
                  <TableHead className="w-32 text-right">Total</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input 
                        placeholder="Descripción..." 
                        className="h-8 border-transparent hover:border-input focus:border-input bg-transparent"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        className="h-8 text-center"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        className="h-8 text-right font-mono"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${item.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 flex flex-col items-end gap-2 px-4 py-4 bg-muted/20 rounded-lg">
              <div className="flex justify-between w-64 text-sm text-muted-foreground">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-64 text-sm text-muted-foreground">
                <span>IVA ({settings.taxPercentage}%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-64 text-xl font-bold pt-2 border-t mt-2">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Notas Adicionales</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-[100px]"
              placeholder="Escribe términos de pago, agradecimientos o notas importantes..."
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </CardContent>
        </Card>
      </div>

      {/* Preview Side */}
      <div className="h-fit sticky top-28">
        <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
          Vista Previa
          <Badge variant="secondary">Renderizado Real</Badge>
        </h3>
        <div className="bg-slate-200/50 p-8 rounded-xl shadow-inner overflow-auto max-h-[80vh] flex justify-center">
          <div className="scale-[0.8] origin-top">
            <InvoiceTemplate 
              invoice={{ ...invoiceData, items, subtotal, tax, total } as any} 
              businessSettings={settings} 
              customer={selectedCustomer} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
