"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };
};