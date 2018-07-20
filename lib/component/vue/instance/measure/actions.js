"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var util = window.$util;

var methods = {
  hasMeasure: function hasMeasure() {
    this.measure = !this.measure;
    this.measureAll = false;

    if (!this.measure) {
      util.Dom.rule.closeMeasure();
    } else {
      util.Dom.rule.measureByClick(this.$refs.measureContent);
    }
  },
  hasAllMeasure: function hasAllMeasure() {
    this.measureAll = !this.measureAll;
    this.measure = false;

    if (!this.measureAll) {
      util.Dom.rule.closeMeasure();
    } else {
      util.Dom.rule.measureAll(this.$refs.measureContent);
    }
  }
};

exports.default = {
  methods: methods
};