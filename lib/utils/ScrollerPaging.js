'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = ScrollerPaging;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// scroller的分页用法支持
function ScrollerPaging(scroller) {
  this.data = {};
  this.currentPage = null;
  this.onChange = function onChange(me, callback) {
    var _this = this;

    if (this.currentPage !== me.nextPage || me.isRefresh) {
      this.currentPage = me.nextPage;
      if (callback) {
        callback(function (params) {
          return _this.getter(params);
        }, function (data) {
          return _this.setter(_this.currentPage, data);
        }, me);
      }
    }
  };
  this.setter = function setter(page, data) {
    this.data[page] = (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object' && data instanceof Array ? data : [];
  };
  this.getter = function getter(me) {
    var data = this.data;

    var allData = [];
    (0, _entries2.default)(data).map(function (kv) {
      var _kv = (0, _slicedToArray3.default)(kv, 2),
          v = _kv[1];

      allData = allData.concat(v);
      return kv;
    });
    return !me ? allData : data[scroller.page];
  };
}