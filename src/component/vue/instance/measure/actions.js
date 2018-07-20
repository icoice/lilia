const util = window.$util;

const methods = {
  hasMeasure() {
    this.measure = !this.measure;
    this.measureAll = false;

    if (!this.measure) {
      util.Dom.rule.closeMeasure();
    } else {
      util.Dom.rule.measureByClick(this.$refs.measureContent);
    }
  },
  hasAllMeasure() {
    this.measureAll = !this.measureAll;
    this.measure = false;

    if (!this.measureAll) {
      util.Dom.rule.closeMeasure();
    } else {
      util.Dom.rule.measureAll(this.$refs.measureContent);
    }
  },
};

export default {
  methods,
};
