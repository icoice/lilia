'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusEffectScroll = exports.register = exports.vpCheckbox = exports.vpImage = exports.vpDate = exports.vpFalls = exports.vpMultipleChoose = exports.vpPaging = exports.vpCategory = exports.vpTree = exports.vpShowcase = exports.vpConfirm = exports.vpDataTable = exports.vpScroller = exports.vpMemo = exports.vpToast = exports.vpRadio = exports.vpLoading = exports.vpSelect = exports.vpFile = exports.vpInput = exports.vpButton = exports.vpLogin = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _button = require('./public/common/button');

var _button2 = _interopRequireDefault(_button);

var _input = require('./public/common/input');

var _input2 = _interopRequireDefault(_input);

var _checkbox = require('./public/common/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _file = require('./public/common/file');

var _file2 = _interopRequireDefault(_file);

var _select = require('./public/common/select');

var _select2 = _interopRequireDefault(_select);

var _loading = require('./public/common/loading');

var _loading2 = _interopRequireDefault(_loading);

var _radio = require('./public/common/radio');

var _radio2 = _interopRequireDefault(_radio);

var _toast = require('./public/common/toast');

var _toast2 = _interopRequireDefault(_toast);

var _memo = require('./public/common/memo');

var _memo2 = _interopRequireDefault(_memo);

var _scroller = require('./public/common/scroller');

var _scroller2 = _interopRequireDefault(_scroller);

var _image = require('./public/common/image');

var _image2 = _interopRequireDefault(_image);

var _dataTable = require('./public/dataTable');

var _dataTable2 = _interopRequireDefault(_dataTable);

var _confirm = require('./public/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _showcase = require('./public/showcase');

var _showcase2 = _interopRequireDefault(_showcase);

var _tree = require('./public/tree');

var _tree2 = _interopRequireDefault(_tree);

var _category = require('./public/category');

var _category2 = _interopRequireDefault(_category);

var _paging = require('./public/paging');

var _paging2 = _interopRequireDefault(_paging);

var _multipleChoose = require('./public/multipleChoose');

var _multipleChoose2 = _interopRequireDefault(_multipleChoose);

var _falls = require('./public/falls');

var _falls2 = _interopRequireDefault(_falls);

var _date = require('./public/date');

var _date2 = _interopRequireDefault(_date);

var _login = require('./instance/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vpLogin = exports.vpLogin = _login2.default;
var vpButton = exports.vpButton = _button2.default;
var vpInput = exports.vpInput = _input2.default;
var vpFile = exports.vpFile = _file2.default;
var vpSelect = exports.vpSelect = _select2.default;
var vpLoading = exports.vpLoading = _loading2.default;
var vpRadio = exports.vpRadio = _radio2.default;
var vpToast = exports.vpToast = _toast2.default;
var vpMemo = exports.vpMemo = _memo2.default;
var vpScroller = exports.vpScroller = _scroller2.default;
var vpDataTable = exports.vpDataTable = _dataTable2.default;
var vpConfirm = exports.vpConfirm = _confirm2.default;
var vpShowcase = exports.vpShowcase = _showcase2.default;
var vpTree = exports.vpTree = _tree2.default;
var vpCategory = exports.vpCategory = _category2.default;
var vpPaging = exports.vpPaging = _paging2.default;
var vpMultipleChoose = exports.vpMultipleChoose = _multipleChoose2.default;
var vpFalls = exports.vpFalls = _falls2.default;
var vpDate = exports.vpDate = _date2.default;
var vpImage = exports.vpImage = _image2.default;
var vpCheckbox = exports.vpCheckbox = _checkbox2.default;

var components = {
  vpButton: vpButton,
  vpMemo: vpMemo,
  vpFile: vpFile,
  vpInput: vpInput,
  vpImage: vpImage,
  vpSelect: vpSelect,
  vpLoading: vpLoading,
  vpRadio: vpRadio,
  vpToast: vpToast,
  vpPaging: vpPaging,
  vpScroller: vpScroller,
  vpDataTable: vpDataTable,
  vpDate: vpDate,
  vpConfirm: vpConfirm,
  vpShowcase: vpShowcase,
  vpCategory: vpCategory,
  vpCheckbox: vpCheckbox,
  vpMultipleChoose: vpMultipleChoose,
  vpTree: vpTree,
  vpFalls: vpFalls,
  vpLogin: vpLogin
};

var register = exports.register = function register(Vue) {
  (0, _entries2.default)(components).map(function (kv) {
    var _kv = (0, _slicedToArray3.default)(kv, 2),
        name = _kv[0],
        component = _kv[1];

    Vue.component(name, component);
    return kv;
  });
};

var focusRegisterEvent = {};

function listenInputFocus() {
  return function ifInputFocus() {
    window.scrollTo(0, this.offsetHeight);
  };
}

var focusEffectScroll = exports.focusEffectScroll = function focusEffectScroll() {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    if (input.type === 'file') continue;
    input.removeEventListener('focus', focusRegisterEvent[i], false);
    focusRegisterEvent[i] = listenInputFocus().bind(input);
    input.addEventListener('focus', focusRegisterEvent[i], false);
  }
};

exports.default = {
  components: components,
  focusEffectScroll: focusEffectScroll,
  register: register
};