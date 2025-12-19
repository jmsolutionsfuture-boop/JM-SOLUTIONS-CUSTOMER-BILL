/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_QXGJpzTU.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar } from '../chunks/Navbar_BXj0-Mw5.mjs';
export { renderers } from '../renderers.mjs';

const $$Configuracion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Configuraci\xF3n - Facturador Digital", "data-astro-cid-567kbyzx": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "currentPath": "/configuracion", "data-astro-cid-567kbyzx": true })} ${maybeRenderHead()}<main class="max-w-[900px] mx-auto px-6 py-12" data-astro-cid-567kbyzx> <h1 class="text-4xl font-bold mb-2" data-astro-cid-567kbyzx>Configuración del Negocio</h1> <p class="text-slate-500 mb-12 text-lg" data-astro-cid-567kbyzx>Configura los datos de tu empresa que aparecerán en las facturas</p> ${renderComponent($$result2, "BusinessSettingsForm", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-567kbyzx": true, "client:component-path": "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/configuracion/BusinessSettingsForm", "client:component-export": "default" })} </main> ` })} `;
}, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/configuracion.astro", void 0);

const $$file = "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/configuracion.astro";
const $$url = "/configuracion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Configuracion,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
