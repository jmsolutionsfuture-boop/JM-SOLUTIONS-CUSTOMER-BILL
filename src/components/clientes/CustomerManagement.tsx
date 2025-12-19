
import React, { useState, useMemo } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Customer } from '@/scripts/storage';
import { Plus, Search, Mail, Phone, MapPin, User, Edit2, Trash2, ArrowRight } from 'lucide-react';

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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground text-lg">Gestiona tu cartera de clientes y sus historiales.</p>
        </div>
        <Button size="lg" className="h-12 shadow-md gap-2" onClick={() => handleOpenModal()}>
          <Plus className="w-5 h-5" /> Nuevo Cliente
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input 
          placeholder="Buscar clientes por nombre, RIF o email..." 
          className="pl-10 h-14 text-lg shadow-sm border-muted focus:border-primary transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCustomers.length === 0 ? (
        <Card className="border-dashed py-20 bg-muted/30">
          <CardContent className="text-center">
            <User className="w-16 h-16 mx-auto text-muted mb-4 opacity-50" />
            <p className="text-xl font-medium text-muted-foreground">No se encontraron clientes que coincidan.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map(customer => {
            const customerInvoices = invoices.filter(inv => inv.customerId === customer.id);
            const totalAmount = customerInvoices.reduce((sum, inv) => sum + inv.total, 0);

            return (
              <Card key={customer.id} className="group hover:border-primary/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <CardTitle className="text-lg truncate max-w-[150px]" title={customer.name}>{customer.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">{customer.rif}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 py-4 border-t border-b border-muted/50">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="line-clamp-1">{customer.address}</span>
                  </div>
                </CardContent>

                <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-muted/20">
                  <div className="text-center">
                    <span className="block text-xl font-bold text-foreground">{customerInvoices.length}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Facturas</span>
                  </div>
                  <div className="text-center border-l border-muted">
                    <span className="block text-lg font-bold text-primary">${totalAmount.toLocaleString()}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Inversión</span>
                  </div>
                </div>

                <CardFooter className="pt-4 grid grid-cols-2 gap-2">
                  <Button asChild variant="ghost" size="sm" className="col-span-2 group/btn">
                    <a href={`/clientes/ver?id=${customer.id}`} className="flex items-center justify-center gap-2">
                       Ver Detalle <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleOpenModal(customer)}>
                    <Edit2 className="w-4 h-4 mr-2" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(customer.id, customer.name)}>
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* shadcn Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
            <DialogDescription>
              Completa los datos del cliente para su gestión y facturación.
            </DialogDescription>
          </DialogHeader>
          <form id="customer-form" className="space-y-6 pt-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input 
                id="name"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rif">RIF / Cédula *</Label>
              <Input 
                id="rif"
                value={formData.rif} 
                onChange={e => setFormData({...formData, rif: e.target.value})} 
                required 
                placeholder="J-12345678-9" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email"
                  type="email" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input 
                  id="phone"
                  type="tel" 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  required 
                  placeholder="+58 412-0000000" 
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Dirección *</Label>
              <Textarea 
                id="address"
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
                required 
              />
            </div>
          </form>
          <DialogFooter className="pt-6 border-t">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit" form="customer-form">Guardar Cliente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;
