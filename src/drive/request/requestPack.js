const names = [
  'DELETE',
  'GET',
  'HEADER',
  'POST',
  'PUT',
  'UPDATE',
];
const creator = {};
const api = (method, name) => {
  const access = {};

  access.config = {
    alias: {},
    fake: null,
    method,
    name,
    origin: {},
    path: '',
  };

  // def用于设置payload的默认值， 如果keys为对象时，alias为作为def参数使用
  access.payload = function (keys = [], alias = [], def = {}) {
    const { config } = this;
    
    if (typeof keys === 'object' && !(keys instanceof Array) && keys !== null) {
      const aliasChangeToDef = typeof alias !== 'object' ? {} : alias;

      Object.keys(keys).map((k) => {
        const aliasName = keys[k];

        config.origin[k] = !aliasChangeToDef[k] ? '' : aliasChangeToDef[k];
        config.alias[k] = aliasName;

        return k;
      });

      return this;
    }

    keys.map((k, code) => {
      if (typeof k === 'object' && k !== null && k.name) {
        config.origin[k.name] = !k.defaultValue ? '' : k.defaultValue;

        if (k.aliasName) config.alias[k.name] = k.aliasName;

        return code;
      }

      config.origin[k] = !def[k] ? '' : def[k];

      if (alias[code]) {
        config.alias[k] = alias[code];
      }

      return code;
    });

    return this;
  };

  access.path = function (link) {
    const { config } = this;

    config.path = link;

    return this;
  };

  access.fake = function (data) {
    const  { config } = this;

    config.fake = !data || !data[config.name] ? data : data[config.name];

    return this;
  };

  return access;
};

names.map((method) => {
  creator[method] = function (name) {
    const { config } = this;
    const apiMethod = api(method, name);

    config.access[name] = apiMethod.config;

    return apiMethod;
  }
});

const pack = {
  ...creator,
};

pack.ORERR = () => {};
pack.OREXCEP = () => {};
pack.OR = () => {};
pack.config = {
  access: {}, // api、payload的预定义
  domain: '', // 服务地址
  sendBefore: () => ({}), // 请求前
  sender: null, // 替换请求对象
  setHeaders: headers => headers, // 重置headers
  setPayload: payload => payload, // 重置payload
  fake: {
    delay: 300, // 获得数据延迟
    open: false, // 是否开启伪数据
    pack: data => data, // 包装伪数据
  },
};

pack.bindPublicEvent = function (serves) {
  serves.map((serve) => {
    serve.ON_REQUEST_ERROR(this.ORERR);
    serve.ON_REQUEST_EXCEPTION(this.ORERR);
    serve.ON_REQUEST(this.OR);
  });
};

pack.onRequestError = function (callback) {
  this.ORERR = callback;
};

pack.onRequestException = function (callback) {
  this.OREXCEP = callback;
};

pack.onRequest = function (callback) {
  this.OR = callback;
};

pack.domain = function (host) {
  const { config } = this;

  config.domain = host;
};

pack.before = function (callback) {
  const { config } = this;

  config.sendBefore = callback;
};

pack.payload = function (callback) {
  const { config } = this;

  config.setPayload = callback;
};

pack.header = function (callback) {
  const { config } = this;

  config.setHeaders = callback;
};

pack.sender = function (callback) {
  const { config } = this;
  config.sender = callback;
};

pack.sender = function (callback) {
  const { config } = this;

  config.sender = callback;
};

pack.fake = function (is) {
  const fakeOpt = {};
  const { fake } = this.config;

  fake.open = is;

  fakeOpt.delay = function (msec) {
    fake.delay = msec;
    return this;
  };

  fakeOpt.pack = function (callback) {
    fake.pack = callback;
    return this;
  };

  return fakeOpt;
};

export default pack;
