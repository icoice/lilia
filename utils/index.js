'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasEmpty = exports.firstLetterUppercase = exports.objectValueString = exports.clock = exports.storage = exports.animate = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// animate.css的控制
var animate = exports.animate = function animate(name, target, type) {
  clearTimeout(animate.sid);

  var dom = target;
  var domClass = dom.className.split(' ');

  if (domClass.indexOf('animated') < 0) domClass.push('animated');
  if (type === 'quickly' && domClass.indexOf('animated-quickly') < 0) domClass.push('animated-quickly');

  if (domClass.indexOf(name) < 0) {
    domClass.push(name);
    dom.className = domClass.join(' ');
  } else {
    var newClass = [];
    domClass.map(function (cn) {
      if (cn !== name) newClass.push(cn);
      return cn;
    });
    dom.className = newClass.join(' ');
    animate.sid = setTimeout(function () {
      return animate(name, target);
    }, 10);
  }
};

var storage = exports.storage = {
  set: function set(name, value) {
    localStorage.setItem(name, (0, _stringify2.default)(value));
  },
  get: function get(name) {
    var data = localStorage.getItem(name);
    return data !== null ? JSON.parse(data) : data;
  }
};

// 时间
var clock = exports.clock = function clock(express) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var setter = (typeof date === 'undefined' ? 'undefined' : (0, _typeof3.default)(date)) === 'object' && date !== null ? date.year + '/' + date.month + '/' + date.day : date;
  var timer = typeof setter === 'number' || typeof setter === 'string' ? new Date(setter) : new Date();
  var YYYY = timer.getFullYear();
  var M = timer.getMonth() + 1;
  var D = timer.getDate();
  var dateExporess = express;
  dateExporess = dateExporess.replace(/YYYY/g, YYYY);
  dateExporess = dateExporess.replace(/YY/g, YYYY.toString().substr(2, 4));
  dateExporess = dateExporess.replace(/MM/g, M < 10 ? '0' + M : M);
  dateExporess = dateExporess.replace(/M/g, M);
  dateExporess = dateExporess.replace(/DD/g, D < 10 ? '0' + D : D);
  dateExporess = dateExporess.replace(/D/g, D < 10 ? '0' + D : D);
  return dateExporess;
};

// 单层对象属性值的字符转换
var objectValueString = exports.objectValueString = function charsetChange(obj) {
  var target = obj;
  if ((typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) !== 'object') return obj;
  (0, _entries2.default)(target).map(function (kv) {
    var _kv = (0, _slicedToArray3.default)(kv, 2),
        k = _kv[0],
        v = _kv[1];

    target[k] = typeof v === 'number' ? v.toString() : v;
    return kv;
  });
  return target;
};

var firstLetterUppercase = exports.firstLetterUppercase = function firstLetterUppercase(word) {
  if (typeof word !== 'string') return word;
  var firstLetter = word.charAt(0);
  return '' + firstLetter.toUpperCase() + word.substr(1, word.length);
};

var hasEmpty = exports.hasEmpty = function hasEmpty(word) {
  return word === '' || word === null || word === 'null' || typeof word === 'undefined';
};

exports.default = {
  animate: animate,
  storage: storage,
  clock: clock,
  objectValueString: objectValueString,
  firstLetterUppercase: firstLetterUppercase,
  hasEmpty: hasEmpty
};