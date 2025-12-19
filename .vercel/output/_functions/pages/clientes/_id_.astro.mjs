/* empty css                                   */
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_QXGJpzTU.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar } from '../../chunks/Navbar_BXj0-Mw5.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Detalle Cliente - Facturador Digital", "data-astro-cid-tcsumcsw": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "currentPath": "/clientes", "data-astro-cid-tcsumcsw": true })} ${maybeRenderHead()}<main class="max-w-[1280px] mx-auto px-6 py-12"${addAttribute(id, "data-customer-id")} data-astro-cid-tcsumcsw> <div class="mb-8" data-astro-cid-tcsumcsw> <a href="/clientes" class="text-primary font-medium hover:underline flex items-center gap-2" data-astro-cid-tcsumcsw> <span data-astro-cid-tcsumcsw>←</span> Volver a Clientes
</a> </div> <div id="customer-detail" data-astro-cid-tcsumcsw> <!-- Customer detail will be loaded here --> </div> <div class="mt-16" data-astro-cid-tcsumcsw> <div class="flex justify-between items-center mb-8 pb-4 border-b border-gray-100" data-astro-cid-tcsumcsw> <h2 class="text-2xl font-bold text-slate-900" data-astro-cid-tcsumcsw>Facturas del Cliente</h2> <a${addAttribute(`/facturas/nueva?customerId=${id}`, "href")} class="btn btn-primary shadow-md" data-astro-cid-tcsumcsw> <span data-astro-cid-tcsumcsw>➕</span>
Nueva Factura
</a> </div> <div id="customer-invoices" data-astro-cid-tcsumcsw> <!-- Invoices will be loaded here --> </div> <div id="no-invoices" class="hidden text-center p-12 text-slate-500 italic bg-gray-50 rounded-lg border border-dashed border-gray-300" data-astro-cid-tcsumcsw> <p data-astro-cid-tcsumcsw>Este cliente no tiene facturas aún.</p> </div> </div> </main> ` })} ${renderScript($$result, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/clientes/[id].astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/clientes/[id].astro", void 0);

const $$file = "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/clientes/[id].astro";
const $$url = "/clientes/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
