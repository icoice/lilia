'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (word, separator) {
  var newWord = [];

  for (var i = 0; i < word.length; i += 1) {
    var letter = typeof word[i] === 'string' ? word[i] : '';
    newWord.push(/[A-Z]/g.test(letter) ? '' + separator + letter.toLowerCase() : letter);
  }

  return newWord.join('');
};