import { r as reactExports } from './index-Dm_EQZZA.js';
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

const buildIdentifier = "[0-9A-Za-z-]+";
const build = `(?:\\+(${buildIdentifier}(?:\\.${buildIdentifier})*))`;
const numericIdentifier = "0|[1-9]\\d*";
const numericIdentifierLoose = "[0-9]+";
const nonNumericIdentifier = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
const preReleaseIdentifierLoose = `(?:${numericIdentifierLoose}|${nonNumericIdentifier})`;
const preReleaseLoose = `(?:-?(${preReleaseIdentifierLoose}(?:\\.${preReleaseIdentifierLoose})*))`;
const preReleaseIdentifier = `(?:${numericIdentifier}|${nonNumericIdentifier})`;
const preRelease = `(?:-(${preReleaseIdentifier}(?:\\.${preReleaseIdentifier})*))`;
const xRangeIdentifier = `${numericIdentifier}|x|X|\\*`;
const xRangePlain = `[v=\\s]*(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:${preRelease})?${build}?)?)?`;
const hyphenRange = `^\\s*(${xRangePlain})\\s+-\\s+(${xRangePlain})\\s*$`;
const mainVersionLoose = `(${numericIdentifierLoose})\\.(${numericIdentifierLoose})\\.(${numericIdentifierLoose})`;
const loosePlain = `[v=\\s]*${mainVersionLoose}${preReleaseLoose}?${build}?`;
const gtlt = "((?:<|>)?=?)";
const comparatorTrim = `(\\s*)${gtlt}\\s*(${loosePlain}|${xRangePlain})`;
const loneTilde = "(?:~>?)";
const tildeTrim = `(\\s*)${loneTilde}\\s+`;
const loneCaret = "(?:\\^)";
const caretTrim = `(\\s*)${loneCaret}\\s+`;
const star = "(<|>)?=?\\s*\\*";
const caret = `^${loneCaret}${xRangePlain}$`;
const mainVersion = `(${numericIdentifier})\\.(${numericIdentifier})\\.(${numericIdentifier})`;
const fullPlain = `v?${mainVersion}${preRelease}?${build}?`;
const tilde = `^${loneTilde}${xRangePlain}$`;
const xRange = `^${gtlt}\\s*${xRangePlain}$`;
const comparator = `^${gtlt}\\s*(${fullPlain})$|^$`;
const gte0 = "^\\s*>=\\s*0.0.0\\s*$";
function parseRegex(source) {
  return new RegExp(source);
}
function isXVersion(version) {
  return !version || version.toLowerCase() === "x" || version === "*";
}
function pipe(...fns) {
  return (x) => {
    return fns.reduce((v, f) => f(v), x);
  };
}
function extractComparator(comparatorString) {
  return comparatorString.match(parseRegex(comparator));
}
function combineVersion(major, minor, patch, preRelease2) {
  const mainVersion2 = `${major}.${minor}.${patch}`;
  if (preRelease2) {
    return `${mainVersion2}-${preRelease2}`;
  }
  return mainVersion2;
}
function parseHyphen(range) {
  return range.replace(
    parseRegex(hyphenRange),
    (_range, from, fromMajor, fromMinor, fromPatch, _fromPreRelease, _fromBuild, to, toMajor, toMinor, toPatch, toPreRelease) => {
      if (isXVersion(fromMajor)) {
        from = "";
      } else if (isXVersion(fromMinor)) {
        from = `>=${fromMajor}.0.0`;
      } else if (isXVersion(fromPatch)) {
        from = `>=${fromMajor}.${fromMinor}.0`;
      } else {
        from = `>=${from}`;
      }
      if (isXVersion(toMajor)) {
        to = "";
      } else if (isXVersion(toMinor)) {
        to = `<${+toMajor + 1}.0.0-0`;
      } else if (isXVersion(toPatch)) {
        to = `<${toMajor}.${+toMinor + 1}.0-0`;
      } else if (toPreRelease) {
        to = `<=${toMajor}.${toMinor}.${toPatch}-${toPreRelease}`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    }
  );
}
function parseComparatorTrim(range) {
  return range.replace(parseRegex(comparatorTrim), "$1$2$3");
}
function parseTildeTrim(range) {
  return range.replace(parseRegex(tildeTrim), "$1~");
}
function parseCaretTrim(range) {
  return range.replace(parseRegex(caretTrim), "$1^");
}
function parseCarets(range) {
  return range.trim().split(/\s+/).map((rangeVersion) => {
    return rangeVersion.replace(
      parseRegex(caret),
      (_, major, minor, patch, preRelease2) => {
        if (isXVersion(major)) {
          return "";
        } else if (isXVersion(minor)) {
          return `>=${major}.0.0 <${+major + 1}.0.0-0`;
        } else if (isXVersion(patch)) {
          if (major === "0") {
            return `>=${major}.${minor}.0 <${major}.${+minor + 1}.0-0`;
          } else {
            return `>=${major}.${minor}.0 <${+major + 1}.0.0-0`;
          }
        } else if (preRelease2) {
          if (major === "0") {
            if (minor === "0") {
              return `>=${major}.${minor}.${patch}-${preRelease2} <${major}.${minor}.${+patch + 1}-0`;
            } else {
              return `>=${major}.${minor}.${patch}-${preRelease2} <${major}.${+minor + 1}.0-0`;
            }
          } else {
            return `>=${major}.${minor}.${patch}-${preRelease2} <${+major + 1}.0.0-0`;
          }
        } else {
          if (major === "0") {
            if (minor === "0") {
              return `>=${major}.${minor}.${patch} <${major}.${minor}.${+patch + 1}-0`;
            } else {
              return `>=${major}.${minor}.${patch} <${major}.${+minor + 1}.0-0`;
            }
          }
          return `>=${major}.${minor}.${patch} <${+major + 1}.0.0-0`;
        }
      }
    );
  }).join(" ");
}
function parseTildes(range) {
  return range.trim().split(/\s+/).map((rangeVersion) => {
    return rangeVersion.replace(
      parseRegex(tilde),
      (_, major, minor, patch, preRelease2) => {
        if (isXVersion(major)) {
          return "";
        } else if (isXVersion(minor)) {
          return `>=${major}.0.0 <${+major + 1}.0.0-0`;
        } else if (isXVersion(patch)) {
          return `>=${major}.${minor}.0 <${major}.${+minor + 1}.0-0`;
        } else if (preRelease2) {
          return `>=${major}.${minor}.${patch}-${preRelease2} <${major}.${+minor + 1}.0-0`;
        }
        return `>=${major}.${minor}.${patch} <${major}.${+minor + 1}.0-0`;
      }
    );
  }).join(" ");
}
function parseXRanges(range) {
  return range.split(/\s+/).map((rangeVersion) => {
    return rangeVersion.trim().replace(
      parseRegex(xRange),
      (ret, gtlt2, major, minor, patch, preRelease2) => {
        const isXMajor = isXVersion(major);
        const isXMinor = isXMajor || isXVersion(minor);
        const isXPatch = isXMinor || isXVersion(patch);
        if (gtlt2 === "=" && isXPatch) {
          gtlt2 = "";
        }
        preRelease2 = "";
        if (isXMajor) {
          if (gtlt2 === ">" || gtlt2 === "<") {
            return "<0.0.0-0";
          } else {
            return "*";
          }
        } else if (gtlt2 && isXPatch) {
          if (isXMinor) {
            minor = 0;
          }
          patch = 0;
          if (gtlt2 === ">") {
            gtlt2 = ">=";
            if (isXMinor) {
              major = +major + 1;
              minor = 0;
              patch = 0;
            } else {
              minor = +minor + 1;
              patch = 0;
            }
          } else if (gtlt2 === "<=") {
            gtlt2 = "<";
            if (isXMinor) {
              major = +major + 1;
            } else {
              minor = +minor + 1;
            }
          }
          if (gtlt2 === "<") {
            preRelease2 = "-0";
          }
          return `${gtlt2 + major}.${minor}.${patch}${preRelease2}`;
        } else if (isXMinor) {
          return `>=${major}.0.0${preRelease2} <${+major + 1}.0.0-0`;
        } else if (isXPatch) {
          return `>=${major}.${minor}.0${preRelease2} <${major}.${+minor + 1}.0-0`;
        }
        return ret;
      }
    );
  }).join(" ");
}
function parseStar(range) {
  return range.trim().replace(parseRegex(star), "");
}
function parseGTE0(comparatorString) {
  return comparatorString.trim().replace(parseRegex(gte0), "");
}
function compareAtom(rangeAtom, versionAtom) {
  rangeAtom = +rangeAtom || rangeAtom;
  versionAtom = +versionAtom || versionAtom;
  if (rangeAtom > versionAtom) {
    return 1;
  }
  if (rangeAtom === versionAtom) {
    return 0;
  }
  return -1;
}
function comparePreRelease(rangeAtom, versionAtom) {
  const { preRelease: rangePreRelease } = rangeAtom;
  const { preRelease: versionPreRelease } = versionAtom;
  if (rangePreRelease === void 0 && !!versionPreRelease) {
    return 1;
  }
  if (!!rangePreRelease && versionPreRelease === void 0) {
    return -1;
  }
  if (rangePreRelease === void 0 && versionPreRelease === void 0) {
    return 0;
  }
  for (let i = 0, n = rangePreRelease.length; i <= n; i++) {
    const rangeElement = rangePreRelease[i];
    const versionElement = versionPreRelease[i];
    if (rangeElement === versionElement) {
      continue;
    }
    if (rangeElement === void 0 && versionElement === void 0) {
      return 0;
    }
    if (!rangeElement) {
      return 1;
    }
    if (!versionElement) {
      return -1;
    }
    return compareAtom(rangeElement, versionElement);
  }
  return 0;
}
function compareVersion(rangeAtom, versionAtom) {
  return compareAtom(rangeAtom.major, versionAtom.major) || compareAtom(rangeAtom.minor, versionAtom.minor) || compareAtom(rangeAtom.patch, versionAtom.patch) || comparePreRelease(rangeAtom, versionAtom);
}
function eq(rangeAtom, versionAtom) {
  return rangeAtom.version === versionAtom.version;
}
function compare(rangeAtom, versionAtom) {
  switch (rangeAtom.operator) {
    case "":
    case "=":
      return eq(rangeAtom, versionAtom);
    case ">":
      return compareVersion(rangeAtom, versionAtom) < 0;
    case ">=":
      return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) < 0;
    case "<":
      return compareVersion(rangeAtom, versionAtom) > 0;
    case "<=":
      return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) > 0;
    case void 0: {
      return true;
    }
    default:
      return false;
  }
}
function parseComparatorString(range) {
  return pipe(
    parseCarets,
    parseTildes,
    parseXRanges,
    parseStar
  )(range);
}
function parseRange(range) {
  return pipe(
    parseHyphen,
    parseComparatorTrim,
    parseTildeTrim,
    parseCaretTrim
  )(range.trim()).split(/\s+/).join(" ");
}
function satisfy(version, range) {
  if (!version) {
    return false;
  }
  const parsedRange = parseRange(range);
  const parsedComparator = parsedRange.split(" ").map((rangeVersion) => parseComparatorString(rangeVersion)).join(" ");
  const comparators = parsedComparator.split(/\s+/).map((comparator2) => parseGTE0(comparator2));
  const extractedVersion = extractComparator(version);
  if (!extractedVersion) {
    return false;
  }
  const [
    ,
    versionOperator,
    ,
    versionMajor,
    versionMinor,
    versionPatch,
    versionPreRelease
  ] = extractedVersion;
  const versionAtom = {
    version: combineVersion(
      versionMajor,
      versionMinor,
      versionPatch,
      versionPreRelease
    ),
    major: versionMajor,
    minor: versionMinor,
    patch: versionPatch,
    preRelease: versionPreRelease == null ? void 0 : versionPreRelease.split(".")
  };
  for (const comparator2 of comparators) {
    const extractedComparator = extractComparator(comparator2);
    if (!extractedComparator) {
      return false;
    }
    const [
      ,
      rangeOperator,
      ,
      rangeMajor,
      rangeMinor,
      rangePatch,
      rangePreRelease
    ] = extractedComparator;
    const rangeAtom = {
      operator: rangeOperator,
      version: combineVersion(
        rangeMajor,
        rangeMinor,
        rangePatch,
        rangePreRelease
      ),
      major: rangeMajor,
      minor: rangeMinor,
      patch: rangePatch,
      preRelease: rangePreRelease == null ? void 0 : rangePreRelease.split(".")
    };
    if (!compare(rangeAtom, versionAtom)) {
      return false;
    }
  }
  return true;
}

