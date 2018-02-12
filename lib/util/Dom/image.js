'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _Assert = require('../Assert');

var _Assert2 = _interopRequireDefault(_Assert);

var _Device = require('../Device');

var _Device2 = _interopRequireDefault(_Device);

var _File = require('../File');

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  base64: function base64(img, scale, cb) {
    _Device2.default.type.browser(function () {
      var canvas = document.createElement('canvas');
      var w = image.naturalWidth * scale;
      var h = image.naturalHeight * scale;
      var ctx = canvas.getContext('2d');
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);
      ctx.drawImage(img, 0, 0, width, height);
      if (_Assert2.default.hasFunc(cb)) cb(canvas.toDataURL());
    });
  },
  create: function create(src, cb) {
    return _Device2.default.type.browser(function () {
      if (_Assert2.default.hasFunc(cb)) return null;
      var img = new Image();
      img.src = src;
      img.onload = function (e) {
        return cb(img);
      };
    });
  },
  zoom: function zoom(img) {
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var create = this.create,
        express = this.express,
        base64 = this.base64;

    return new _promise2.default(function (reslove) {
      var e = function e(i) {
        return express(i, scale, function (b64) {
          return reslove(b64);
        });
      };
      if (_Assert2.default.hasFile(img)) {
        _File2.default.base64(img, function (b64) {
          return create(b64, function (i) {
            return e(i);
          });
        });
      } else if (_Assert2.default.hasStr(img)) {
        create(img, e(i));
      } else {
        e(i);
      }
    });
  }
};