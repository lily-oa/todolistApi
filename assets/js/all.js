"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var apiUrl = 'https://todoo.5xcamp.us';
var allinput = document.querySelectorAll('input');
var email = document.querySelector('#Email1');
var password = document.querySelector('#Password1');
var login_btn = document.querySelector('.login_btn');
var alert_txt = document.querySelector('.alert_txt');
var status_txt = document.querySelector('.status_txt');
var modal = document.querySelector('#login_modal');
var loginModal = new bootstrap.Modal(modal, {});
var input = async;
function check() {
  var isnull = false;
  var _iterator = _createForOfIteratorHelper(allinput),
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
    alert_txt.textContent = '您還有欄位尚未填寫喔!!';
    loginModal.show();
    reset();
    return;
  }
  //email的輸入值字串必須有 @
  if (email.value.match('@') === null) {
    alert.text.textContent = '您的Email格式不正確!!!';
    loginModal.show();
    reset();
    return;
  }
  return true;
}
function reset() {
  email.value = '';
  password.value = '';
}
//# sourceMappingURL=all.js.map
