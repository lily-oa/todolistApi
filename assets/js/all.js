"use strict";

var user = document.querySelector('.username');
var header_logout = document.querySelector('.header_logout');

// init start
// 檢查有無token，若無token 不顯示登入後畫面

init_token_render();
function init_token_render() {
  if (sessionStorage.getItem('token')) {
    var user_name = sessionStorage.getItem('name');
    header_logout.innerHTML = "\n    <span class=\"d-none d-lg-block me-7 username\">".concat(user_name, "\u7684\u4EE3\u8FA6\u4E8B\u9805</span>\n    <a href=\"#\" class=\"text-dark fs-7 fs-lg-6 logoutBtn\">\u767B\u51FA</a>\n    ");
  } else {
    return;
  }
}

//登出
// const logoutBtn = document.querySelector('.logoutBtn');
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', function (e) {
//     e.preventDefault();
//     axios.delete(`${apiUrl}/users/sign_out`, {
//         headers: {
//           Authorization: localStorage.token,
//         },
//       })
//       .then((res) => {
//         Swal.fire(
//             `${res.data.message}`,
//             "已登出!",
//             "success"
//           ).then((result) => {
//             if (result.isConfirmed) {
//               window.location.assign("index.html");
//             }
//           })
//           .catch((err) => console.log(err.response));
//       })
//   })
// }
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var apiUrl = 'https://todoo.5xcamp.us';
//login-------------------------------------
var loginInput = document.querySelectorAll('.login-input');
var login_btn = document.querySelector('#login_btn');
var loginEmail = document.querySelector('#login-email');
var loginPassword = document.querySelector('#login-password');
var login_alert_txt = document.querySelector('.login_alert_txt'); //在 loginModal 上
var login_status_txt = document.querySelector('.login_status_txt');

//login 設定------------------------------
if (login_btn) {
  login_btn.addEventListener('click', function (e) {
    if (loginEmail.value.trim() == '' || loginPassword.value.trim() == '') {
      return;
    }
  });
  login_btn.addEventListener('click', function () {
    var login_check_ok = loginCheck();
    if (login_check_ok === true) {
      input(loginEmail.value, loginPassword.value);
    } else {
      return;
    }
  });
}
//-------------------------以上為之前發出錯誤時少寫的程式碼

