export default (word, symbol) => {
  const newWord = [];

  for (let i = 0; i < word.length; i += 1) {
    const letter = word.charAt(i);

    if (/[A-Z]/.test(letter)) {
      newWord.push(symbol);
      newWord.push(letter.toLowerCase());
    } else {
      newWord.push(letter);
    }
  }

  return newWord.join('');
};
