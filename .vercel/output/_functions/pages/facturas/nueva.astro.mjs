/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_QXGJpzTU.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar } from '../../chunks/Navbar_BXj0-Mw5.mjs';
export { renderers } from '../../renderers.mjs';

const $$Nueva = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nueva Factura - Facturador Digital", "data-astro-cid-wwwmhsdr": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "currentPath": "/facturas", "data-astro-cid-wwwmhsdr": true })} ${maybeRenderHead()}<main class="max-w-[1440px] mx-auto px-6 py-12" data-astro-cid-wwwmhsdr> <div class="mb-12" data-astro-cid-wwwmhsdr> <h1 class="text-4xl font-bold mb-2" data-astro-cid-wwwmhsdr>Generar Factura</h1> <p class="text-slate-500" data-astro-cid-wwwmhsdr>Crea una nueva factura profesional en segundos</p> </div> ${renderComponent($$result2, "InvoiceForm", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-wwwmhsdr": true, "client:component-path": "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/invoice/InvoiceForm", "client:component-export": "default" })} </main> ` })} `;
}, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/nueva.astro", void 0);

const $$file = "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/nueva.astro";
const $$url = "/facturas/nueva";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nueva,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
