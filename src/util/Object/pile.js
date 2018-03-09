export default (cols, obj) => {
  const list = [];
  const lines = [];
  let lineItems = [];

  Object.entries(obj).map(kv => {
    list.push({
      [kv[0]]: kv[1],
    });
    return kv;
  });

  if (list && list.map) {
    list.map((item, code) => {
      const n = code + 1;
      lineItems.push(item);
      if (n % cols === 0 || n === list.length) {
        lines.push(lineItems);
        lineItems = [];
      }
      return item;
    });
  }

  return lines;
}
