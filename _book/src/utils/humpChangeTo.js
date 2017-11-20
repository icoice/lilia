// 驼峰替换
export const humpChangeTo = function humpChangeTo(word, separator) {
  const newWord = [];
  for (let i = 0; i < word.length; i += 1) {
    const letter = word[i];
    newWord.push(/[A-Z]/g.test(letter) ? `${separator}${letter.toLowerCase()}` : letter);
  }
  return newWord.join('');
}
