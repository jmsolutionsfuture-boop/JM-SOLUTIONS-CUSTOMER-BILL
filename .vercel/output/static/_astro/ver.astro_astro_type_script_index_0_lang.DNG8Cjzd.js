import{s as a}from"./storage.C5bwaIcf.js";const b=new URLSearchParams(window.location.search),r=b.get("id");if(!r)window.location.href="/clientes";else{const e=document.getElementById("new-invoice-link");e&&(e.href=`/facturas/nueva?customerId=${r}`),m(r),u(r)}function m(e){const s=a.getCustomer(e),o=document.getElementById("customer-detail");if(!s||!o){o&&(o.innerHTML="<p>Cliente no encontrado</p>");return}const t=a.getInvoicesByCustomer(e),c=t.length,l=t.reduce((n,d)=>n+d.total,0),i=t.filter(n=>n.status==="paid").reduce((n,d)=>n+d.total,0),x=l-i;o.innerHTML=`
      <div class="card !p-0 overflow-hidden">
        <div class="px-8 py-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center gap-8">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-4xl font-bold shadow-xl shrink-0 border-4 border-white/20">
            ${s.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 class="text-4xl font-bold mb-2">${s.name}</h1>
            <p class="text-slate-400 font-medium tracking-wider uppercase text-sm">${s.rif}</p>
          </div>
        </div>
        <div class="p-8">
          <!-- ... simplified stats ... -->
           <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 text-center">
              <strong class="block text-3xl font-bold text-indigo-700 mb-1">${c}</strong>
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Facturas</span>
            </div>
             <div class="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 text-center">
              <strong class="block text-3xl font-bold text-emerald-700 mb-1">$${l.toFixed(2)}</strong>
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Total</span>
            </div>
             <div class="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 text-center">
              <strong class="block text-3xl font-bold text-blue-700 mb-1">$${i.toFixed(2)}</strong>
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Pagado</span>
            </div>
             <div class="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 text-center">
              <strong class="block text-3xl font-bold text-amber-700 mb-1">$${x.toFixed(2)}</strong>
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Pendiente</span>
            </div>
          </div>
        </div>
      </div>
    `}function u(e){const s=a.getInvoicesByCustomer(e),o=document.getElementById("customer-invoices");if(o){if(s.length===0){document.getElementById("no-invoices")?.classList.remove("hidden");return}o.innerHTML=`
      <div class="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-md">
        <table class="w-full border-collapse">
          <tbody class="divide-y divide-gray-100">
            ${s.map(t=>`
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="p-4 text-sm font-bold text-slate-900">${t.invoiceNumber}</td>
                <td class="p-4 text-sm text-slate-600">${new Date(t.date).toLocaleDateString("es-VE")}</td>
                <td class="p-4 text-sm font-bold text-slate-900">$${t.total.toFixed(2)}</td>
                <td class="p-4 text-sm">
                   <a href="/facturas/ver?id=${t.id}" class="btn btn-sm btn-outline">Ver Detalle</a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `}}
