
import React from 'react';
import type { Invoice, BusinessSettings, Customer } from '../../scripts/storage';

interface InvoiceTemplateProps {
  invoice: Invoice | Partial<Invoice>;
  businessSettings: BusinessSettings;
  customer: Customer | null | undefined;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ invoice, businessSettings, customer }) => {
  const items = invoice.items || [];
  const subtotal = invoice.subtotal || items.reduce((sum, item) => sum + (item.total || 0), 0);
  const tax = invoice.tax || subtotal * (businessSettings.taxPercentage / 100);
  const total = invoice.total || subtotal + tax;
  const notes = invoice.notes || '';

  // Formatters
  const currency = (amount: number) => {
    return `${businessSettings.currency} ${amount.toFixed(2)}`;
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('es-VE');
  };

  return (
    <div 
      id="invoice-content" 
      data-invoice-number={invoice.invoiceNumber || 'RECIBO'}
      data-customer-name={customer?.name || 'CLIENTE'}
      className="invoice-paper-preview print:shadow-none"
    >
      {/* Header */}
      <div className="flex justify-between mb-10">
        <div className="sender-info">
          <h2 className="text-lg font-bold uppercase mb-2">{businessSettings.name}</h2>
          <div className="text-[13px] text-gray-800">
            <p className="my-0.5">{businessSettings.address}</p>
            <p className="my-0.5">{businessSettings.phone}</p>
            <p className="my-0.5">{businessSettings.email}</p>
            <p className="my-0.5">RIF: {businessSettings.rif}</p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="text-base font-bold uppercase mb-2">RECIBO</div>
          {businessSettings.logo && (
            <img src={businessSettings.logo} alt="Logo" className="w-20 h-auto object-contain" />
          )}
        </div>
      </div>

      {/* Info Row */}
      <div className="flex justify-between mb-8 items-start">
        <div className="recipient-info">
          <h3 className="text-sm font-bold m-0 mb-2">A</h3>
          {customer ? (
            <div className="text-[13px]">
              <p className="my-0.5 font-bold uppercase">{customer.name}</p>
              <p className="my-0.5">{customer.address}</p>
              <p className="my-0.5">{customer.rif}</p>
              <p className="my-0.5">{customer.phone}</p>
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm">Seleccionar cliente...</p>
          )}
        </div>
        <div className="text-right">
          <div className="mb-1">
            <span className="font-bold mr-2 text-[13px]">Nº de recibo</span>
            <span className="text-[13px]">{invoice.invoiceNumber || '-'}</span>
          </div>
          <div className="mb-1">
            <span className="font-bold mr-2 text-[13px]">Fecha</span>
            <span className="text-[13px]">{formatDate(invoice.date as string)}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mb-5">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="bg-gray-100 text-xs font-bold uppercase p-2 border-b border-gray-300 text-left">DESCRIPCIÓN</th>
              <th className="bg-gray-100 text-xs font-bold uppercase p-2 border-b border-gray-300 text-right w-[150px]">IMPORTE</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border-b border-gray-100 text-[13px] align-top">
                    <div className="whitespace-pre-wrap">{item.description || 'Item sin descripción'}</div>
                  </td>
                  <td className="p-2 border-b border-gray-100 text-[13px] align-top text-right">{currency(item.total)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-5 text-center text-gray-400 italic">
                  Agrega items a la factura
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex justify-between mb-10">
        <div className="flex-1 pr-5 text-xs text-gray-600">
          {notes && (
            <div>
              <strong>Abonos / Notas:</strong>
              <p dangerouslySetInnerHTML={{ __html: notes.replace(/\n/g, '<br>') }} />
            </div>
          )}
        </div>

        <div className="w-[250px]">
          <div className="flex justify-between p-2 mt-2 bg-gray-100 font-bold border border-gray-300">
            <span>TOTAL</span>
            <span>{currency(total)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center relative min-h-[100px]">
        <div className="relative left-[20%] -rotate-2">
          {invoice.status === 'paid' && (
            <div className="text-3xl font-bold text-red-700 border-4 border-red-700 px-5 py-1 uppercase tracking-widest opacity-80">
              PAGADO
            </div>
          )}
        </div>
        <div className="text-center w-[200px]">
          {businessSettings.signature && (
            <img src={businessSettings.signature} className="max-w-[150px] h-auto block mx-auto mb-1" alt="Firma" />
          )}
          <div className="border-t border-black mb-1"></div>
          <p className="text-xs m-0">Firma Autorizada</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
