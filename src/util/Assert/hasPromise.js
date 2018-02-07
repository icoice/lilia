export default (obj) => {
  return obj instanceof Promise ||
  (typeof obj.then === 'function' && typeof obj.catch === 'function');
}
