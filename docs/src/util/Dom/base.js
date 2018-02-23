import Device from '../Device';

export default {
  // 距离视窗的睇病
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
  resize(cb) {
    window.addEventListener('resize', cb);
  },
};