const currentImports$1 = {};

// eslint-disable-next-line no-undef
const moduleMap = {'react':{get:()=>()=>__federation_import$1(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href),import:true},'react-dom':{get:()=>()=>__federation_import$1(new URL('__federation_shared_react-dom-BN8Au471.js', import.meta.url).href),import:true}};
const moduleCache = Object.create(null);
async function importShared(name, shareScope = 'default') {
  return moduleCache[name]
    ? new Promise((r) => r(moduleCache[name]))
    : (await getSharedFromRuntime(name, shareScope)) || getSharedFromLocal(name)
}
// eslint-disable-next-line
async function __federation_import$1(name) {
  currentImports$1[name] ??= import(name);
  return currentImports$1[name]
}
async function getSharedFromRuntime(name, shareScope) {
  let module = null;
  if (globalThis?.__federation_shared__?.[shareScope]?.[name]) {
    const versionObj = globalThis.__federation_shared__[shareScope][name];
    const requiredVersion = moduleMap[name]?.requiredVersion;
    const hasRequiredVersion = !!requiredVersion;
    if (hasRequiredVersion) {
      const versionKey = Object.keys(versionObj).find((version) =>
        satisfy(version, requiredVersion)
      );
      if (versionKey) {
        const versionValue = versionObj[versionKey];
        module = await (await versionValue.get())();
      } else {
        console.log(
          `provider support ${name}(${versionKey}) is not satisfied requiredVersion(\${moduleMap[name].requiredVersion})`
        );
      }
    } else {
      const versionKey = Object.keys(versionObj)[0];
      const versionValue = versionObj[versionKey];
      module = await (await versionValue.get())();
    }
  }
  if (module) {
    return flattenModule(module, name)
  }
}
async function getSharedFromLocal(name) {
  if (moduleMap[name]?.import) {
    let module = await (await moduleMap[name].get())();
    return flattenModule(module, name)
  } else {
    console.error(
      `consumer config import=false,so cant use callback shared module`
    );
  }
}
function flattenModule(module, name) {
  // use a shared module which export default a function will getting error 'TypeError: xxx is not a function'
  if (typeof module.default === 'function') {
    Object.keys(module).forEach((key) => {
      if (key !== 'default') {
        module.default[key] = module[key];
      }
    });
    moduleCache[name] = module.default;
    return module.default
  }
  if (module.default) module = Object.assign({}, module.default, module);
  moduleCache[name] = module;
  return module
}

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
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m$1.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const remotesMap = {
'mfAuth':{url:'http://localhost:3001/assets/remoteEntry.js',format:'esm',from:'vite'},
  'mfOnboarding':{url:'http://localhost:3002/assets/remoteEntry.js',format:'esm',from:'vite'},
  'mfKyc':{url:'http://localhost:3003/assets/remoteEntry.js',format:'esm',from:'vite'},
  'mfDocuments':{url:'http://localhost:3004/assets/remoteEntry.js',format:'esm',from:'vite'},
  'mfCredit':{url:'http://localhost:3005/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};
                const loadJS = async (url, fn) => {
                    const resolvedUrl = typeof url === 'function' ? await url() : url;
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.onload = fn;
                    script.src = resolvedUrl;
                    document.getElementsByTagName('head')[0].appendChild(script);
                };

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        if (remoteFrom === 'webpack') {
                            return Object.prototype.toString.call(module).indexOf('Module') > -1 && module.default ? module.default : module
                        }
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'react':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href, remoteFrom), loaded:1}},'react-dom':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-dom-BN8Au471.js', import.meta.url).href, remoteFrom), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if ('var' === remote.format) {
                            // loading js with script tag
                            return new Promise(resolve => {
                                const callback = () => {
                                    if (!remote.inited) {
                                        remote.lib = window[remoteId];
                                        remote.lib.init(wrapShareModule(remote.from));
                                        remote.inited = true;
                                    }
                                    resolve(remote.lib);
                                };
                                return loadJS(remote.url, callback);
                            });
                        } else if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule(remote.from);
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

