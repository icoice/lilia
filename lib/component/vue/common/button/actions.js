'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = window.$util;

var mouse = {
  mouseStart: function mouseStart(e) {
    this.m$HasTouched = true;
    this.initTap({ x: e.pageX, y: e.pageY });
  },
  mouseMove: function mouseMove() {
    this.m$HasTouched = false;
  },
  mouseEnd: function mouseEnd(e) {
    var m$HasTouched = this.m$HasTouched;

    e.preventDefault();
    if (m$HasTouched) {
      this.m$HasTouched = false;
      this.doTap({ x: e.pageX, y: e.pageY }, e);
    }
  }
};

var touch = {
  touchStart: function touchStart(e) {
    var fingers = e.touches;
    this.m$HasTouched = true;
    this.initTap({
      x: fingers[0].pageX,
      y: fingers[0].pageY
    });
  },
  touchMove: function touchMove() {
    this.m$HasTouched = false;
  },
  touchEnd: function touchEnd(e) {
    var fingers = e.changedTouches;
    if (this.m$HasTouched) {
      this.m$HasTouched = false;
      this.doTap({
        x: fingers[0].pageX,
        y: fingers[0].pageY
      }, e);
    }
  }
};

var computed = {
  hasTapped: function hasTapped() {
    var m$HasTouched = this.m$HasTouched;

    return m$HasTouched ? 'btn-tap' : '';
  },
  hasDisabled: function hasDisabled() {
    var m$Disabled = this.m$Disabled;

    return m$Disabled ? 'btn-disabled' : '';
  }
};

var methods = (0, _extends3.default)({}, mouse, touch, {
  checkEnvironment: function checkEnvironment() {
    var _this = this;

    var rule = /ios|ipod|ipad|iphone|android/i;
    var userAgent = window.navigator.userAgent;

    this.m$HasMobile = rule.test(userAgent);
    util.Dom.base.oneResize('$_MOO_BTN', function () {
      _this.m$HasMobile = rule.test(userAgent);
    });
  },
  initTap: function initTap(_ref) {
    var x = _ref.x,
        y = _ref.y;

    this.m$IsCanTap = true;
    this.m$TapStartX = x;
    this.m$TapStartY = y;
  },
  hasCanTap: function hasCanTap(_ref2) {
    var x = _ref2.x,
        y = _ref2.y;
    var m$TapStartX = this.m$TapStartX,
        m$TapStartY = this.m$TapStartY;

    var spaceX = m$TapStartX - x;
    var spaceY = m$TapStartY - y;

    if (!this.m$IsCanTap) return false;
    if (spaceX > 10 || spaceX < -10) return false;
    if (spaceY > 10 || spaceY < -10) return false;

    return true;
  },
  doTap: function doTap(point, e) {
    if (!this.hasCanTap(point) || this.m$Disabled) return;

    this.$emit('tap', {
      name: this.m$Name || '',
      event: e
    });
  }
});

exports.default = {
  computed: computed,
  methods: methods
};