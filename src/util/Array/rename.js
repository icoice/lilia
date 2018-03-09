export default (keys = {}, data) => data.map((item) => {
  const newItem = {};
  Object.entries(item).map((kv) => {
    const [k, v] = kv;
    Object.entries(keys).map((ikv) => {
      const [ik, iv] = ikv;
      if (k === ik) newItem[iv] = v;
    });
    return kv;
  });
  return newItem;
});
