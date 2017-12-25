'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  focusEffectScroll: focusEffectScroll
};