function login(loginEmail, loginPassword) {
  login_status_txt.textContent = '登入中請稍後 ...';
  return axios.post("".concat(apiUrl, "/users/sign_in"), {
    "user": {
      "email": loginEmail,
      "password": loginPassword
    }
  });
}
var input = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(mail, pwd) {
    var loginModal, res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          loginModal = new bootstrap.Modal('.js-login-modal');
          _context.prev = 1;
          _context.next = 4;
          return login(mail, pwd);
        case 4:
          res = _context.sent;
          //設置默認標頭的機制語法，該標頭將隨您發出的每個請求一起發送
          axios.defaults.headers.common['Authorization'] = res.headers.authorization;
          sessionStorage.setItem('token', res.headers.authorization);
          sessionStorage.setItem('name', res.data.nickname);
          setTimeout(function () {
            login_status_txt.textContent = '';
            login_alert_txt.innerHTML = "\u767B\u5165\u6210\u529F ! \u6B61\u8FCE".concat(res.data.nickname, " \u56DE\u4F86 <br><br> \u5373\u5C07\u8DF3\u8F49\u5F85\u8FA6\u6E05\u55AE...");
            loginModal.show();
            loginReset();
            setTimeout(function () {
              document.location.href = './addTodos.html';
            }, 2000);
          }, 1000);
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          setTimeout(function () {
            login_status_txt.textContent = '';
            login_alert_txt.textContent = '登入失敗，您的Email或密碼有誤!';
            loginModal.show();
            loginReset();
          }, 1000);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 11]]);
  }));
  return function input(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
function loginCheck() {
  var isnull = false;
  var _iterator = _createForOfIteratorHelper(loginInput),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (item.value === '') {
        isnull = true;
        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (isnull === true) {
    login_alert_txt.textContent = '您還有欄位尚未填寫喔!!';
    loginModal.show();
    loginReset();
    return;
  }
  //email的輸入值字串必須有 @
  if (loginEmail.value.match('@') === null) {
    login_alert_txt.textContent = '您的Email格式不正確!!!';
    loginModal.show();
    loginReset();
    return;
  }
  return true;
}
function loginReset() {
  loginEmail.value = '';
  loginPassword.value = '';
}
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
//signup---------------------------------------
var signUpInput = document.querySelectorAll('.signUpInput');
var signUpBtn = document.querySelector('.signup_btn');
var signUpEmail = document.querySelector('#signUpEmail');
var signUpNickname = document.querySelector('#signUpNickname');
var signUpPassword = document.querySelector('#signUpPassword');
var signUpPassword2 = document.querySelector('#signUpPassword2');
var signup_alert_txt = document.querySelector('.signup_alert_txt');
var signup_status_txt = document.querySelector('.signup_status_txt');

//-----------------------------------

if (signUpBtn) {
  signUpBtn.addEventListener('click', function (e) {
    if (signUpEmail.value.trim() == '' || signUpPassword.value.trim() == '' || signUpPassword2.value.trim() == '' || signUpNickname.value.trim() == '') {
      return;
    }
  });
  signUpBtn.addEventListener('click', function () {
    var format_isOk = signupCheck();
    if (format_isOk === true) {
      signup(signUpEmail, signUpNickname, signUpPassword);
    } else {
      return;
    }
  });
}
function signup(signUpEmail, signUpNickname, signUpPassword) {
  signup_status_txt.textContent = "\u8A3B\u518A\u4E2D\u8ACB\u7A0D\u5F8C ... ";
  var signupModal = new bootstrap.Modal('.js-signup-modal');
  return axios.post("".concat(apiUrl, "/users"), {
    "user": {
      "email": signUpEmail.value,
      "nickname": signUpNickname.value,
      "password": signUpPassword.value
    }
  }).then(function (res) {
    setTimeout(function () {
      signup_alert_txt.innerHTML = "\u8A3B\u518A\u6210\u529F ! \u6B61\u8FCE".concat(res.data.nickname, "\u5149\u81E8\u672C\u7DB2\u7AD9 <br><br> \u9801\u9762\u5373\u5C07\u57283\u79D2\u5F8C\u8DF3\u8F49\u81F3\u767B\u5165\u756B\u9762 ...");
      signupModal.show();
      signupReset();
      setTimeout(function () {
        document.location.href = './index.html';
      }, 2000);
    }, 1000);
  })["catch"](function (error) {
    console.log(error.response);
    setTimeout(function () {
      signup_alert_txt.innerHTML = "\u5F88\u62B1\u6B49 ! \u60A8\u7684".concat(error.response.data.error[0], " \u8ACB\u91CD\u65B0\u8A3B\u518A");
      signupModal.show();
      signup_status_txt.textContent = '';
      signupReset();
    }, 1000);
  });
}
function signupCheck() {
  var isnull = false;
  var _iterator = _createForOfIteratorHelper(signUpInput),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (item.value == '') {
        isnull = true;
        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (isnull === true) {
    signup_alert_txt.textContent = '您還有欄位尚未填寫';
    signupModal.show();
    return;
  }
  if (signUpEmail.value.match('@') === null) {
    signup_alert_txt.textContent = 'Email 格式不正確';
    signupModal.show();
    signupReset();
    return;
  }
  if (signUpPassword.value.trim().length < 6) {
    signup_alert_txt.textContent = '密碼必須6個字以上喔 ! ';
    signupModal.show();
    signupReset();
    // 為何以下這兩個程式碼不能用 signupReset(); 去取代 
    // signUpPassword.value = '';
    // signUpPassword2.value = '';
    return;
  }
  if (signUpPassword.value !== signUpPassword2.value) {
    signup_alert_txt.textContent = '兩次的密碼輸入不一致喔 ! ';
    signupModal.show();
    signupReset();
    // 為何以下這兩個程式碼不能用 signupReset(); 去取代 
    // signUpPassword.value = '';
    // signUpPassword2.value = '';
    return;
  }
  return true;
}
function signupReset() {
  signUpEmail.value = '';
  signUpNickname.value = '';
  signUpPassword.value = '';
  signUpPassword2.value = '';
}
//# sourceMappingURL=all.js.map
