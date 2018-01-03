// 驼峰规则转换
export default function(word, separator) {
  const newWord = [];3
  for (let i = 0; i < word.length; i += 1) {
    const letter = word[i];
    newWord.push(/[A-Z]/g.test(letter) ? `${separator}${letter.toLowerCase()}` : letter);
  }
  return newWord.join('');
}
