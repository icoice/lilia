"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = arguments[1];
  return data.map(function (item) {
    var newItem = {};
    (0, _entries2.default)(item).map(function (kv) {
      var _kv = (0, _slicedToArray3.default)(kv, 2),
          k = _kv[0],
          v = _kv[1];

      (0, _entries2.default)(keys).map(function (ikv) {
        var _ikv = (0, _slicedToArray3.default)(ikv, 2),
            ik = _ikv[0],
            iv = _ikv[1];

        if (k === ik) newItem[iv] = v;
      });
      return kv;
    });
    return newItem;
  });
};