class Dispatcher {
  constructor() {
    this.callbacks = [];
  }

  register(callback) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  dispatch(action) {
    this.callbacks.forEach((cb) => cb(action));
  }
}

const dispatcher = new Dispatcher();

const initialState = {
  session: {
    isLoggedIn: false,
    userName: '',
  },
  application: {
    currentStep: 1,
    totalSteps: 4,
    personalData: {
      fullName: '',
      idNumber: '',
      income: '',
      amount: '',
    },
    kycStatus: 'idle',
    documentsStatus: 'idle',
    approvalStatus: 'draft',
    notifications: [],
  },
};

function calculateProgress(state) {
  const { currentStep, totalSteps } = state.application;
  return Math.round((currentStep / totalSteps) * 100);
}

class LenderaStore {
  constructor() {
    this.state = { ...initialState, progress: calculateProgress(initialState) };
    this.listeners = new Set();
    dispatcher.register(this.handleAction.bind(this));
  }

  getState() { return this.state; }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emitChange() {
    this.listeners.forEach((l) => l());
  }

  setState(nextState) {
    this.state = { ...nextState, progress: calculateProgress(nextState) };
    this.emitChange();
  }

  addNotification(message, tone = 'default') {
    const item = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      message,
      tone,
    };
    this.setState({
      ...this.state,
      application: {
        ...this.state.application,
        notifications: [item, ...this.state.application.notifications].slice(0, 5),
      },
    });
  }

  handleAction(action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        this.setState({ ...this.state, session: { isLoggedIn: true, userName: action.payload.userName } });
        this.addNotification(`Bienvenido, ${action.payload.userName}.`, 'success');
        break;
      case 'SAVE_PERSONAL_DATA':
        this.setState({ ...this.state, application: { ...this.state.application, personalData: { ...action.payload }, currentStep: 2 } });
        this.addNotification('Datos personales guardados correctamente.', 'success');
        break;
      case 'KYC_STARTED':
        this.setState({ ...this.state, application: { ...this.state.application, kycStatus: 'loading' } });
        this.addNotification('Validación de identidad en proceso.', 'default');
        break;
      case 'KYC_SUCCESS':
        this.setState({ ...this.state, application: { ...this.state.application, kycStatus: 'success', currentStep: 3 } });
        this.addNotification('Identidad validada correctamente.', 'success');
        break;
      case 'KYC_ERROR':
        this.setState({ ...this.state, application: { ...this.state.application, kycStatus: 'error' } });
        this.addNotification('No fue posible validar la identidad. Intenta de nuevo.', 'error');
        break;
      case 'DOCUMENT_UPLOAD_STARTED':
        this.setState({ ...this.state, application: { ...this.state.application, documentsStatus: 'loading' } });
        this.addNotification('Cargando documentos al sistema.', 'default');
        break;
      case 'DOCUMENT_UPLOAD_SUCCESS':
        this.setState({ ...this.state, application: { ...this.state.application, documentsStatus: 'success', currentStep: 4 } });
        this.addNotification('Documentos cargados y verificados.', 'success');
        break;
      case 'DOCUMENT_UPLOAD_ERROR':
        this.setState({ ...this.state, application: { ...this.state.application, documentsStatus: 'error' } });
        this.addNotification('Error al cargar documentos. Verifica el archivo y reintenta.', 'error');
        break;
      case 'SUBMIT_FOR_REVIEW':
        this.setState({ ...this.state, application: { ...this.state.application, approvalStatus: 'reviewing' } });
        this.addNotification('Tu solicitud fue enviada a evaluación.', 'default');
        break;
      case 'APPROVE_APPLICATION':
        this.setState({ ...this.state, application: { ...this.state.application, approvalStatus: 'approved' } });
        this.addNotification('Solicitud aprobada. Listo para desembolso.', 'success');
        break;
      case 'REJECT_APPLICATION':
        this.setState({ ...this.state, application: { ...this.state.application, approvalStatus: 'rejected' } });
        this.addNotification('Solicitud rechazada por validación interna.', 'error');
        break;
      case 'GO_TO_STEP':
        this.setState({ ...this.state, application: { ...this.state.application, currentStep: action.payload.step } });
        break;
      case 'RESET_APPLICATION':
        this.setState({ ...initialState, session: this.state.session });
        this.addNotification('Se reinició la solicitud para una nueva simulación.', 'default');
        break;
    }
  }
}

