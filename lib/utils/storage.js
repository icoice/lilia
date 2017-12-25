"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  set: function set(name, value) {
    try {
      localStorage.setItem(name, (0, _stringify2.default)(value));
    } catch (e) {
      this.exception(e);
    }
  },
  get: function get(name) {
    try {
      var data = localStorage.getItem(name);
      return data !== null ? JSON.parse(data) : data;
    } catch (e) {
      this.exception(e);
    }
  },

  exception: function exception() {}
};