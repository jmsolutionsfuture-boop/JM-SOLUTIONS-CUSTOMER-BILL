
import React, { useState, useMemo } from 'react';
import { useStorage } from '@/hooks/useStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Card, CardContent } from '@/components/ui/card';
import { Search, FileEdit, Eye, Trash2, Plus, Filter } from 'lucide-react';

export const InvoiceList: React.FC = () => {
  const { invoices, updateInvoice, deleteInvoice } = useStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInvoices = useMemo(() => {
    let result = [...invoices].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(inv => {
        const invoiceNumber = (inv.invoiceNumber || '').toLowerCase();
        const customerName = (inv.customerName || '').toLowerCase();
        return invoiceNumber.includes(term) || customerName.includes(term);
      });
    }

    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(inv => {
        const status = (inv.status || '').toLowerCase();
        return status === statusFilter.toLowerCase();
      });
    }

    return result;
  }, [invoices, searchTerm, statusFilter]);

  const handleDelete = (id: string, number: string) => {
    if (confirm(`¿Eliminar factura ${number}?`)) {
      deleteInvoice(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-white border-transparent';
      case 'sent': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Facturas</h1>
          <p className="text-muted-foreground text-lg">Gestiona todas tus facturas y estados de pago.</p>
        </div>
        <Button size="lg" className="h-12 shadow-md gap-2" asChild>
          <a href="/facturas/nueva">
            <Plus className="w-5 h-5" /> Nueva Factura
          </a>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Buscar por número o cliente..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 min-w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2 opacity-50" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="sent">Enviada</SelectItem>
                  <SelectItem value="paid">Pagada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredInvoices.length === 0 ? (
        <Card className="border-dashed py-12">
          <CardContent className="text-center text-muted-foreground">
            No se encontraron facturas.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-bold">{invoice.invoiceNumber}</TableCell>
                  <TableCell>
                    <a href={`/clientes/ver?id=${invoice.customerId}`} className="text-primary hover:underline font-medium">
                      {invoice.customerName}
                    </a>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{new Date(invoice.date).toLocaleDateString('es-VE')}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(invoice.dueDate).toLocaleDateString('es-VE')}</TableCell>
                  <TableCell className="font-bold">${invoice.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select 
                      value={invoice.status} 
                      onValueChange={(val) => updateInvoice(invoice.id, { status: val as any })}
                    >
                      <SelectTrigger className={`h-8 w-[110px] text-xs font-semibold px-2 ${getStatusColor(invoice.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Borrador</SelectItem>
                        <SelectItem value="sent">Enviada</SelectItem>
                        <SelectItem value="paid">Pagada</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild title="Ver Factura">
                        <a href={`/facturas/ver?id=${invoice.id}`}>
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" title="Eliminar" onClick={() => handleDelete(invoice.id, invoice.invoiceNumber)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

export default InvoiceList;
