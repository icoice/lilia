'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vpDate = exports.vpFalls = exports.vpMultipleChoose = exports.vpPaging = exports.vpCategory = exports.vpTree = exports.vpShowcase = exports.vpConfirm = exports.vpDataTable = undefined;

var _dataTable = require('./dataTable');

var _dataTable2 = _interopRequireDefault(_dataTable);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _showcase = require('./showcase');

var _showcase2 = _interopRequireDefault(_showcase);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

var _paging = require('./paging');

var _paging2 = _interopRequireDefault(_paging);

var _multipleChoose = require('./multipleChoose');

var _multipleChoose2 = _interopRequireDefault(_multipleChoose);

var _falls = require('./falls');

var _falls2 = _interopRequireDefault(_falls);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vpDataTable = exports.vpDataTable = _dataTable2.default;
var vpConfirm = exports.vpConfirm = _confirm2.default;
var vpShowcase = exports.vpShowcase = _showcase2.default;
var vpTree = exports.vpTree = _tree2.default;
var vpCategory = exports.vpCategory = _category2.default;
var vpPaging = exports.vpPaging = _paging2.default;
var vpMultipleChoose = exports.vpMultipleChoose = _multipleChoose2.default;
var vpFalls = exports.vpFalls = _falls2.default;
var vpDate = exports.vpDate = _date2.default;

exports.default = {
  vpPaging: vpPaging,
  vpDataTable: vpDataTable,
  vpDate: vpDate,
  vpConfirm: vpConfirm,
  vpShowcase: vpShowcase,
  vpCategory: vpCategory,
  vpMultipleChoose: vpMultipleChoose,
  vpTree: vpTree,
  vpFalls: vpFalls
};