/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_QXGJpzTU.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar } from '../chunks/Navbar_BXj0-Mw5.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Facturas - Facturador Digital" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "currentPath": "/facturas" })} ${maybeRenderHead()}<main class="max-w-[1280px] mx-auto px-6 py-12"> ${renderComponent($$result2, "InvoiceList", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/invoice/InvoiceList", "client:component-export": "default" })} </main> ` })}`;
}, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/index.astro", void 0);

const $$file = "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/index.astro";
const $$url = "/facturas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
