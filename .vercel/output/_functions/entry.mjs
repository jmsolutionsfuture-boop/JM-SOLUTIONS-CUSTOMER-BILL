import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DR0nRGUB.mjs';
import { manifest } from './manifest_EkTE6rqj.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/clientes/_id_.astro.mjs');
const _page2 = () => import('./pages/clientes.astro.mjs');
const _page3 = () => import('./pages/configuracion.astro.mjs');
const _page4 = () => import('./pages/facturas/nueva.astro.mjs');
const _page5 = () => import('./pages/facturas/_id_.astro.mjs');
const _page6 = () => import('./pages/facturas.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/clientes/[id].astro", _page1],
    ["src/pages/clientes/index.astro", _page2],
    ["src/pages/configuracion.astro", _page3],
    ["src/pages/facturas/nueva.astro", _page4],
    ["src/pages/facturas/[id].astro", _page5],
    ["src/pages/facturas/index.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "47e5bfc8-da24-46af-8765-817babb720f8",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
