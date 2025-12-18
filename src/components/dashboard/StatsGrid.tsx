
import React from 'react';
import { useStorage } from '../../hooks/useStorage';

export const StatsGrid: React.FC = () => {
  const { invoices, customers } = useStorage();

  const paidCount = invoices.filter(inv => inv.status === 'paid').length;
  const pendingCount = invoices.filter(inv => inv.status === 'draft' || inv.status === 'sent').length;

  const stats = [
    { label: 'Facturas Totales', value: invoices.length, icon: '📄', color: 'from-blue-500 to-blue-800' },
    { label: 'Facturas Pagadas', value: paidCount, icon: '✅', color: 'from-emerald-500 to-emerald-800' },
    { label: 'Facturas Pendientes', value: pendingCount, icon: '⏳', color: 'from-amber-500 to-amber-800' },
    { label: 'Clientes', value: customers.length, icon: '👥', color: 'from-violet-500 to-violet-800' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, i) => (
        <div key={i} className="card flex items-center gap-6">
          <div className={`w-15 h-15 shrink-0 rounded-lg flex items-center justify-center text-3xl bg-gradient-to-br ${stat.color} text-white`}>
            {stat.icon}
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
