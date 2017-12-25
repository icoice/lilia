'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animate;
// animate.css的控制
function animate(name, target, type) {
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