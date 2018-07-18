'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var methods = {
  iconChange: function iconChange() {
    return this.listOpen ? 'icon-arrowup' : 'icon-arrowdown';
  },
  selectDefaultChange: function selectDefaultChange() {
    return this.listOpen ? 'list-open' : 'list-close';
  },
  hasMoveOnSelect: function hasMoveOnSelect() {
    this.isMoveOver = 1;
  },
  hasMouseLeave: function hasMouseLeave() {
    this.isMoveOver = 0;
  },
  bindMouseMenus: function bindMouseMenus() {
    var _this = this;

    if (!this.isBindMouseMenus) {
      window.addEventListener('click', function () {
        if (!_this.isMoveOver) _this.listOpen = false;
      }, true);
      this.isBindMouseMenus = true;
    }
  },
  openlist: function openlist() {
    this.listOpen = !this.listOpen;
    this.$emit('open', this.openlist);
  },
  selectOption: function selectOption(item) {
    this.selected = item;
    this.listOpen = !this.listOpen;
    this.$emit('change', this.selected);
  }
};

exports.default = {
  methods: methods
};