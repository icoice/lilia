export default (cols, list) => {
  const lines = [];
  let lineItems = [];

  list.map((item, code) => {
    const n = code + 1;

    lineItems.push(item);

    if (n % cols === 0 || n === list.length) {
      lines.push(lineItems);
      lineItems = [];
    }

    return item;
  });

  return lines;
}
