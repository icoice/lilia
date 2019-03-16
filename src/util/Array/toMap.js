export default (map, select, format) => {
  const key = {};
  select.map((k) => {
    key[k] = !format ? map[k] : format(k, map[k]);
  });
  return key;
}
