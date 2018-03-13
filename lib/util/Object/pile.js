"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (cols, obj) {
  var list = [];
  var lines = [];
  var lineItems = [];

  (0, _entries2.default)(obj).map(function (kv) {
    list.push((0, _defineProperty3.default)({}, kv[0], kv[1]));
    return kv;
  });

  if (list && list.map) {
    list.map(function (item, code) {
      var n = code + 1;
      lineItems.push(item);
      if (n % cols === 0 || n === list.length) {
        lines.push(lineItems);
        lineItems = [];
      }
      return item;
    });
  }

  return lines;
};