export default (word, separator) => {
  const newWord = [];

  for (let i = 0; i < word.length; i += 1) {
    const letter = typeof word[i] === 'string' ? word[i] : '';
    newWord.push(/[A-Z]/g.test(letter) ? `${separator}${letter.toLowerCase()}` : letter);
  }

  return newWord.join('');
}
