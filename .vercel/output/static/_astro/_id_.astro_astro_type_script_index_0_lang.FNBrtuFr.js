import{s as i}from"./storage.0hWDOvc9.js";const d=document.querySelector("main")?.getAttribute("data-customer-id");function x(){if(!d){console.error("No customer ID found");return}const e=i.getCustomer(d),s=document.getElementById("customer-detail");if(!e||!s){s&&(s.innerHTML=`
          <div class="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 font-primary">Cliente no encontrado</h2>
            <a href="/clientes" class="btn btn-primary">Volver a Clientes</a>
          </div>
        `);return}const a=i.getInvoicesByCustomer(d),t=a.length,o=a.reduce((l,r)=>l+r.total,0),n=a.filter(l=>l.status==="paid").reduce((l,r)=>l+r.total,0),c=o-n;s&&(s.innerHTML=`
      <div class="card !p-0 overflow-hidden">
        <div class="px-8 py-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center gap-8">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-4xl font-bold shadow-xl shrink-0 border-4 border-white/20">
            ${e.name.charAt(0).toUpperCase()}
          </div>
          <div class="text-center md:text-left">
            <h1 class="text-4xl font-bold mb-2">${e.name}</h1>
            <p class="text-slate-400 font-medium tracking-wider uppercase text-sm">${e.rif}</p>
          </div>
        </div>

        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div class="flex flex-col gap-1">
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-400">📧 Email</span>
              <span class="text-slate-700 font-medium truncate" title="${e.email}">${e.email}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-400">📱 Teléfono</span>
              <span class="text-slate-700 font-medium">${e.phone}</span>
            </div>
            <div class="flex flex-col gap-1 col-span-1 md:col-span-1 lg:col-span-1">
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-400">📍 Dirección</span>
              <span class="text-slate-700 font-medium line-clamp-1" title="${e.address}">${e.address}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-400">📅 Cliente Desde</span>
              <span class="text-slate-700 font-medium">${new Date(e.createdAt).toLocaleDateString("es-VE")}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 text-center">
              <strong class="block text-3xl font-bold text-indigo-700 mb-1">${t}</strong>
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Facturas</span>
            </div>
            <div class="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 text-center">
              <strong class="block text-3xl font-bold text-emerald-700 mb-1">$${o.toFixed(2)}</strong>
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Total Facturado</span>
            </div>
            <div class="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 text-center">
              <strong class="block text-3xl font-bold text-blue-700 mb-1">$${n.toFixed(2)}</strong>
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Pagado</span>
            </div>
            <div class="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 text-center">
              <strong class="block text-3xl font-bold text-amber-700 mb-1">$${c.toFixed(2)}</strong>
              <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Pendiente</span>
            </div>
          </div>
        </div>
      </div>
    `)}function p(){if(!d){console.error("No customer ID found");return}const e=i.getInvoicesByCustomer(d),s=document.getElementById("customer-invoices"),a=document.getElementById("no-invoices");if(e.length===0){s&&(s.innerHTML=""),a&&a.classList.remove("hidden");return}a&&a.classList.add("hidden"),s&&(s.innerHTML=`
      <div class="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-md">
        <table class="w-full border-collapse">
          <thead class="bg-gray-50 border-bottom-2 border-gray-200">
            <tr>
              <th class="p-4 text-left font-semibold text-xs text-slate-500 uppercase tracking-widest">Número</th>
              <th class="p-4 text-left font-semibold text-xs text-slate-500 uppercase tracking-widest">Fecha</th>
              <th class="p-4 text-left font-semibold text-xs text-slate-500 uppercase tracking-widest">Vencimiento</th>
              <th class="p-4 text-left font-semibold text-xs text-slate-500 uppercase tracking-widest">Items</th>
              <th class="p-4 text-left font-semibold text-xs text-slate-500 uppercase tracking-widest">Total</th>
              <th class="p-4 text-left font-semibold text-xs text-slate-500 uppercase tracking-widest">Estado</th>
              <th class="p-4 text-left font-semibold text-xs text-slate-500 uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${e.map(t=>{const o=t.status==="paid"?"badge-success":t.status==="sent"?"badge-warning":"badge-info",n=t.status==="paid"?"Pagada":t.status==="sent"?"Enviada":"Borrador";return`
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="p-4 text-sm font-bold text-slate-900">${t.invoiceNumber}</td>
                  <td class="p-4 text-sm text-slate-600">${new Date(t.date).toLocaleDateString("es-VE")}</td>
                  <td class="p-4 text-sm text-slate-600">${new Date(t.dueDate).toLocaleDateString("es-VE")}</td>
                  <td class="p-4 text-sm text-slate-500">${t.items.length} items</td>
                  <td class="p-4 text-sm font-bold text-slate-900">$${t.total.toFixed(2)}</td>
                  <td class="p-4 text-sm"><span class="badge ${o}">${n}</span></td>
                  <td class="p-4">
                    <button class="btn btn-sm btn-outline py-1.5 px-3 text-xs view-invoice" data-id="${t.id}">Ver Detalle</button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    `),document.querySelectorAll(".view-invoice").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.id;o&&(window.location.href=`/facturas/${o}`)})})}x();p();
