
import React, { useState, useMemo } from 'react';
import { useStorage } from '../../hooks/useStorage';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { Invoice } from '../../scripts/storage';

export const InvoiceList: React.FC = () => {
  const { invoices, updateInvoice, deleteInvoice } = useStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredInvoices = useMemo(() => {
    let result = [...invoices].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(inv => 
        inv.invoiceNumber.toLowerCase().includes(term) ||
        inv.customerName.toLowerCase().includes(term)
      );
    }

    if (statusFilter) {
      result = result.filter(inv => inv.status === statusFilter);
    }

    return result;
  }, [invoices, searchTerm, statusFilter]);

  const handleChangeStatus = (id: string, currentStatus: string) => {
    const statusOptions = {
      'draft': 'Borrador',
      'sent': 'Enviada',
      'paid': 'Pagada'
    };

    const newStatus = prompt(
      `Estado actual: ${statusOptions[currentStatus as keyof typeof statusOptions]}\n\nNuevo estado:\n1 = Borrador\n2 = Enviada\n3 = Pagada`,
      currentStatus === 'draft' ? '1' : currentStatus === 'sent' ? '2' : '3'
    );

    if (newStatus) {
      const statusMap: Record<string, 'draft' | 'sent' | 'paid'> = {
        '1': 'draft',
        '2': 'sent',
        '3': 'paid'
      };

      if (statusMap[newStatus]) {
        updateInvoice(id, { status: statusMap[newStatus] });
      }
    }
  };

  const handleDelete = (id: string, number: string) => {
    if (confirm(`¿Eliminar factura ${number}?`)) {
      deleteInvoice(id);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Facturas</h1>
          <p className="text-slate-500">Gestiona todas tus facturas</p>
        </div>
        <a href="/facturas/nueva" className="btn btn-primary shadow-lg">
          <span>➕</span> Nueva Factura
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mb-8">
        <Input 
          type="text" 
          placeholder="Buscar facturas por número o cliente..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: '', label: 'Todos los estados' },
            { value: 'draft', label: 'Borrador' },
            { value: 'sent', label: 'Enviada' },
            { value: 'paid', label: 'Pagada' },
          ]}
          className="min-w-[200px]"
        />
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="text-center p-12 text-slate-500 text-xl bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p>📄 No se encontraron facturas.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-4 text-left font-semibold text-sm text-slate-800 tracking-wider">Número</th>
                <th className="p-4 text-left font-semibold text-sm text-slate-800 tracking-wider">Cliente</th>
                <th className="p-4 text-left font-semibold text-sm text-slate-800 tracking-wider">Fecha</th>
                <th className="p-4 text-left font-semibold text-sm text-slate-800 tracking-wider">Vencimiento</th>
                <th className="p-4 text-left font-semibold text-sm text-slate-800 tracking-wider">Items</th>
                <th className="p-4 text-left font-semibold text-sm text-slate-800 tracking-wider">Total</th>
                <th className="p-4 text-left font-semibold text-sm text-slate-800 tracking-wider">Estado</th>
                <th className="p-4 text-left font-semibold text-sm text-slate-800 tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map(invoice => {
                const statusClass = invoice.status === 'paid' ? 'badge-success' : 
                                   invoice.status === 'sent' ? 'badge-warning' : 'badge-info';
                const statusText = invoice.status === 'paid' ? 'Pagada' : 
                                  invoice.status === 'sent' ? 'Enviada' : 'Borrador';

                return (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-900">{invoice.invoiceNumber}</td>
                    <td className="p-4 text-sm">
                      <a href={`/clientes/${invoice.customerId}`} className="text-primary font-medium hover:underline">
                        {invoice.customerName}
                      </a>
                    </td>
                    <td className="p-4 text-sm text-slate-500">{new Date(invoice.date).toLocaleDateString('es-VE')}</td>
                    <td className="p-4 text-sm text-slate-500">{new Date(invoice.dueDate).toLocaleDateString('es-VE')}</td>
                    <td className="p-4 text-sm text-slate-500">{invoice.items.length} items</td>
                    <td className="p-4 text-sm font-bold text-slate-900">${invoice.total.toFixed(2)}</td>
                    <td className="p-4 text-sm"><span className={`badge ${statusClass}`}>{statusText}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button title="Cambiar Estado" className="btn btn-sm btn-outline" onClick={() => handleChangeStatus(invoice.id, invoice.status)}>
                          📝
                        </button>
                        <a title="Ver Factura" href={`/facturas/${invoice.id}`} className="btn btn-sm btn-outline flex items-center justify-center">
                          👁️
                        </a>
                        <button title="Eliminar" className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id, invoice.invoiceNumber)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
