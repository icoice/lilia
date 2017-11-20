// 单层对象属性值的字符转换
export default function objectValueString(obj) {
  const target = obj;
  if (typeof target !== 'object') return obj;
  Object.entries(target).map((kv) => {
    const [k, v] = kv;
    target[k] = typeof v === 'number' ? v.toString() : v;
    return kv;
  });
  return target;
};
