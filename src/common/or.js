export default (express = []) => {
  for (let i = 0; i < express.length; i += 1) {
    if (express[i]) {
      return true;
    }
  }

  return false;
};
