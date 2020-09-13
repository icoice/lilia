import axios from 'axios';
import {
  JUDGE,
  assign,
  def,
  empty,
  eq,
  loop,
  decideType,
} from '../../common';

export default class Request {

  constructor(set = {}) {
    return this.init(set);
  }

  // 配置Http实例
  init(set) {
    this.BODY = '_HRB';
    this.METHOD = '_HRM';
    this.QUERY = '_HRQ';
    this.access = def(set.access, []);
    this.domain = def(set.domain, '');
    this.fakePack = def(set.fakePack, params => params);
    this.fakeDelay = def(set.fakeDelay, 1000);
    this.hasFake = def(set.hasFake, true);
    this.sender = def(set.sender, null);
    this.setHeaders = def(set.setHeaders, params => params);
    this.setPayload = def(set.setPayload, params => params);

    return this.register();
  }

  autoContentType(data) {
    if (JUDGE.IS_FOD(data)) return 'multipart/form-data';
    if (JUDGE.IS_ARR(data)) return 'application/json';
    if (JUDGE.IS_OBJ(data) && !empty(data)) return 'application/json';

    return 'text/plain';
  }

  register() {
    const { access } = this;
    const list = {};

    access.map((item) => {
      const call = this.request(item);

      list[item.name] = call;

      return item;
    });

    return list;
  }

  rebuild(path, method, query, body, data) {
    const { domain } = this;
    const headers = { 'Content-Type': this.autoContentType(data) };
    let restfulPath = path;
    let sendBody;
    let sendParams;

    decideType([
      () => ({
        IS_FOD: data,
      }),
    ], {
      clear() {
        sendParams = data;
        sendBody = data;
      },
      exception() {
        sendParams = { ...query, ...data };
        sendBody = { ...body, ...data };

        if (!eq(method, 'GET')) {
          sendParams = {};
        }

        if (!eq(method, 'POST')) {
          sendBody = {};
        }

        loop(sendParams, (v, k) => {
          restfulPath = restfulPath.replace(new RegExp(`\\:${k}`, 'g'), v);
        });

        loop(sendBody, (v, k) => {
          restfulPath = restfulPath.replace(new RegExp(`\\:${k}`, 'g'), v);
        });
      },
    });

    return this.setPayload({
      data: sendBody,
      headers: this.setHeaders(headers),
      method,
      params: sendParams,
      url: `${domain}${restfulPath || '{UNKNOWN_PATH}'}`,
    });
  }

  // 请求
  request(item) {
    const { sender, fakeDelay, hasFake, fakePack } = this;
    const { METHOD, QUERY, BODY } = this;
    const { name, method, path, fake } = item;
    const req = (pl) => {
      if (!eq(fake, null) && hasFake) { 
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(fakePack(fake, {
              name,

              ...item,
            }));
          }, fakeDelay);
        });
      }

      if (!sender) {
        return axios(pl);
      }

      return sender(pl);
    }

    return (params = {}) => {
      const rb = params[BODY] || {};
      const rm = params[METHOD] || method;
      const rq = params[QUERY] || {};

      delete params[BODY];
      delete params[METHOD];
      delete params[QUERY];

      const payload = this.rebuild(path, rm, rq, rb, params);

      if (payload && JUDGE.IS_PRO(payload)) {
        return payload.then(set => req(set)); // 如果payload返回的是一个promise
      }

      return req(payload);
    };
  }
}
