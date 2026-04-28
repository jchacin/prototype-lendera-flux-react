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
  application: { kycStatus: "idle" }
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
function KycStep() {
  const state = useRemoteState();
  const status = state.application.kycStatus;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#d97706", color: "#fff", padding: "6px 20px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", display: "flex", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "mf-kyc" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ":3003 · Compliance" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header row-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          "Paso 2. Validación de identidad · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "mf-kyc" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Microfrontend de compliance KYC. Dominio: Compliance. Puerto :3003" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body stack-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-box", children: [
        "El ciclo de identidad es gestionado por el shell vía Flux:",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: " idle → loading → success/error" }),
        ". Este MF solo emite la acción; el estado llega de vuelta por el event bus."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row gap-sm wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "button button-primary",
            disabled: status === "loading",
            onClick: () => emitAction("START_KYC"),
            children: status === "loading" ? "Validando..." : "Ejecutar KYC"
          }
        ),
        status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "button button-secondary", onClick: () => emitAction("START_KYC"), children: "Reintentar validación" })
      ] })
    ] })
  ] });
}

export { KycStep as default, jsxRuntimeExports as j };
