import { importShared } from './__federation_fn_import-BMdLx5XD.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

await importShared('react');

const config = {
  idle: { label: "Pendiente", className: "badge badge-neutral" },
  loading: { label: "En proceso", className: "badge badge-warning" },
  success: { label: "Completado", className: "badge badge-success" },
  error: { label: "Error", className: "badge badge-danger" },
  reviewing: { label: "En revisión", className: "badge badge-info" },
  approved: { label: "Aprobado", className: "badge badge-success" },
  rejected: { label: "Rechazado", className: "badge badge-danger" },
  draft: { label: "Borrador", className: "badge badge-neutral" }
};
function StatusBadge({ status }) {
  const item = config[status] ?? config.idle;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: item.className, children: item.label });
}

const React = await importShared('react');
const {useState,useEffect} = React;
const DEFAULT_STATE = {
  application: { documentsStatus: "idle" }
};
function useRemoteState() {
  const [state, setState] = useState(DEFAULT_STATE);
  useEffect(() => {
    const handler = (e) => setState(e.detail);
    window.addEventListener("lendera:state", handler);
    window.dispatchEvent(new CustomEvent("lendera:requestState"));
    return () => window.removeEventListener("lendera:state", handler);
  }, []);
  return state;
}
function emitAction(type, payload) {
  window.dispatchEvent(new CustomEvent("lendera:action", { detail: { type, payload } }));
}
function DocumentsStep() {
  const state = useRemoteState();
  const status = state.application.documentsStatus;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#7c3aed", color: "#fff", padding: "6px 20px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", display: "flex", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "mf-documents" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ":3004 · Compliance" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header row-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          "Paso 3. Carga de documentos · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "mf-documents" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Microfrontend documental. Dominio: Compliance. Puerto :3004" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body stack-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "info-box", children: "Este MF puede ser reemplazado por un proveedor externo de verificación documental sin afectar al shell ni a los otros MFs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row gap-sm wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "button button-primary",
            disabled: status === "loading",
            onClick: () => emitAction("UPLOAD_DOCUMENT"),
            children: status === "loading" ? "Cargando..." : "Subir documento"
          }
        ),
        status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "button button-secondary", onClick: () => emitAction("UPLOAD_DOCUMENT"), children: "Reintentar carga" })
      ] })
    ] })
  ] });
}

export { DocumentsStep as default, jsxRuntimeExports as j };
