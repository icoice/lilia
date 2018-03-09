export default (method, name) => {
  const conf = {
    name,
    method,
    path: '',
    origin: {},
    alias: {},
    fake: null,
  };

  return {
    config: conf,
    fake(data) {
      conf.fake = !data[conf.name] ? data : data[conf.name];
      return this;
    },
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
