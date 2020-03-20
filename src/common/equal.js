const contain = (arr, v) => {
  return arr.indexOf(v) >= 0;
};

export default (t, v) => {
  if (v instanceof Array) {
    return contain(v, t);
  }

  return t === v;
};