const lenderaStore = new LenderaStore();

const {useSyncExternalStore} = await importShared('react');

function useLenderaStore() {
  return useSyncExternalStore(
    (listener) => lenderaStore.subscribe(listener),
    () => lenderaStore.getState(),
    () => lenderaStore.getState()
  );
}

const lenderaActions = {
  login(userName) {
    dispatcher.dispatch({ type: 'LOGIN_SUCCESS', payload: { userName } });
  },

  savePersonalData(data) {
    dispatcher.dispatch({ type: 'SAVE_PERSONAL_DATA', payload: data });
  },

  startKyc() {
    dispatcher.dispatch({ type: 'KYC_STARTED' });
    window.setTimeout(() => {
      const ok = Math.random() > 0.2;
      dispatcher.dispatch({ type: ok ? 'KYC_SUCCESS' : 'KYC_ERROR' });
    }, 1400);
  },

  uploadDocument() {
    dispatcher.dispatch({ type: 'DOCUMENT_UPLOAD_STARTED' });
    window.setTimeout(() => {
      const ok = Math.random() > 0.2;
      dispatcher.dispatch({ type: ok ? 'DOCUMENT_UPLOAD_SUCCESS' : 'DOCUMENT_UPLOAD_ERROR' });
    }, 1400);
  },

  submitForReview() {
    dispatcher.dispatch({ type: 'SUBMIT_FOR_REVIEW' });
    window.setTimeout(() => {
      const approved = Math.random() > 0.35;
      dispatcher.dispatch({ type: approved ? 'APPROVE_APPLICATION' : 'REJECT_APPLICATION' });
    }, 1600);
  },

  goToStep(step) {
    dispatcher.dispatch({ type: 'GO_TO_STEP', payload: { step } });
  },

  resetApplication() {
    dispatcher.dispatch({ type: 'RESET_APPLICATION' });
  },
};

