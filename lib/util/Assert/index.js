'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _def = require('./def');

var _def2 = _interopRequireDefault(_def);

var _has = require('./has');

var _has2 = _interopRequireDefault(_has);

var _hasArr = require('./hasArr');

var _hasArr2 = _interopRequireDefault(_hasArr);

var _hasDate = require('./hasDate');

var _hasDate2 = _interopRequireDefault(_hasDate);

var _hasEmpty = require('./hasEmpty');

var _hasEmpty2 = _interopRequireDefault(_hasEmpty);

var _hasFile = require('./hasFile');

var _hasFile2 = _interopRequireDefault(_hasFile);

var _hasFunc = require('./hasFunc');

var _hasFunc2 = _interopRequireDefault(_hasFunc);

var _hasNum = require('./hasNum');

var _hasNum2 = _interopRequireDefault(_hasNum);

var _hasObj = require('./hasObj');

var _hasObj2 = _interopRequireDefault(_hasObj);

var _hasPromise = require('./hasPromise');

var _hasPromise2 = _interopRequireDefault(_hasPromise);

var _hasStr = require('./hasStr');

var _hasStr2 = _interopRequireDefault(_hasStr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  def: _def2.default,
  has: _has2.default,
  hasArr: _hasArr2.default,
  hasDate: _hasDate2.default,
  hasEmpty: _hasEmpty2.default,
  hasFile: _hasFile2.default,
  hasFunc: _hasFunc2.default,
  hasNum: _hasNum2.default,
  hasObj: _hasObj2.default,
  hasPromise: _hasPromise2.default,
  hasStr: _hasStr2.default
};