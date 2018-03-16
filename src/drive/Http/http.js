import axios from 'axios';
import util from '../../util';

const { def, hasPromise } = util.Assert;

export default class Http {

  constructor(set = {}) {
    return this.init(set);
  }

  // 配置Http实例
  init(set) {
    this.access = def(set.access, []);
    this.domain = def(set.domain, '');
    this.fakeDelay = def(set.fakeDelay, 1000);
    this.setHeaders = def(set.setHeaders, params => params);
    this.setPayload = def(set.setPayload, params => params);
    this.sender = def(set.sender, null);
    this.METHOD = '_HRM';
    this.QUERY = '_HRQ';
    this.BODY = '_HRB';
    return this.register();
  }

  // 注册Remote实例方法
  register() {
    const { access } = this;
    const list = {};
    access.map((item) => {
      list[item.name] = this.request(item);
      return item;
    });
    return list;
  }

  // 自动文本协议
  autoContentType(data) {
    if (data instanceof FormData) return 'multipart/form-data';
    if (typeof data === 'object' && data !== null) return 'application/json';
    return 'text/plain';
  }

  // 创建axios的payload
  createPayload(path, method, query, body, data) {
    const headers = {
      'Content-Type': this.autoContentType(data),
    };
    return this.setPayload({
      url: `${this.domain}${path}`,
      method,
      headers: this.setHeaders(headers),
      params: Object.assign({}, query, method === 'POST' ? {} : data),
      data: Object.assign({}, body, method !== 'POST' ? {} : data),
    });
  }

  // 请求
  request(item) {

    const {
     sender,
     fakeDelay,
     METHOD,
     QUERY,
     BODY
    } = this;

    const {
     name,
     method,
     path,
     fake
    } = item;

    return (params = {}) => {
      const reqMethod = params[METHOD] || method;
      delete params[METHOD];
      const reqQuery = params[QUERY] || {};
      delete params[QUERY];
      const reqBody = params[BODY] || {};
      delete params[BODY];
      const payload = this.createPayload(
       path,
       reqMethod,
       reqQuery,
       reqBody,
       params);

      const req = (pl) => {
       if (fake !== null) {
        return new Promise(resolve => {
          setTimeout(() => resolve(fake), fakeDelay);
        });
       }
       return !sender ?  axios(pl) : sender(pl);
     }

     // 假设payload返回的是一个promise
     if (payload && hasPromise(payload)) {
       return payload.then(set => req(set));
     } else {
       return req(payload);
     }
    };
  }
}
