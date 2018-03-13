'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Assert = require('../Assert');

var _Assert2 = _interopRequireDefault(_Assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (map, select, format) {
  var keys = [];
  select.map(function (k) {
    keys.push(format(k, map[k]));
  });
  return keys;
};