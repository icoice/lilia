'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.vmCondition = exports.vmSelect = exports.vmInput = exports.vmLouver = exports.vmTable = exports.vmButton = exports.vpImage = exports.vpMultipleChoose = exports.vpPaging = exports.vpCategory = exports.vpTree = exports.vpShowcase = exports.vpConfirm = exports.vpScroller = exports.vpMemo = exports.vpToast = exports.vpRadio = exports.vpLoading = exports.vpFile = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _button = require('./parts/common/button');

var _button2 = _interopRequireDefault(_button);

var _file = require('./parts/common/file');

var _file2 = _interopRequireDefault(_file);

var _loading = require('./parts/common/loading');

var _loading2 = _interopRequireDefault(_loading);

var _radio = require('./parts/common/radio');

var _radio2 = _interopRequireDefault(_radio);

var _toast = require('./parts/common/toast');

var _toast2 = _interopRequireDefault(_toast);

var _memo = require('./parts/common/memo');

var _memo2 = _interopRequireDefault(_memo);

var _scroller = require('./parts/common/scroller');

var _scroller2 = _interopRequireDefault(_scroller);

var _image = require('./parts/common/image');

var _image2 = _interopRequireDefault(_image);

var _select = require('./parts/common/select');

var _select2 = _interopRequireDefault(_select);

var _input = require('./parts/common/input');

var _input2 = _interopRequireDefault(_input);

var _table = require('./parts/instance/table');

var _table2 = _interopRequireDefault(_table);

var _confirm = require('./parts/instance/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _condition = require('./parts/instance/condition');

var _condition2 = _interopRequireDefault(_condition);

var _showcase = require('./parts/instance/showcase');

var _showcase2 = _interopRequireDefault(_showcase);

var _tree = require('./parts/instance/tree');

var _tree2 = _interopRequireDefault(_tree);

var _category = require('./parts/instance/category');

var _category2 = _interopRequireDefault(_category);

var _paging = require('./parts/instance/paging');

var _paging2 = _interopRequireDefault(_paging);

var _multipleChoose = require('./parts/instance/multipleChoose');

var _multipleChoose2 = _interopRequireDefault(_multipleChoose);

var _louver = require('./parts/instance/louver');

var _louver2 = _interopRequireDefault(_louver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vpFile = exports.vpFile = _file2.default;
// 特例组件
// 基础组件
var vpLoading = exports.vpLoading = _loading2.default;
var vpRadio = exports.vpRadio = _radio2.default;
var vpToast = exports.vpToast = _toast2.default;
var vpMemo = exports.vpMemo = _memo2.default;
var vpScroller = exports.vpScroller = _scroller2.default;
var vpConfirm = exports.vpConfirm = _confirm2.default;
var vpShowcase = exports.vpShowcase = _showcase2.default;
var vpTree = exports.vpTree = _tree2.default;
var vpCategory = exports.vpCategory = _category2.default;
var vpPaging = exports.vpPaging = _paging2.default;
var vpMultipleChoose = exports.vpMultipleChoose = _multipleChoose2.default;
var vpImage = exports.vpImage = _image2.default;
var vmButton = exports.vmButton = _button2.default;
var vmTable = exports.vmTable = _table2.default;
var vmLouver = exports.vmLouver = _louver2.default;
var vmInput = exports.vmInput = _input2.default;
var vmSelect = exports.vmSelect = _select2.default;
var vmCondition = exports.vmCondition = _condition2.default;

var components = {
  vmInput: vmInput,
  vmSelect: vmSelect,
  vmLouver: vmLouver,
  vmTable: vmTable,
  vmCondition: vmCondition,
  vmButton: vmButton,
  vpMemo: vpMemo,
  vpFile: vpFile,
  vpImage: vpImage,
  vpLoading: vpLoading,
  vpRadio: vpRadio,
  vpToast: vpToast,
  vpPaging: vpPaging,
  vpScroller: vpScroller,
  vpConfirm: vpConfirm,
  vpShowcase: vpShowcase,
  vpCategory: vpCategory,
  vpMultipleChoose: vpMultipleChoose,
  vpTree: vpTree
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

exports.default = {
  components: components,
  register: register
};