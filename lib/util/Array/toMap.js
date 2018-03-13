"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (map, select, format) {
  var key = {};
  select.map(function (k) {
    key[k] = map[k];
  });
  return key;
};