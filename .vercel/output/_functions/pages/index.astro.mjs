/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_QXGJpzTU.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar } from '../chunks/Navbar_BXj0-Mw5.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard - Facturador Digital", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "currentPath": "/", "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="max-w-[1280px] mx-auto px-6 py-12" data-astro-cid-j7pv25f6> <div class="mb-12" data-astro-cid-j7pv25f6> <h1 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" data-astro-cid-j7pv25f6>Bienvenido a tu sistema de facturación</h1> <p class="text-slate-500 mt-2" data-astro-cid-j7pv25f6>Gestiona tus finanzas de forma profesional y sencilla.</p> </div> ${renderComponent($$result2, "StatsGrid", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-j7pv25f6": true, "client:component-path": "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/dashboard/StatsGrid", "client:component-export": "StatsGrid" })} <div class="mb-16" data-astro-cid-j7pv25f6> <h2 class="text-xl font-bold mb-8 text-slate-900 text-center uppercase tracking-wider opacity-70" data-astro-cid-j7pv25f6>Acciones Rápidas</h2> <div class="grid grid-cols-3 gap-3 md:gap-6" data-astro-cid-j7pv25f6> <a href="/facturas/nueva" class="card p-4 md:p-8 text-center border-2 border-transparent hover:border-primary hover:shadow-xl group transition-all" data-astro-cid-j7pv25f6> <div class="text-3xl md:text-5xl mb-2 md:mb-4 group-hover:scale-110 transition-transform" data-astro-cid-j7pv25f6>➕</div> <h3 class="font-bold text-xs md:text-lg mb-1" data-astro-cid-j7pv25f6>Nueva Factura</h3> <p class="hidden md:block text-sm text-slate-500" data-astro-cid-j7pv25f6>Crear recibo rápido</p> </a> <a href="/clientes" class="card p-4 md:p-8 text-center border-2 border-transparent hover:border-primary hover:shadow-xl group transition-all" data-astro-cid-j7pv25f6> <div class="text-3xl md:text-5xl mb-2 md:mb-4 group-hover:scale-110 transition-transform" data-astro-cid-j7pv25f6>👤</div> <h3 class="font-bold text-xs md:text-lg mb-1" data-astro-cid-j7pv25f6>Cliente</h3> <p class="hidden md:block text-sm text-slate-500" data-astro-cid-j7pv25f6>Registrar nuevo</p> </a> <a href="/configuracion" class="card p-4 md:p-8 text-center border-2 border-transparent hover:border-primary hover:shadow-xl group transition-all" data-astro-cid-j7pv25f6> <div class="text-3xl md:text-5xl mb-2 md:mb-4 group-hover:scale-110 transition-transform" data-astro-cid-j7pv25f6>⚙️</div> <h3 class="font-bold text-xs md:text-lg mb-1" data-astro-cid-j7pv25f6>Ajustes</h3> <p class="hidden md:block text-sm text-slate-500" data-astro-cid-j7pv25f6>Configurar negocio</p> </a> </div> </div> <div class="mb-12" data-astro-cid-j7pv25f6> <h2 class="text-2xl font-bold mb-6 text-slate-900" data-astro-cid-j7pv25f6>Últimas Facturas</h2> ${renderComponent($$result2, "RecentInvoices", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-j7pv25f6": true, "client:component-path": "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/dashboard/RecentInvoices", "client:component-export": "RecentInvoices" })} </div> </main> ` })} `;
}, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/index.astro", void 0);

const $$file = "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
