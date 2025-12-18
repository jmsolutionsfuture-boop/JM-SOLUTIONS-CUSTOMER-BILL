
import React from 'react';
import { useStorage } from '../../hooks/useStorage';

export const RecentInvoices: React.FC = () => {
  const { invoices } = useStorage();
  const recentInvoices = [...invoices].slice(-5).reverse();

  if (recentInvoices.length === 0) {
    return (
      <div className="text-center p-12 text-slate-500 italic bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p>No hay facturas aún. ¡Crea tu primera factura!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {recentInvoices.map(inv => {
        const statusClass = inv.status === 'paid' ? 'badge-success' : 
                           inv.status === 'sent' ? 'badge-warning' : 'badge-info';
        const statusText = inv.status === 'paid' ? 'Pagada' : 
                          inv.status === 'sent' ? 'Enviada' : 'Borrador';
        
        return (
          <div key={inv.id} className="bg-white border border-gray-200 rounded-md p-6 flex justify-between items-center shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">#</div>
               <div>
                <strong className="text-slate-900">{inv.invoiceNumber}</strong>
                <p className="text-sm text-slate-500 m-0">{inv.customerName}</p>
               </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`badge ${statusClass}`}>{statusText}</span>
              <strong className="text-lg text-slate-900">${inv.total.toFixed(2)}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
};
