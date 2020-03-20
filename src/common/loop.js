export default (v, callback = () => {}) => {
  return Object.entries(v).map(([k, v]) => {
    return callback(v, k);
  });
};
