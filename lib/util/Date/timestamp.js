"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (time) {
  var date = new Date(time);
  return date.getTime();
};