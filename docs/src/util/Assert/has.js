export default (types = [], obj) => {
  const t = typeof types === 'string' ? types.split(',') : types;
  const n = [];
  for(let i = 0; i < t.length; i++) {
    if (typeof obj !== t[i].trim()) n.push(t[i]);
  }
  return n.length < types.length;
}
