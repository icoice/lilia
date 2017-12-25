'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = firstUppercase;
// 首字母大写
function firstUppercase(word) {
  if (typeof word !== 'string') return word;
  var firstLetter = word.charAt(0);
  return '' + firstLetter.toUpperCase() + word.substr(1, word.length);
}