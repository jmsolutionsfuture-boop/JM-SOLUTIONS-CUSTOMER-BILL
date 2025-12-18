
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
    { title: 'Facturas Totales', value: totalInvoices, icon: Receipt, color: 'text-primary' },
    { title: 'Cobradas', value: paidInvoices, icon: CheckCircle, color: 'text-green-600' },
    { title: 'Pendientes', value: pendingInvoices, icon: Clock, color: 'text-amber-500' },
    { title: 'Clientes', value: totalCustomers, icon: Users, color: 'text-indigo-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, idx) => (
        <Card key={idx} className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
