const util = window.$lilia_util;

// 鼠标事件
const mouse = {
  mouseStart(e) {
    this.m$HasTouched = true;
    this.initTap({ x: e.pageX, y: e.pageY });
  },
  mouseMove() {
    this.m$HasTouched = false;
  },
  mouseEnd(e) {
    const { m$HasTouched } = this;
    e.preventDefault();
    if (m$HasTouched) {
      this.m$HasTouched = false;
      this.doTap({ x: e.pageX, y: e.pageY }, e);
    }
  },
};

// 触摸事件
const touch = {
  touchStart(e) {
    const fingers = e.touches;
    this.m$HasTouched = true;
    this.initTap({
      x: fingers[0].pageX,
      y: fingers[0].pageY,
    });
  },
  touchMove() {
    this.m$HasTouched = false;
  },
  touchEnd(e) {
    const fingers = e.changedTouches;
    if (this.m$HasTouched) {
      this.m$HasTouched = false;
      this.doTap({
        x: fingers[0].pageX,
        y: fingers[0].pageY,
      }, e);
    }
  },
};

// 动态计算
const computed = {
  hasTapped() {
    const { m$HasTouched } = this;
    return m$HasTouched ? 'btn-tap' : '';
  },
  hasDisabled() {
    const { m$Disabled } = this;
    return m$Disabled ? 'btn-disabled' : '';
  },
};

// 组件方法
const methods = {
  ...mouse,
  ...touch,
  //校验环境
  checkEnvironment() {
    const rule = /ios|ipod|ipad|iphone|android/i;
    const { userAgent } = window.navigator;
    this.m$HasMobile = rule.test(userAgent);
    util.Dom.base.oneResize('$_MOO_BTN', () => {
      this.m$HasMobile = rule.test(userAgent);
    });
  },
  // 初始化点击信息
  initTap({x, y}) {
    this.m$IsCanTap = true;
    this.m$TapStartX = x;
    this.m$TapStartY = y;
  },
  // 是否可以点击
  hasCanTap({x, y}) {
    const { m$TapStartX, m$TapStartY } = this;
    const spaceX = m$TapStartX - x;
    const spaceY = m$TapStartY - y;

    if (!this.m$IsCanTap) return false;
    if (spaceX  > 10 || spaceX < -10) return false;
    if (spaceY > 10 || spaceY < -10) return false;

    return true;
  },
  // 执行事件
  doTap(point, event) {
    if  (!this.hasCanTap(point) || this.m$Disabled) return;

    this.$emit('tap', {
      name: this.m$Name || '',
      event,
    });
  },
};

export default {
  computed,
  methods,
};
