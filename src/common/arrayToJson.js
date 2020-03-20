export default (k, arr) => {
  const map = {};

  arr.map((v) => {
    map[typeof v[k] === 'undefined' ? v : v[k]] = v;
  });

  return map;
};
