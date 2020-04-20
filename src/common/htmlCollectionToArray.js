export default (list) => {
  const arr = [];

  for (let i = 0; i < list.length; i += 1) {
    const node = list[i];

    arr.push(node);
  }

  return arr;
};
