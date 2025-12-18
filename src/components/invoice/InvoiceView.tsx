
import React, { useEffect, useState } from 'react';
import { storage, type Invoice, type Customer, type BusinessSettings } from '../../scripts/storage';
import InvoiceTemplate from './InvoiceTemplate';

interface InvoiceViewProps {
  id: string;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({ id }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        console.log('InvoiceView: Fetching data for id:', id);
        setLoading(true);
        
        const inv = storage.getInvoice(id);
        const settings = storage.getBusinessSettings();
        
        if (!inv) {
          setError('Factura no encontrada');
          console.error('InvoiceView: Invoice not found');
        } else {
          setInvoice(inv);
          setBusinessSettings(settings);
          
          const cust = storage.getCustomer(inv.customerId);
          setCustomer(cust);
          console.log('InvoiceView: Data loaded successfully');
        }
      } catch (err) {
        console.error('InvoiceView: Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar la factura');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col items-center gap-4 py-20 w-full">
        <div className="w-64 h-[400px] bg-white/20 rounded-lg shadow-sm"></div>
        <p className="text-white/50 font-medium text-lg">Cargando factura digital...</p>
      </div>
    );
  }

  if (error || !invoice || !businessSettings) {
    return (
      <div className="bg-white p-12 md:p-20 rounded-3xl text-center shadow-2xl border border-slate-200 max-w-2xl mx-auto w-full">
        <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
           ⚠️
        </div>
        <h2 className="text-3xl font-bold font-primary text-slate-900 mb-4">{error || 'Error Inesperado'}</h2>
        <p className="text-slate-500 mb-10 text-lg leading-relaxed">No pudimos procesar la solicitud para ver esta factura. Por favor, verifica que el enlace sea correcto.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href="/facturas" className="btn btn-primary px-10 py-3 text-base">Volver a Facturas</a>
             <button onClick={() => window.location.reload()} className="btn btn-secondary px-10 py-3 text-base">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-500">
      <InvoiceTemplate 
        invoice={invoice} 
        businessSettings={businessSettings} 
        customer={customer} 
      />
    </div>
  );
};

export default InvoiceView;
