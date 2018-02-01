'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (express) {
  var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var z = void 0,
      t = void 0,
      e = void 0;

  if ((typeof d === 'undefined' ? 'undefined' : (0, _typeof3.default)(d)) === 'object' && d !== null && !(d instanceof Date)) {
    z = d.year + '/' + d.month + '/' + d.day;
  } else {
    z = d;
  }

  if (z instanceof Date) {
    t = d;
  } else if (typeof z === 'number' || typeof z === 'string') {
    t = new Date(z);
  } else {
    t = new Date();
  }

  var Y = t.getFullYear();
  var M = t.getMonth() + 1;
  var D = t.getDate();
  var H = t.getHours();
  var I = t.getMinuters();
  var S = t.getSeconds();

  // YYYY-MM-DD, YY-MM-DD
  e = express;
  e = e.replace(/YYYY/g, Y);
  e = e.replace(/YY/g, Y.toString().substr(2, 4));
  e = e.replace(/MM/g, M < 10 ? '0' + M : M);
  e = e.replace(/M/g, M);
  e = e.replace(/DD/g, D < 10 ? '0' + D : D);
  e = e.replace(/D/g, D);
  e = e.replace(/HH/g, H < 10 ? '0' + H : H);
  e = e.replace(/H/g, H);
  e = e.replace(/II/g, I < 10 ? '0' + I : I);
  e = e.replace(/I/g, I);
  e = e.replace(/SS/g, S < 10 ? '0' + S : S);
  e = e.replace(/S/g, S);

  return e;
};