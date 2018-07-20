'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drive = window.$drive;
var util = window.$util;

var methods = exports.methods = {
  allSelect: function allSelect(item) {
    item.value = [];
    item.items.map(function (v, code) {
      item.value.push(code);
    });
    this.condList = util.Array.clone(this.condList);
  },
  bindMouseMenus: function bindMouseMenus() {
    var _this = this;

    if (!this.isBindMouseMenus) {
      window.addEventListener('click', function () {
        if (!_this.isMoveOver) _this.closeComponents();
      }, true);
      this.isBindMouseMenus = true;
    }
  },
  change: function change(item, val) {
    var condList = this.condList;

    var newItem = item;
    newItem.value = val;
    this.$emit('change', (0, _assign2.default)([], condList));
  },
  closeDate: function closeDate(has) {
    this.hasDateOpen = has;
  },
  changeDate: function changeDate(val) {
    var condList = this.condList,
        dateTarget = this.dateTarget;

    var date = util.Date.toJSON(val);
    if (dateTarget) dateTarget.value = date;
    this.condList = (0, _assign2.default)([], condList);
    console.log(this.condList);
    this.$emit('change', this.condList);
  },
  changeDateStatus: function changeDateStatus(item) {
    this.dateTarget = item;
  },
  closeComponents: function closeComponents() {
    var condList = this.condList;

    var list = [];
    condList.map(function (item) {
      item.show = false;
      list.push((0, _assign2.default)({}, item));
      return item;
    });
    this.condList = list;
  },
  changeSearchCheckbox: function changeSearchCheckbox(show, item) {
    item.show = !item.show;
    if (show) this.checkboxSearchKey = '';
    this.$forceUpdate();
  },
  checkBoxSelected: function checkBoxSelected(item) {
    if (util.Assert.hasArr(item.value) && item.value.length > 0) {
      return item.value.map(function (code) {
        return item.items[code].name;
      }).join(',');
    } else {
      return item.tips || '请点击选择';
    }
  },
  formatDate: function formatDate(time) {
    return !time ? '' : util.Date.format('YYYY-MM-DD', time);
  },

  hasNoEmptry: function hasNoEmptry(items) {
    return items && items.length > 0;
  },
  hasMoveOnSelect: function hasMoveOnSelect() {
    this.isMoveOver = 1;
  },
  hasMouseLeave: function hasMouseLeave() {
    this.isMoveOver = 0;
  },
  updateSearchCheckbox: function updateSearchCheckbox(no, val) {
    this.checkboxSearchKey = (0, _assign2.default)({}, this.checkboxSearchKey, (0, _defineProperty3.default)({}, no, val));
  },
  reverse: function reverse(item) {
    var selected = util.Array.clone(item.value);
    item.value = [];
    item.items.map(function (v, code) {
      if (selected.indexOf(code) < 0) {
        item.value.push(code);
      }
    });
    this.condList = util.Array.clone(this.condList);
  },
  searchCheckbox: function searchCheckbox(no, item) {
    var _this2 = this;

    var newItems = [];
    if (this.checkboxSearchKey[no]) {
      item.items.map(function (data) {
        if (data.name.indexOf(_this2.checkboxSearchKey[no]) >= 0) {
          newItems.push(data);
        } else {
          newItems.push(null);
        }
      });
      return newItems;
    } else {
      return item.items;
    }
  },

  width: function width(cols) {
    return { width: 100 / cols + '%' };
  }
};

exports.default = {
  methods: methods
};