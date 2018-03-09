import createApi from './createApi';

const httpMethods = ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'HEADER'];
const httpMethodCreator = {};

httpMethods.map((method) => {
  httpMethodCreator[method] = function(name) {
    const api = createApi(method, name);
    this.config.access[name] = api.config;
    return api;
  }
});

export default {
  config: {
    domain: '', // 服务地址
    access: {}, // api、payload的预定义
    fake: {
      open: false, // 是否开启伪数据
      delay: 300, // 获得数据延迟
      pack: data => data, // 包装伪数据
    },
    sendBefore: () => ({}), // 请求前
    setPayload: payload => payload, // 重置payload
    setHeaders: headers => headers, // 重置headers
    sender: payload => payload, // 替换请求对象
  },
  ORERR: () => {},
  OREXCEP: () => {},
  OR: () => {},
  onRequestError(callback) {
    this.ORERR = callback;
  },
  onRequestException(callback) {
    this.OREXCEP = callback;
  },
  onRequest(callback) {
    this.OR = callback;
  },
  bindPublicEvent(serves) {
    serves.map((serve) => {
      serve.ON_REQUEST_ERROR(this.ORERR);
      serve.ON_REQUEST_EXCEPTION(this.ORERR);
      serve.ON_REQUEST(this.OR);
    });
  },
  domain(host) {
    this.config.domain = host;
  },
  before(callback) {
    this.config.sendBefore = callback;
  },
  payload(callback) {
    this.config.setPayload = callback;
  },
  header(callback) {
    this.config.setHeaders = callback;
  },
  fake(has) {
    const { config } = this;
    config.fake.open = has;
    return {
      delay(msec) {
        config.fake.delay = msec;
        return this;
      },
      pack(callback) {
        config.fake.pack = callback;
        return this;
      },
    };
  },
  sender(callback) {
    this.config.setHeaders = callback;
  },
  ...httpMethodCreator,
}
