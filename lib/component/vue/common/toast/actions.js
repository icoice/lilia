'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var timeoutID = null;

var methods = {
  open: function open() {
    this.m$Show = true;
    this.$emit('onoff', true);
  },
  close: function close() {
    this.m$Show = false;
    this.$emit('onoff', false);
  },
  sandClock: function sandClock() {
    var _this = this;

    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      if (_this.m$Show) _this.close();
    }, this.m$Timeout);
  }
};

exports.default = {
  methods: methods
};