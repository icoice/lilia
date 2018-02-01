'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firstUppercase = require('./firstUppercase');

var _firstUppercase2 = _interopRequireDefault(_firstUppercase);

var _replaceHump = require('./replaceHump');

var _replaceHump2 = _interopRequireDefault(_replaceHump);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  firstUppercase: _firstUppercase2.default,
  replaceHump: _replaceHump2.default
};