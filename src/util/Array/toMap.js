export default (map, select, format) => {
  const key = {};
  select.map((k) => {
    key[k] = map[k];
  });
  return key;
}
