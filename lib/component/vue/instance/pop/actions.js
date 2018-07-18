'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var methods = {
  init: function init() {
    var _this = this;

    if (!this.mooHasInit) {
      this.mooHasInit = true;
      window.addEventListener('click', function (e) {
        if (_this.mooHasInner) {
          _this.mooShow = false;
          _this.mooHasInner = false;
        }
      }, true);
    }
  },
  inner: function inner() {
    this.mooHasInner = true;
  },
  clearInner: function clearInner() {
    this.mooHasInner = false;
  },
  showPop: function showPop() {
    this.mooShow = !this.mooShow;
    this.$emit('change');
  }
};

exports.default = {
  methods: methods
};