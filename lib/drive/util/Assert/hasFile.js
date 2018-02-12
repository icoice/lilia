'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (obj) {
  return obj instanceof File || obj.toString().indexOf('File') >= 0;
};