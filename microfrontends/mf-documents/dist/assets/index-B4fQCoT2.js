import { importShared } from './__federation_fn_import-BMdLx5XD.js';
import DocumentsStep, { j as jsxRuntimeExports } from './__federation_expose_DocumentsStep-kLhzoF_I.js';
import { r as reactDomExports } from './index-COvqqES_.js';

true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "24px", fontFamily: "system-ui, sans-serif", maxWidth: "600px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#dbeafe", color: "#1d4ed8", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", fontSize: "0.85rem" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "mf-documents" }),
      " — modo standalone · En integración, el shell proporciona el CSS y el event bus."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentsStep, {})
  ] }) })
);
