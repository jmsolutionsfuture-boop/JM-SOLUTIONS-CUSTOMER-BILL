
import React from 'react';
import { useStorage } from '@/hooks/useStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, Users, Clock, CheckCircle } from 'lucide-react';

export const StatsGrid: React.FC = () => {
  const { invoices, customers } = useStorage();

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
  const pendingInvoices = invoices.filter(inv => inv.status !== 'paid').length;
  const totalCustomers = customers.length;

  const stats = [
    { title: 'Facturas Totales', value: totalInvoices, icon: Receipt, color: 'text-primary', href: '/facturas' },
    { title: 'Cobradas', value: paidInvoices, icon: CheckCircle, color: 'text-green-600', href: '/facturas' },
    { title: 'Pendientes', value: pendingInvoices, icon: Clock, color: 'text-amber-500', href: '/facturas' },
    { title: 'Clientes', value: totalCustomers, icon: Users, color: 'text-indigo-600', href: '/clientes' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12">
      {stats.map((stat, idx) => (
        <a key={idx} href={stat.href} className="block group">
          <Card className="hover:shadow-lg transition-all border-2 border-transparent group-hover:border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color} group-hover:scale-110 transition-transform`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-3xl font-bold group-hover:text-primary transition-colors">{stat.value}</div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default StatsGrid;
