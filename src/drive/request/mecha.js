import { JUDGE, empty, eq, loop, or } from '../../common';

let countId = 0;

function apiPack(api, adapter, records, beforeProcess) {
  const createAdapter = (callName, call) => ((py = {}) => {
    countId += 1;
    adapter.NOW_REQUEST_ID = countId;

    const id = countId;
    let payload = py;

    this.sendId = id;
    records[callName] = empty(records[callName]) ? {} : records[callName];
    records[callName][id] = { REJECT_RESPONSE: false };

    if (JUDGE.NO_FOD(py)) {
      payload = this.buildRequestPayload(callName, py);

      if (JUDGE.IS_FUN(beforeProcess)) {
        payload = {
          ...beforeProcess(payload, {
            id,
            name: callName,
          }),
        };
      }
    }

    return call(payload).then((response) => {
      const { description, data } = response;
      const REQ_META = {
        id,
        name: callName,
        ...records[callName][id],
      };

      if (!data) {
        return this.log('exception', '未获得服务器的响应数据', REQ_META);
      }

      if (JUDGE.IS_OBJ(data) && !empty(data)) {
        data.REQ_META = REQ_META;
      }

      this.log('complete', `${description || ''}`, {
        domain: api.domain,
        methodName: callName,
        payload: { ...payload },
        response,
        data,
      });

      // 拒绝响应的措施, 解决有些环境无法abort的问题。
      delete records[callName][id];

      return response;
    }).catch((e) => {
      delete records[callName][id];

      this.requsetException(e);

      return e;
    });
  });

  loop(api, (call, callName) => {
    adapter[callName] = call;

    if (JUDGE.NO_FUN(call)) return;

    adapter[callName] = createAdapter(callName, call);
  });
}

export default class Mecha {

  constructor(adapter) {
    this.ERROR_MESSAGE = {
      1000: '未定义该API接口',
      1004: '未指定一组接口定义',
    };

    // http协议请求状态
    this.READY_STATE_MESSAGE = [
     '已发送',
     '未发送',
     '等待响应',
     '请求完成'
    ];

    this.setting = {
      alias: null, // API payload的别名定义
      api: null, // API映射存放
      origin: null, // API payload的源定义
    };

    this.logger = [];
    this.requestBeforeProcess = payload => payload; // 请求前处理
    this.requestErrorHandle = () => {}; // 请求时发生错误的后续处理
    this.requestExceptionHandle = () => {}; // 请求时发生异常的后续处理
    this.requestHandle = () => {}; // 请求完成的后续处理
    this.sendId = 0; // 发送id
    this.sendRecords = {}; // 当前接口发送记录

    this.defineRequest(adapter); // 定义请求内容
  }

  init() {
    const {
     ERROR_MESSAGE,
     requestBeforeProcess,
     sendRecords,
     setting,
    } = this;
    const { api } = setting;
    const adapter = {};

    if (empty(api)) {
      return this.log('error', ERROR_MESSAGE[1004]);
    }

    // 夹层的异常处理
    adapter.ON_REQUEST_ERROR = (callback) => {
      this.requestErrorHandle = callback;
    };

    adapter.ON_REQUEST_EXCEPTION = (callback) => {
      this.requestExceptionHandle = callback;
    };

    adapter.ON_REQUEST = (callback) => {
      this.requestHandle = callback;
    };

    // 拒绝响应
    adapter.rejectResponse = (name, id = null) => {
      const { sendRecords } = this;
      const ids = sendRecords[name];

      if (!ids) return;

      if(ids[id]) {
        ids[id].REJECT_RESPONSE = true;

        return;
      }

      loop(ids, (config) => {
        config.REJECT_RESPONSE = true;
      });
    }

    apiPack.apply(this, [
      api,
      adapter,
      sendRecords,
      requestBeforeProcess,
    ]);

    return adapter;
  }

  log(type, description, data = null, name = '') {
    const record = {
      description,
      id: this.sendId,
      name,
      origin: data,
      time: Date.now(),
      type,
    };

    this.logger.push(record);

    switch (type) {
      case 'error':
        this.requestErrorHandle(record);
        throw description;
      case 'exception':
        this.requestExceptionHandle(record);
        throw description;
      default:
        this.requestHandle(record);
    }
  }

  requsetException(e) {
    const { request } = e;
    const message = JUDGE.IS_STR(e) ? e : e.message;
    const { READY_STATE_MESSAGE } = this;
    const defaultMessage = !message ? '程序存在异常，无法完成请求' : message;
    const description = !request ? '' : READY_STATE_MESSAGE[request.readyState - 1];
    const statusText = !request || !request.statusText || !eq(request.statusText, '') ? defaultMessage : request.statusText;
    const infos = { description, statusText, status: !request || !request.status ? '' : request.status };
    const status = JUDGE.NO_STR(infos.status) || empty(infos.status) ? '' : `[${infos.status}]`;
    const statusTxt = !eq(infos.description, '') && JUDGE.IS_STR(infos.description) ? `[${infos.description}]` : infos.description;

    this.log('exception', `${status} ${statusTxt} ${infos.statusText}`);

    return infos;
  }

  recoverPayload(type, origin = {}, alias = {}, data = {}) {
    const payload = {};

    loop(origin, (val, key) => {
      const aliasKey = empty(alias[key]) ? key : alias[key];
      const k = ({
        alias: aliasKey,
        origin: key,
      })[type];

      payload[k] = aliasKey in data ? data[aliasKey] : val;
    });

    return payload;
  }

  definePayload(key, origin, alias) {
    const { setting } = this;

    setting.origin = empty(setting.origin) ? {} : setting.origin;
    setting.alias = empty(setting.alias) ? {} : setting.alias;
    setting.origin[key] = origin;
    setting.alias[key] = alias;
  }

  buildRequestPayload(key, params) {
    const { setting } = this;
    const { origin, alias } = setting;

    return this.recoverPayload('origin', origin[key], alias[key], params);
  }

  defineRequest(request = null) {
    this.setting.api = request;
  }

  defineRequestBefore(callback) {
    this.requestBeforeProcess = callback;
  }
}
