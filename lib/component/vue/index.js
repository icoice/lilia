'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.mooTree = exports.mooImg = exports.mooMeasure = exports.mooMultipleChoose = exports.mooLouver = exports.mooMemo = exports.mooTable = exports.mooToast = exports.mooShowcase = exports.mooSelect = exports.mooRadio = exports.mooPaging = exports.mooInput = exports.mooLoading = exports.mooFile = exports.mooDatepicker = exports.mooDate = exports.mooCondition = exports.mooCheckbox = exports.mooBtn = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _component;

var _button = require('./parts/common/button');

var _button2 = _interopRequireDefault(_button);

var _checkbox = require('./parts/common/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _file = require('./parts/common/file');

var _file2 = _interopRequireDefault(_file);

var _loading = require('./parts/common/loading');

var _loading2 = _interopRequireDefault(_loading);

var _memo = require('./parts/common/memo');

var _memo2 = _interopRequireDefault(_memo);

var _image = require('./parts/common/image');

var _image2 = _interopRequireDefault(_image);

var _input = require('./parts/common/input');

var _input2 = _interopRequireDefault(_input);

var _radio = require('./parts/common/radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('./parts/common/select');

var _select2 = _interopRequireDefault(_select);

var _toast = require('./parts/common/toast');

var _toast2 = _interopRequireDefault(_toast);

var _measure = require('./parts/instance/measure');

var _measure2 = _interopRequireDefault(_measure);

var _date = require('./parts/instance/date');

var _date2 = _interopRequireDefault(_date);

var _datepicker = require('./parts/instance/datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _sheet = require('./parts/instance/sheet');

var _sheet2 = _interopRequireDefault(_sheet);

var _table = require('./parts/instance/table');

var _table2 = _interopRequireDefault(_table);

var _tree = require('./parts/instance/tree');

var _tree2 = _interopRequireDefault(_tree);

var _condition = require('./parts/instance/condition');

var _condition2 = _interopRequireDefault(_condition);

var _showcase = require('./parts/instance/showcase');

var _showcase2 = _interopRequireDefault(_showcase);

var _paging = require('./parts/instance/paging');

var _paging2 = _interopRequireDefault(_paging);

var _multipleChoose = require('./parts/instance/multipleChoose');

var _multipleChoose2 = _interopRequireDefault(_multipleChoose);

var _louver = require('./parts/instance/louver');

var _louver2 = _interopRequireDefault(_louver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mooBtn = exports.mooBtn = _button2.default;
var mooCheckbox = exports.mooCheckbox = _checkbox2.default;
var mooCondition = exports.mooCondition = _condition2.default;
var mooDate = exports.mooDate = _date2.default;
var mooDatepicker = exports.mooDatepicker = _datepicker2.default;
var mooFile = exports.mooFile = _file2.default;
var mooLoading = exports.mooLoading = _loading2.default;
var mooInput = exports.mooInput = _input2.default;
var mooPaging = exports.mooPaging = _paging2.default;
var mooRadio = exports.mooRadio = _radio2.default;
var mooSelect = exports.mooSelect = _select2.default;
var mooShowcase = exports.mooShowcase = _showcase2.default;
var mooToast = exports.mooToast = _toast2.default;
var mooTable = exports.mooTable = _table2.default;
var mooMemo = exports.mooMemo = _memo2.default;
var mooLouver = exports.mooLouver = _louver2.default;
var mooMultipleChoose = exports.mooMultipleChoose = _multipleChoose2.default;
var mooMeasure = exports.mooMeasure = _measure2.default;
var mooImg = exports.mooImg = _image2.default;
var mooTree = exports.mooTree = _tree2.default;

var component = (_component = {
  mooBtn: mooBtn,
  mooCheckbox: mooCheckbox,
  mooCondition: mooCondition,
  mooDate: mooDate,
  mooDatepicker: mooDatepicker,
  mooFile: mooFile,
  mooLoading: mooLoading,
  mooInput: mooInput,
  mooPaging: mooPaging,
  mooRadio: mooRadio,
  mooSelect: mooSelect,
  mooShowcase: mooShowcase,
  mooTable: mooTable,
  mooToast: mooToast,
  mooTree: mooTree,
  mooMemo: mooMemo,
  mooMeasure: mooMeasure,
  mooMultipleChoose: mooMultipleChoose,
  mooImg: mooImg
}, (0, _defineProperty3.default)(_component, 'mooMeasure', mooMeasure), (0, _defineProperty3.default)(_component, 'mooLouver', mooLouver), _component);

var register = exports.register = function register(Vue) {
  var components = {};
  (0, _entries2.default)(component).map(function (kv) {
    var _kv = (0, _slicedToArray3.default)(kv, 2),
        n = _kv[0],
        c = _kv[1];

    components[n] = Vue.component(n, c);
    return kv;
  });
  return components;
};

exports.default = (0, _extends3.default)({}, component, {
  register: register
});