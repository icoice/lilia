import axios from 'axios';
import util from '../../util';

const {
  def,
  hasEmpty,
  hasFormData,
  hasObj,
  hasArr,
  hasPromise,
} = util.Assert;

export default class Http {

  constructor(set = {}) {
    return this.init(set);
  }

  // 配置Http实例
  init(set) {
    this.access = def(set.access, []);
    this.domain = def(set.domain, '');
    this.fakeDelay = def(set.fakeDelay, 1000);
    this.hasFake = def(set.hasFake, true);
    this.setHeaders = def(set.setHeaders, params => params);
    this.setPayload = def(set.setPayload, params => params);
    this.sender = def(set.sender, null);
    this.METHOD = '_HRM';
    this.QUERY = '_HRQ';
    this.BODY = '_HRB';

    return this.register();
  }

  // 自动文本协议
  autoContentType(data) {
    if (hasFormData(data)) return 'multipart/form-data';
    if (hasArr(data)) return 'application/json';
    if (hasObj(data) && !hasEmpty(data)) return 'application/json';

    return 'text/plain';
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

  // 创建axios的payload
  createPayload(path, method, query, body, data) {
    const headers = { 'Content-Type': this.autoContentType(data) };
    let restfulPath;
    let sendParams;
    let sendBody;

    if (data instanceof FormData) {
      sendParams = data;
      sendBody = data;
    } else {
      sendParams = Object.assign({}, query, method === 'POST' ? {} : data);
      sendBody = Object.assign({}, body, method !== 'POST' ? {} : data);

      if (sendParams) {
        Object.entries(sendParams).map((kv) => {
          const [k, v] = kv;
          const keyRule = new RegExp(`\\:${k}`, 'g');
          restfulPath = path.replace(keyRule, v);
          return kv;
        });
      }

      if (sendBody) {
        Object.entries(sendBody).map((kv) => {
          const [k, v] = kv;
          const keyRule = new RegExp(`/\:${k}/g`);
          restfulPath = path.replace(keyRule, v);
          return kv;
        });
      }
    }

    return this.setPayload({
      url: `${this.domain}${restfulPath || path}`,
      method,
      headers: this.setHeaders(headers),
      params: sendParams,
      data: sendBody,
    });
  }

  // 请求
  request(item) {
    const { sender, fakeDelay, hasFake } = this;
    const { METHOD, QUERY, BODY } = this;
    const { name, method, path, fake } = item;
    const req = (pl) => {
      if (fake !== null && hasFake) {
        return new Promise(resolve => {
          setTimeout(() => resolve(fake), fakeDelay);
        });
      }
      return !sender ? axios(pl) : sender(pl);
    }

    return (params = {}) => {
      const rm = params[METHOD] || method;
      const rq = params[QUERY] || {};
      const rb = params[BODY] || {};

      delete params[METHOD];
      delete params[QUERY];
      delete params[BODY];

      const payload = this.createPayload(path, rm, rq, rb, params);

      if (payload && hasPromise(payload)) {
        return payload.then(set => req(set)); // 如果payload返回的是一个promise
      }

      return req(payload);
    };
  }
}
