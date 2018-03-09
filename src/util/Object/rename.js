export default (keys = {}, obj) => {
  const newItem = {};
  Object.entries(obj).map((kv) => {
    const [k, v] = kv;
    Object.entries(keys).map((ikv) => {
      const [ik, iv] = ikv;
      if (k === ik) newItem[iv] = v;
    });
    return kv;
  });
  return newItem;
};
