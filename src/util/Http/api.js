export default (method, name) => ({
  config: {
    alias: {},
    method,
    name,
    origin: {},
    path: '',
    fake: null,
  },
  payload(keys = [], alias = [], def = '') {
    const { config } = this;

    keys.map((k, code) => {
      config.origin[k] = def;
      if (alias[code]) config.alias[k] = alias[code];
    });

    return this;
  },
  path(link) {
    const { config } = this;

    config.path = link;

    return this;
  },
  fake(data) {
    const  { config } = this;

    config.fake = !data[config.name] ? data : data[config.name];

    return this;
  },
});
