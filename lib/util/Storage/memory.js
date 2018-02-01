'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var space = {};

exports.default = function (name, target) {
  if (typeof target !== 'undefined') {
    space[name] = target;
  } else {
    return space[name];
  }
};