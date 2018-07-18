'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var methods = {
  setSelect: function setSelect() {
    var m$Selected = this.m$Selected,
        m$Items = this.m$Items;

    if (m$Selected !== null) {
      this.$emit('updated', {
        code: m$Selected,
        data: m$Items[m$Selected]
      });
    }
  },
  selectRadio: function selectRadio(code, data) {
    this.m$Selected = code;
    this.$emit('tap', { code: code, data: data });
  },
  hasSelected: function hasSelected(code) {
    return this.m$Selected === code;
  }
};

exports.default = {
  methods: methods
};