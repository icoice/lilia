const space = {};

export default (name, target) => {
  if (typeof target !== 'undefined') {
    space[name] = target;
  } else {
    return space[name];
  }
};
