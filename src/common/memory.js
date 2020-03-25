const { lilia_memory_space } = window;

if (!lilia_memory_space) {
  window.lilia_memory_space = {};
}

export default (name, target) => {
  const { lilia_memory_space } = window;

  if (typeof target !== 'undefined') {
    lilia_memory_space[name] = target;
  } else {
    return lilia_memory_space[name];
  }
};
