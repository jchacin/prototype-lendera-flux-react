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

const React = await importShared('react');
const {useState,useEffect} = React;

const EMPTY_FORM = { fullName: "", idNumber: "", income: "", amount: "" };
const DEFAULT_STATE = {
  application: { personalData: EMPTY_FORM }
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
function PersonalDataStep() {
  const state = useRemoteState();
  const [form, setForm] = useState(() => state.application.personalData ?? EMPTY_FORM);
  useEffect(() => {
    setForm(state.application.personalData ?? EMPTY_FORM);
  }, [state.application.personalData]);
  const canContinue = Object.values(form).every(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#059669", color: "#fff", padding: "6px 20px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", display: "flex", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "mf-onboarding" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ":3002 · Experiencia cliente" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "Paso 1. Datos del solicitante · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "mf-onboarding" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Microfrontend de incorporación. Dominio: Experiencia cliente. Puerto :3002" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body form-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          placeholder: "Nombre completo",
          value: form.fullName,
          onChange: (e) => setForm({ ...form, fullName: e.target.value })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          placeholder: "Número de identificación",
          value: form.idNumber,
          onChange: (e) => setForm({ ...form, idNumber: e.target.value })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          placeholder: "Ingreso mensual",
          value: form.income,
          onChange: (e) => setForm({ ...form, income: e.target.value })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          placeholder: "Monto solicitado",
          value: form.amount,
          onChange: (e) => setForm({ ...form, amount: e.target.value })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "button button-primary",
            disabled: !canContinue,
            onClick: () => emitAction("SAVE_PERSONAL_DATA", form),
            children: "Guardar y continuar"
          }
        ),
        !canContinue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: "Completa todos los campos para continuar." })
      ] })
    ] })
  ] });
}

export { PersonalDataStep as default, jsxRuntimeExports as j };
