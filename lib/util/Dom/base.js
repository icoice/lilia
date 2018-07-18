'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Device = require('../Device');

var _Device2 = _interopRequireDefault(_Device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  $_resizeOnly: {},
  getOffsetTop: function getOffsetTop(dom) {
    var _this = this;

    var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return _Device2.default.type.browser(function () {
      if (!dom.offsetParent) return top + (!dom.offsetTop ? 0 : dom.offsetTop);
      return _this.getOffsetTop(dom.offsetParent, top + dom.offsetTop);
    });
  },
  getOffsetLeft: function getOffsetLeft(dom) {
    var _this2 = this;

    var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return _Device2.default.type.browser(function () {
      if (!dom.offsetParent) return left + (!dom.offsetLeft ? 0 : dom.offsetLeft);
      return _this2.getOffsetLeft(dom.offsetParent, left + dom.offsetLeft);
    });
  },
  oneResize: function oneResize(n, cb) {
    if (!this.$_resizeOnly[n]) {
      window.addEventListener('resize', cb);
      this.$_resizeOnly[n] = true;
    }
  },
  resize: function resize(cb) {
    window.addEventListener('resize', cb);
  }
};