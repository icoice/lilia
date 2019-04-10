export default (word) => {
  if (typeof word !== 'string') {
    return word;
  }

  const firstLetter = word.charAt(0);
  return `${firstLetter.toUpperCase()}${word.substr(1, word.length)}`;
}
