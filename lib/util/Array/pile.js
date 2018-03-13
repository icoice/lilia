"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cols, list) {
  var lines = [];
  var lineItems = [];

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