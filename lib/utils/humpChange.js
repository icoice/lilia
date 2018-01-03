'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (word, separator) {
  var newWord = [];3;
  for (var i = 0; i < word.length; i += 1) {
    var letter = word[i];
    newWord.push(/[A-Z]/g.test(letter) ? '' + separator + letter.toLowerCase() : letter);
  }
  return newWord.join('');
};