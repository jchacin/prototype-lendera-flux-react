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

const DEFAULT_STATE = {
  session: { isLoggedIn: false, userName: "" }
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
function LoginPanel() {
  const state = useRemoteState();
  const [userName, setUserName] = useState("José");
  if (state.session.isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "success-banner", children: [
      "Sesión activa como ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: state.session.userName }),
      "."
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#2563eb", color: "#fff", padding: "6px 20px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", display: "flex", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "mf-auth" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ":3001 · Seguridad / Identidad" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "Ingreso · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "mf-auth" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Microfrontend de autenticación. Dominio: Seguridad e identidad. Puerto :3001" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body stack-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "input",
          value: userName,
          onChange: (e) => setUserName(e.target.value),
          placeholder: "Nombre del usuario"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "button button-primary button-block",
          onClick: () => emitAction("LOGIN_SUCCESS", { userName: userName || "Usuario" }),
          children: "Entrar al flujo"
        }
      )
    ] })
  ] });
}

export { LoginPanel as default, jsxRuntimeExports as j };
