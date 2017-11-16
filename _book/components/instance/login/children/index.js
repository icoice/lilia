'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qrcode = exports.account = undefined;

var _account2 = require('./account');

var _account3 = _interopRequireDefault(_account2);

var _qrcode2 = require('./qrcode');

var _qrcode3 = _interopRequireDefault(_qrcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var account = exports.account = _account3.default;
var qrcode = exports.qrcode = _qrcode3.default;

exports.default = {
  account: account,
  qrcode: qrcode
};