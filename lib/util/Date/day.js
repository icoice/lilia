'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (start) {
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

  var t = void 0,
      e = void 0;

  if (typeof start === 'string') {
    t = new Date(start);
  } else if (start instanceof Date) {
    t = start;
  } else {
    return null;
  }

  if (typeof end === 'string') {
    e = new Date(end);
  } else if (end instanceof Date) {
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