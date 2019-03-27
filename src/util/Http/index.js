import api from './api';

const httpMethods = ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'HEADER'];
const httpMethodCreator = {};

httpMethods.map((method) => {
  httpMethodCreator[method] = function (name) {
    const { config } = this;
    const i = api(method, name);

    config.access[name] = i.config;

    return i;
  }
});

export default {
  ORERR: () => {},
  OREXCEP: () => {},
  OR: () => {},
  config: {
    access: {}, // api、payload的预定义
    domain: '', // 服务地址
    sendBefore: () => ({}), // 请求前
    setPayload: payload => payload, // 重置payload
    setHeaders: headers => headers, // 重置headers
    sender: null, // 替换请求对象
    fake: {
      delay: 300, // 获得数据延迟
      open: false, // 是否开启伪数据
      pack: data => data, // 包装伪数据
    },
  },
  bindPublicEvent(serves) {
    serves.map((serve) => {
      serve.ON_REQUEST_ERROR(this.ORERR);
      serve.ON_REQUEST_EXCEPTION(this.ORERR);
      serve.ON_REQUEST(this.OR);
    });
  },
  onRequestError(callback) {
    this.ORERR = callback;
  },
  onRequestException(callback) {
    this.OREXCEP = callback;
  },
  onRequest(callback) {
    const { config } = this;

    this.OR = callback;
  },
  domain(host) {
    const { config } = this;

    config.domain = host;
  },
  before(callback) {
    const { config } = this;

    config.sendBefore = callback;
  },
  payload(callback) {
    const { config } = this;

    config.setPayload = callback;
  },
  header(callback) {
    const { config } = this;

    config.setHeaders = callback;
  },
  sender(callback) {
    const { config } = this;

    config.sender = callback;
  },
  fake(has) {
    const { fake } = this.config;

    fake.open = has;

    return {
      delay(msec) {
        fake.delay = msec;

        return this;
      },
      pack(callback) {
        fake.pack = callback;

        return this;
      },
    };
  },
  ...httpMethodCreator,
}
