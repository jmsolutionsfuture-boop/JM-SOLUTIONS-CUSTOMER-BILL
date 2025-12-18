
import React, { useState, useMemo } from 'react';
import { useStorage } from '../../hooks/useStorage';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import type { Customer } from '../../scripts/storage';

export const CustomerManagement: React.FC = () => {
  const { customers, invoices, saveCustomer, updateCustomer, deleteCustomer } = useStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    rif: '',
    email: '',
    phone: '',
    address: ''
  });

  const filteredCustomers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return customers.filter(c => 
      c.name.toLowerCase().includes(term) ||
      c.rif.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

  const handleOpenModal = (customer?: Customer) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name,
        rif: customer.rif,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
      });
    } else {
      setEditingCustomer(null);
      setFormData({
        name: '',
        rif: '',
        email: '',
        phone: '',
        address: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      saveCustomer(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar a ${name}?`)) {
      deleteCustomer(id);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Clientes</h1>
          <p className="text-slate-500 text-lg">Gestiona tus clientes y visualiza sus facturas</p>
        </div>
        <Button variant="primary" size="lg" className="shadow-lg" onClick={() => handleOpenModal()}>
          <span>➕</span> Nuevo Cliente
        </Button>
      </div>

      <div className="mb-12">
        <Input 
          type="text" 
          placeholder="Buscar clientes por nombre, RIF o email..." 
          className="text-lg py-3 shadow-sm focus:shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="text-center p-20 text-slate-500 text-xl bg-gray-50 rounded-xl border-4 border-dashed border-gray-200">
          <p>😊 No hay clientes que coincidan con la búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCustomers.map(customer => {
            const customerInvoices = invoices.filter(inv => inv.customerId === customer.id);
            const totalAmount = customerInvoices.reduce((sum, inv) => sum + inv.total, 0);

            return (
              <Card key={customer.id} className="flex flex-col hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center text-xl font-bold shadow-inner shrink-0">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-xl font-bold text-slate-900 truncate" title={customer.name}>{customer.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{customer.rif}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="w-5 text-center">📧</span>
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="w-5 text-center">📱</span>
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="w-5 text-center">📍</span>
                    <span className="line-clamp-1">{customer.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl mb-6">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-primary">{customerInvoices.length}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Facturas</span>
                  </div>
                  <div className="text-center border-l border-slate-200">
                    <span className="block text-xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <a href={`/clientes/${customer.id}`} className="btn btn-outline py-2 text-xs justify-center col-span-2 mb-2">Ver Detalle y Facturas</a>
                  <Button variant="secondary" className="py-2 text-xs justify-center" onClick={() => handleOpenModal(customer)}>Editar</Button>
                  <Button variant="danger" className="py-2 text-xs justify-center opacity-70 hover:opacity-100" onClick={() => handleDelete(customer.id, customer.name)}>Eliminar</Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-6" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-[600px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
            <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-slate-900">{editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-slate-500 transition-colors" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className="p-8">
              <form id="customer-form" className="space-y-6" onSubmit={handleSubmit}>
                <Input 
                  label="Nombre *" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required 
                />
                <Input 
                  label="RIF / Cédula *" 
                  value={formData.rif} 
                  onChange={e => setFormData({...formData, rif: e.target.value})} 
                  required 
                  placeholder="J-12345678-9" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Email *" 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    required 
                  />
                  <Input 
                    label="Teléfono *" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    required 
                    placeholder="+58 412-0000000" 
                  />
                </div>
                <Input 
                  label="Dirección *" 
                  isTextArea 
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                  required 
                />
              </form>
            </div>
            <div className="px-8 py-6 border-t bg-gray-50 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" type="submit" form="customer-form">Guardar Cliente</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
