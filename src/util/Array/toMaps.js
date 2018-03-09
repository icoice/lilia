import Assert from '../Assert';

export default (map, select, format) => {
  const keys = [];
  select.map((k) => {
    keys.push(format(k, map[k]));
  });
  return keys;
}
