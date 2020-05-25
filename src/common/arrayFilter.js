export default (list, callback = () => {}) => {
  const nextList = [];

  list.map((item) => {
    if (callback(item)) {
      nextList.push(item);
    }

    return item;
  });

  return nextList;
};