'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = formatTime;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatTime(express) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var setter = (typeof date === 'undefined' ? 'undefined' : (0, _typeof3.default)(date)) === 'object' && date !== null ? date.year + '/' + date.month + '/' + date.day : date;
  var timer = typeof setter === 'number' || typeof setter === 'string' ? new Date(setter) : new Date();

  var YYYY = timer.getFullYear();
  var M = timer.getMonth() + 1;
  var D = timer.getDate();
  var dateExporess = express;

  dateExporess = dateExporess.replace(/YYYY/g, YYYY);
  dateExporess = dateExporess.replace(/YY/g, YYYY.toString().substr(2, 4));
  dateExporess = dateExporess.replace(/MM/g, M < 10 ? '0' + M : M);
  dateExporess = dateExporess.replace(/M/g, M);
  dateExporess = dateExporess.replace(/DD/g, D < 10 ? '0' + D : D);
  dateExporess = dateExporess.replace(/D/g, D < 10 ? '0' + D : D);

  return dateExporess;
};