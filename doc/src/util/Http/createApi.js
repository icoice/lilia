export default (method, name) => {
  const conf = {
    name,
    method,
    path: '',
    method: 'GET',
    origin: {},
    alias: {},
    fake: null,
  };

  return {
    config: conf,
    path(link) {
      conf.path = link;
      return this;
    },
    payload(keys = [], alias = [], def = '') {
      keys.map((k, code) => {
        conf.origin[k] = def;
        if (alias[code]) conf.alias[k] = alias[code];
      });
      return this;
    },
  }
};
