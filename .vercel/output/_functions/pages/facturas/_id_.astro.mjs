/* empty css                                   */
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_QXGJpzTU.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar } from '../../chunks/Navbar_BXj0-Mw5.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Detalle Factura - Facturador Digital", "data-astro-cid-fvwmx3f4": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "currentPath": "/facturas", "data-astro-cid-fvwmx3f4": true })} ${maybeRenderHead()}<main class="max-w-[1280px] mx-auto px-6 py-12 print:p-0"${addAttribute(id, "data-invoice-id")} data-astro-cid-fvwmx3f4> <div class="mb-8 print:hidden" data-astro-cid-fvwmx3f4> <a href="/facturas" class="text-primary font-medium hover:underline flex items-center gap-2" data-astro-cid-fvwmx3f4> <span data-astro-cid-fvwmx3f4>←</span> Volver a Facturas
</a> </div> <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 print:hidden" data-astro-cid-fvwmx3f4> <div data-astro-cid-fvwmx3f4> <h1 class="text-4xl font-bold font-primary text-slate-900 tracking-tight" data-astro-cid-fvwmx3f4>Detalle de Factura</h1> <p class="text-slate-500 mt-1" data-astro-cid-fvwmx3f4>Visualiza y descarga el documento oficial.</p> </div> <div class="flex gap-4" data-astro-cid-fvwmx3f4> <button id="print-btn" class="btn btn-outline flex items-center gap-2" onclick="window.print()" data-astro-cid-fvwmx3f4> <span class="text-lg" data-astro-cid-fvwmx3f4>🖨️</span> Imprimir
</button> <button id="download-pdf-btn" class="btn btn-primary flex items-center gap-2 shadow-lg" data-astro-cid-fvwmx3f4> <span class="text-lg" data-astro-cid-fvwmx3f4>⬇️</span> Descargar PDF
</button> </div> </div> <div id="invoice-view-wrapper" class="bg-slate-200/50 p-4 md:p-12 rounded-2xl shadow-inner min-h-[900px] flex justify-center items-start overflow-auto print:bg-white print:p-0 print:shadow-none print:rounded-none print:block" data-astro-cid-fvwmx3f4> ${renderComponent($$result2, "InvoiceView", null, { "client:only": "react", "id": id, "client:component-hydration": "only", "data-astro-cid-fvwmx3f4": true, "client:component-path": "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/invoice/InvoiceView", "client:component-export": "default" })} </div> </main> ` })} ${renderScript($$result, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/[id].astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/[id].astro", void 0);

const $$file = "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/[id].astro";
const $$url = "/facturas/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
