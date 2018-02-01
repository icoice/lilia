"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // 距离视窗的睇病
  getOffsetTop: function getOffsetTop(dom) {
    var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (!dom.offsetParent) {
      return top + (!dom.offsetTop ? 0 : dom.offsetTop);
    }
    return this.getOffsetTop(dom.offsetParent, top + dom.offsetTop);
  },
  getOffsetLeft: function getOffsetLeft(dom) {
    var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (!dom.offsetParent) {
      return left + (!dom.offsetLeft ? 0 : dom.offsetLeft);
    }
    return this.getOffsetLeft(dom.offsetParent, left + dom.offsetLeft);
  }
};