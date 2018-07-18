import Device from '../Device';

export default {
  $_resizeOnly: {},
  // 距离视窗的顶部
  getOffsetTop(dom, top = 0) {
    return Device.type.browser(() => {
      if (!dom.offsetParent) return top + (!dom.offsetTop ? 0 : dom.offsetTop);
      return this.getOffsetTop(dom.offsetParent, top + dom.offsetTop);
    });
  },
  getOffsetLeft(dom, left = 0) {
    return Device.type.browser(() => {
      if (!dom.offsetParent) return left + (!dom.offsetLeft ? 0 : dom.offsetLeft)
      return this.getOffsetLeft(dom.offsetParent, left + dom.offsetLeft);
    });
  },
  // 仅绑定一次
  oneResize(n, cb) {
    if (!this.$_resizeOnly[n]) {
      window.addEventListener('resize', cb);
      this.$_resizeOnly[n] = true;
    }
  },
  resize(cb) {
    window.addEventListener('resize', cb);
  },
};
