'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = hasEmpty;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasEmpty(word) {
  return word === '' || word === null || (0, _stringify2.default)(word) === '{}' || (0, _stringify2.default)(word) === '[]' || typeof word === 'undefined';
}