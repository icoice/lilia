module.exports = () => {
  const { userAgent } = navigator;

  return userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i);
};
