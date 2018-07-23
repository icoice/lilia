export default (name, val) => {
  if (typeof name === 'string') {

    if (typeof val === 'undefined') {
      return window[name];
    }

    if (typeof window[name] !== 'undefined') {
      throw `${name} has been defined.`;
    }

    window[name] = val;

    return window[name];
  }
}
