'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = objectValueStr;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 单层对象属性值的字符转换
function objectValueStr(obj) {
  var target = obj;
  if ((typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) !== 'object') return obj;
  (0, _entries2.default)(target).map(function (kv) {
    var _kv = (0, _slicedToArray3.default)(kv, 2),
        k = _kv[0],
        v = _kv[1];

    target[k] = typeof v === 'number' ? v.toString() : v;
    return kv;
  });
  return target;
}