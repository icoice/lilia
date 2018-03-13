'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Assert = require('../Assert');

var _Assert2 = _interopRequireDefault(_Assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (start) {
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

  var t = void 0,
      e = void 0;

  if (_Assert2.default.hasStr(start)) {
    t = new Date(start);
  } else if (_Assert2.default.hasDate(start)) {
    t = start;
  } else {
    return null;
  }

  if (_Assert2.default.hasStr(end)) {
    e = new Date(end);
  } else if (_Assert2.default.hasDate(end)) {
    e = end;
  } else {
    return null;
  }

  e = e.getTime();

  var s = t.getTime();
  var space = Math.abs(e - s);
  var sec = space / 1000;
  var min = sec / 60;
  var hour = min / 60;

  return Math.ceil(hour / 24);
};