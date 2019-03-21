export default (cols, list) => {
  const lines = [];
  let lineItems = [];

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