const steps = [
  { id: 1, title: 'Datos',      emoji: '👤' },
  { id: 2, title: 'KYC',        emoji: '🛡️' },
  { id: 3, title: 'Documentos', emoji: '📄' },
  { id: 4, title: 'Resultado',  emoji: '💳' },
];

const MF_DOMAINS = [
  { name: 'mf-auth',        port: 3001, owner: 'Seguridad / Identidad',   desc: 'Autenticación' },
  { name: 'mf-onboarding',  port: 3002, owner: 'Experiencia cliente',      desc: 'Datos del solicitante' },
  { name: 'mf-kyc',         port: 3003, owner: 'Compliance',               desc: 'Validación KYC' },
  { name: 'mf-documents',   port: 3004, owner: 'Compliance',               desc: 'Carga documental' },
  { name: 'mf-credit',      port: 3005, owner: 'Crédito',                  desc: 'Evaluación crediticia' },
];

await importShared('react');
function Stepper({ currentStep }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "step-grid", children: steps.map((step) => {
    const active = currentStep === step.id;
    const done = currentStep > step.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `step-card ${active ? "step-card-active" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `step-icon ${done ? "step-icon-done" : active ? "step-icon-active" : ""}`, children: done ? "✓" : step.emoji }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "step-label", children: [
          "Paso ",
          step.id
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "step-title", children: step.title })
      ] })
    ] }, step.id);
  }) });
}

await importShared('react');
function SummaryPanel() {
  const state = useLenderaStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Resumen de arquitectura" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Microfrontends integrados vía Module Federation (client-side)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body stack-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Integración:" }),
        " Client-side · Vite Plugin Federation."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Comunicación:" }),
        " Event Bus sobre ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "window" }),
        " (CustomEvent)."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Estado central:" }),
        " Flux en el shell → difundido a todos los MFs."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Aislamiento:" }),
        " Cada MF tiene su propio bundle y equipo."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Progreso actual:" }),
        " ",
        state.progress,
        "%"
      ] })
    ] })
  ] });
}

await importShared('react');

function NotificationList({ items }) {
  if (!items.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: "Aún no hay eventos en el flujo." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stack-sm", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `notification ${item.tone === "success" ? "notification-success" : item.tone === "error" ? "notification-error" : "notification-default"}`,
      children: item.message
    },
    item.id
  )) });
}

const React$3 = await importShared('react');
const {useMemo} = React$3;
function FluxInspector() {
  const state = useLenderaStore();
  const snapshot = useMemo(
    () => JSON.stringify(
      {
        session: state.session,
        application: {
          currentStep: state.application.currentStep,
          kycStatus: state.application.kycStatus,
          documentsStatus: state.application.documentsStatus,
          approvalStatus: state.application.approvalStatus,
          personalData: state.application.personalData
        },
        progress: state.progress
      },
      null,
      2
    ),
    [state]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Inspector de estado — Shell" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Estado centralizado del shell. Los MFs reciben este estado vía ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "lendera:state" }),
        " y reaccionan sin acoplarse al store."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "code-block", children: snapshot }) })
  ] });
}

const React$2 = await importShared('react');
const {Suspense: Suspense$1} = React$2;

class ErrorBoundary extends React$2.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "error-banner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          "Error al cargar ",
          this.props.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
          "Verifica que el microfrontend esté corriendo en su puerto.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          this.state.error?.message
        ] })
      ] });
    }
    return this.props.children;
  }
}
function MFWrapper({ name, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { name, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Suspense$1,
    {
      fallback: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-box", children: [
        "Cargando ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: name }),
        "..."
      ] }),
      children
    }
  ) });
}

const React$1 = await importShared('react');
const {Suspense,lazy} = React$1;
const LoginPanel = lazy(() => __federation_method_getRemote("mfAuth" , "./LoginPanel").then(module=>__federation_method_wrapDefault(module, true)));
const PersonalDataStep = lazy(() => __federation_method_getRemote("mfOnboarding" , "./PersonalDataStep").then(module=>__federation_method_wrapDefault(module, true)));
const KycStep = lazy(() => __federation_method_getRemote("mfKyc" , "./KycStep").then(module=>__federation_method_wrapDefault(module, true)));
const DocumentsStep = lazy(() => __federation_method_getRemote("mfDocuments" , "./DocumentsStep").then(module=>__federation_method_wrapDefault(module, true)));
const ResultStep = lazy(() => __federation_method_getRemote("mfCredit" , "./ResultStep").then(module=>__federation_method_wrapDefault(module, true)));
function CurrentStepView({ currentStep }) {
  if (currentStep === 2) return /* @__PURE__ */ jsxRuntimeExports.jsx(MFWrapper, { name: "mf-kyc", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KycStep, {}) }, "kyc");
  if (currentStep === 3) return /* @__PURE__ */ jsxRuntimeExports.jsx(MFWrapper, { name: "mf-documents", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentsStep, {}) }, "doc");
  if (currentStep === 4) return /* @__PURE__ */ jsxRuntimeExports.jsx(MFWrapper, { name: "mf-credit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResultStep, {}) }, "crd");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MFWrapper, { name: "mf-onboarding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PersonalDataStep, {}) }, "onb");
}
function App() {
  const state = useLenderaStore();
  const { currentStep } = state.application;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-shell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pill", children: "Microfrontends · Module Federation · Flux" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Lendera · Arquitectura de Microfrontends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Cada paso del flujo es un microfrontend independiente (dominio propio, bundle separado, equipo autónomo). El shell orquesta el estado central con Flux y lo difunde a los MFs mediante un event bus sobre ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "window" }),
          "."
        ] })
      ] }),
      state.session.isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row gap-sm wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "button button-secondary",
            onClick: () => lenderaActions.goToStep(Math.max(1, currentStep - 1)),
            children: "Retroceder"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "button button-secondary", onClick: lenderaActions.resetApplication, children: "Reiniciar demo" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "stack-lg", children: !state.session.isLoggedIn ? (
        /* mf-auth — dominio: Seguridad / Identidad */
        /* @__PURE__ */ jsxRuntimeExports.jsx(MFWrapper, { name: "mf-auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPanel, {}) })
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Progreso del flujo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Orquestado por el shell — estado difundido vía event bus a cada MF." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body stack-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { currentStep }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-fill", style: { width: `${state.progress}%` } }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrentStepView, { currentStep })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "stack-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Eventos recientes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Notificaciones del store central del shell." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationList, { items: state.application.notifications }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FluxInspector, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Dominios funcionales activos" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body stack-sm", children: MF_DOMAINS.map((mf) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: mf.name }),
            " → :",
            mf.port,
            "  ·  ",
            mf.desc,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", style: { fontSize: "0.82rem" }, children: [
              "Equipo: ",
              mf.owner
            ] })
          ] }, mf.name)) })
        ] })
      ] })
    ] })
  ] }) });
}

/**
 * eventBridge.js — Shell
 *
 * Patrón: Event Bus sobre window.
 *
 * MF → Shell : window CustomEvent 'lendera:action'   { type, payload }
 * Shell → MF : window CustomEvent 'lendera:state'    { ...storeState }
 * MF → Shell : window CustomEvent 'lendera:requestState'  (sin payload)
 *
 * El shell traduce los eventos de acción al dispatcher Flux y
 * difunde el nuevo estado a todos los MFs cargados en el documento.
 */


function initEventBridge() {
  // ── MF → Shell ──────────────────────────────────────────────
  window.addEventListener('lendera:action', (e) => {
    const { type, payload } = e.detail ?? {};
    switch (type) {
      case 'LOGIN_SUCCESS':
        lenderaActions.login(payload?.userName ?? 'Usuario');
        break;
      case 'SAVE_PERSONAL_DATA':
        lenderaActions.savePersonalData(payload);
        break;
      case 'START_KYC':
        lenderaActions.startKyc();
        break;
      case 'UPLOAD_DOCUMENT':
        lenderaActions.uploadDocument();
        break;
      case 'SUBMIT_FOR_REVIEW':
        lenderaActions.submitForReview();
        break;
      case 'GO_TO_STEP':
        lenderaActions.goToStep(payload?.step);
        break;
      case 'RESET_APPLICATION':
        lenderaActions.resetApplication();
        break;
    }
  });

  // ── MF pide estado al montar ─────────────────────────────────
  window.addEventListener('lendera:requestState', broadcastState);

  // ── Shell → MFs: difunde cada cambio del store ───────────────
  lenderaStore.subscribe(broadcastState);
}

function broadcastState() {
  window.dispatchEvent(
    new CustomEvent('lendera:state', { detail: lenderaStore.getState() })
  );
}

const React = await importShared('react');
initEventBridge();
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
