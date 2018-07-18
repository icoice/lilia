'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = window.$mooUtil;

var methods = {
  tap: function tap(code, item) {
    var newSelected = [];
    var selected = this.m$Selected;

    if (this.m$Selected.indexOf(code) < 0) {
      this.m$Selected.push(code);
      selected = (0, _assign2.default)([], this.m$Selected);
    } else {
      this.m$Selected.map(function (boxCode) {
        if (boxCode !== code) {
          newSelected.push(boxCode);
        }
      });
      selected = newSelected;
      this.m$Selected = newSelected;
    }

    this.$emit('tap', selected);
  },
  btnSelected: function btnSelected(code, item) {
    var m$Selected = this.m$Selected;

    return m$Selected.indexOf(code) >= 0 || m$Selected.indexOf(item.key) >= 0;
  }
};

exports.default = {
  methods: methods
};