"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (time) {
  var date = new Date(time);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay()
  };
};