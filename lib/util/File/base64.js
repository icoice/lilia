"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (file, cb) {
  var b64 = new FileReader();
  b64.onloadend = function () {
    return cb && cb(b64.result);
  };
  b64.readAsDataURL(file);
};