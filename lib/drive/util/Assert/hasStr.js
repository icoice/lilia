'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (obj) {
  return typeof obj === 'string' || obj instanceof String;
};