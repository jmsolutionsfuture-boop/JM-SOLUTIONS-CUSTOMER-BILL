import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_QXGJpzTU.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BwOmMRn0.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Gateway%20pc/Desktop/mis%20proyectos/customer-bill/","cacheDir":"file:///C:/Users/Gateway%20pc/Desktop/mis%20proyectos/customer-bill/node_modules/.astro/","outDir":"file:///C:/Users/Gateway%20pc/Desktop/mis%20proyectos/customer-bill/dist/","srcDir":"file:///C:/Users/Gateway%20pc/Desktop/mis%20proyectos/customer-bill/src/","publicDir":"file:///C:/Users/Gateway%20pc/Desktop/mis%20proyectos/customer-bill/public/","buildClientDir":"file:///C:/Users/Gateway%20pc/Desktop/mis%20proyectos/customer-bill/dist/client/","buildServerDir":"file:///C:/Users/Gateway%20pc/Desktop/mis%20proyectos/customer-bill/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_id_.T-jleWff.css"}],"routeData":{"route":"/clientes/[id]","isIndex":false,"type":"page","pattern":"^\\/clientes\\/([^/]+?)\\/?$","segments":[[{"content":"clientes","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/clientes/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_id_.T-jleWff.css"}],"routeData":{"route":"/clientes","isIndex":true,"type":"page","pattern":"^\\/clientes\\/?$","segments":[[{"content":"clientes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/clientes/index.astro","pathname":"/clientes","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_id_.T-jleWff.css"}],"routeData":{"route":"/configuracion","isIndex":false,"type":"page","pattern":"^\\/configuracion\\/?$","segments":[[{"content":"configuracion","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/configuracion.astro","pathname":"/configuracion","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_id_.T-jleWff.css"}],"routeData":{"route":"/facturas/nueva","isIndex":false,"type":"page","pattern":"^\\/facturas\\/nueva\\/?$","segments":[[{"content":"facturas","dynamic":false,"spread":false}],[{"content":"nueva","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/facturas/nueva.astro","pathname":"/facturas/nueva","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_id_.T-jleWff.css"}],"routeData":{"route":"/facturas/[id]","isIndex":false,"type":"page","pattern":"^\\/facturas\\/([^/]+?)\\/?$","segments":[[{"content":"facturas","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/facturas/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_id_.T-jleWff.css"}],"routeData":{"route":"/facturas","isIndex":true,"type":"page","pattern":"^\\/facturas\\/?$","segments":[[{"content":"facturas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/facturas/index.astro","pathname":"/facturas","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_id_.T-jleWff.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/clientes/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/clientes/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/configuracion.astro",{"propagation":"none","containsHead":true}],["C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/nueva.astro",{"propagation":"none","containsHead":true}],["C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/clientes/[id]@_@astro":"pages/clientes/_id_.astro.mjs","\u0000@astro-page:src/pages/clientes/index@_@astro":"pages/clientes.astro.mjs","\u0000@astro-page:src/pages/configuracion@_@astro":"pages/configuracion.astro.mjs","\u0000@astro-page:src/pages/facturas/nueva@_@astro":"pages/facturas/nueva.astro.mjs","\u0000@astro-page:src/pages/facturas/[id]@_@astro":"pages/facturas/_id_.astro.mjs","\u0000@astro-page:src/pages/facturas/index@_@astro":"pages/facturas.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_EkTE6rqj.mjs","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BIgM9CIK.mjs","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/layout/Navbar":"_astro/Navbar.DPDLBatg.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/clientes/CustomerManagement":"_astro/CustomerManagement.BPrLbSM1.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/configuracion/BusinessSettingsForm":"_astro/BusinessSettingsForm.B16_BqG9.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/invoice/InvoiceList":"_astro/InvoiceList.Doffnrnw.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/invoice/InvoiceView":"_astro/InvoiceView.BA7aLdg-.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/invoice/InvoiceForm":"_astro/InvoiceForm.B6IQkNW7.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/dashboard/StatsGrid":"_astro/StatsGrid.RODTjVj4.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/dashboard/RecentInvoices":"_astro/RecentInvoices.CbifmKjR.js","@astrojs/react/client.js":"_astro/client.DQpMtyFg.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/clientes/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.FNBrtuFr.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/pages/facturas/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang._NIHoPWt.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/node_modules/html2canvas/dist/html2canvas.esm.js":"_astro/html2canvas.esm.B0tyYwQk.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/node_modules/dompurify/dist/purify.es.mjs":"_astro/purify.es.B9ZVCkUG.js","C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/node_modules/canvg/lib/index.es.js":"_astro/index.es.5f8xBQeR.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_id_.T-jleWff.css","/favicon.svg","/_astro/badge.BkV2C6_v.js","/_astro/BusinessSettingsForm.B16_BqG9.js","/_astro/button.CoVCTGaF.js","/_astro/card.DRHvi6JW.js","/_astro/client.DQpMtyFg.js","/_astro/clock.1VAvTbv7.js","/_astro/CustomerManagement.BPrLbSM1.js","/_astro/eye.Cx7FH754.js","/_astro/html2canvas.esm.B0tyYwQk.js","/_astro/index.BbCjBGhI.js","/_astro/index.Bbz0MuBC.js","/_astro/index.D9xJzycJ.js","/_astro/index.es.5f8xBQeR.js","/_astro/InvoiceForm.B6IQkNW7.js","/_astro/InvoiceList.Doffnrnw.js","/_astro/InvoiceTemplate.CpmvSFwM.js","/_astro/InvoiceView.BA7aLdg-.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/Navbar.DPDLBatg.js","/_astro/purify.es.B9ZVCkUG.js","/_astro/RecentInvoices.CbifmKjR.js","/_astro/search.CfwXa53Z.js","/_astro/select.m9jejSwE.js","/_astro/StatsGrid.RODTjVj4.js","/_astro/storage.0hWDOvc9.js","/_astro/table.C0l1eO0d.js","/_astro/textarea.CScGMZiN.js","/_astro/trash-2.DUN9syJc.js","/_astro/users.xkfzUEMl.js","/_astro/utils.DWbH76R9.js","/_astro/x.D8b5cN-M.js","/_astro/_commonjsHelpers.D6-XlEtG.js","/_astro/_id_.astro_astro_type_script_index_0_lang.FNBrtuFr.js","/_astro/_id_.astro_astro_type_script_index_0_lang._NIHoPWt.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"Kml2w5txXnMGnycQzJMxzNHmg5McfT0qKzOzGk38+jw="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
