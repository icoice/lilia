export default class Mecha {

  constructor(adapter) {
    // 错误信息
    this.ERROR_MESSAGE = {
      1000: '未定义该API接口',
      1001: '未定义接口的别名payload',
      1002: '未定义接口服务的payload',
      1003: '未设定该组接口的payload',
      1004: '未指定一组接口定义',
    };
    // http协议请求状态
    this.READY_STATE_MESSAGE = [
     '未发送',
     '已发送',
     '等待响应',
     '请求完成'
    ];
    this.setting = {
      api: null, // API映射存放
      origin: null, // API payload的源定义
      alias: null, // API payload的别名定义
    };
    this.logger = [];
    this.sendRecords = {}; // 当前接口发送记录
    this.sendId = 0; // 发送id
    this.requestErrorHandle = () => {}; // 请求时发生错误的后续处理
    this.requestHandle = () => {}; // 请求完成的后续处理
    this.requestExceptionHandle = () => {}; // 请求时发生异常的后续处理
    this.requestBeforeProcess = payload => payload; // 请求前处理
    this.defineRequest(adapter); // 定义请求内容
  }

  // 初始化
  init() {
    const {
     ERROR_MESSAGE,
     setting,
     sendRecords,
     requestBeforeProcess,
    } = this;
    const { api } = setting;
    const adapter = {};

    if (!api) return this.log('error', ERROR_MESSAGE[1004]);

    // 夹层的异常处理
    adapter.ON_REQUEST_ERROR = (callback) => {
      this.requestErrorHandle = callback;
    };
    adapter.ON_REQUEST_EXCEPTION = (callback) => {
      this.requestErrorHandle = callback;
    };
    adapter.ON_REQUEST = (callback) => {
      this.requestErrorHandle = callback;
    };

    // 接口列
    const list = Object.entries(api);

    // 方法请求
    const request = (params) => {
     const { n, id, method, payload } = params;
     return method(payload).then((response) => {
       console.log(response);
       const { description, data } = response;
       if (!data) {
         this.log('exception', '未获得服务器的响应数据');
       } else {
         if (typeof data === 'object' && data !== null) data.HOW = Object.assign({ id }, sendRecords[n][id]);
         this.log('complete', `${description}`, data);
       }
       delete sendRecords[n][id]; // 拒绝响应的措施, 解决无法abort的问题。
       return response;
     }).catch(e => {
       delete sendRecords[n][id];
       this.requsetException(e);
     });
    }

    // 创建接口
    list.map((access) => {
      const [n, method] = access;
      adapter[n] = typeof method === 'function' ? (params = {}) => {
        this.sendId += 1;
        const id = this.sendId;
        let payload = params;
        sendRecords[n] = !sendRecords[n] ? {} : sendRecords[n];
        sendRecords[n][id] = { REJECT_RESPONSE: false };
        if (!(params instanceof FormData)) {
          payload = this.getRequestPayload(n, params);
          if (requestBeforeProcess) {
            payload = Object.assign({},
             requestBeforeProcess(payload, method));
          }
        }
        return request({ n, id, method, payload });
      } : method ;
      return access;
    });

    // 拒绝响应
    adapter.rejectResponse = (name, id = null) => {
      const { sendRecords } = this;
      const ids = sendRecords[name];

      if (!ids) return;

      if(ids[id]) {
        ids[id].REJECT_RESPONSE = true;
        return;
      }

      Object.entries(ids).map((kv) => {
        const [id, config] = kv;
        config.REJECT_RESPONSE = true;
        return kv;
      });
    }

    return adapter;
  }

  // 日志
  log(type, description, data = null) {
    const record = {
      type,
      description,
      origin: data,
      time: Date.now(),
    };
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
    this.logger.push(record);
  }

  // axios的异常请求处理
  requsetException(e) {
    const  message = typeof e === 'string' ? e : e.message;
    const { request } = e;
    const { READY_STATE_MESSAGE } = this;
    const defaultMessage = !message ? '程序存在异常，无法完成请求' : message;
    const infos = {
      description: !request ? '' : READY_STATE_MESSAGE[request.readyState - 1],
      statusText: !request ? defaultMessage : request.statusText,
      status: !request ? '' : request.status,
    };
    const logInfo = `${infos.description !== '' ? `${infos.description},` : infos.description}${infos.statusText}`;
    this.log('exception', logInfo);
    return infos;
  }

  // 别名数据同步，同步别名数据到源数据，源数据同步到别名数据
  recoverPayload(type, origin, alias, data = {}) {
    const payload = {};
    Object.entries(origin).map((item) => {
      const [key, val] = item;
      const aliasKey = !alias[key] ? key : alias[key];
      const typeKey = ({ origin: key, alias: aliasKey })[type];
      payload[typeKey] = aliasKey in data ? data[aliasKey] : val;
      return item;
    });
    return payload;
  }

   // 设置payload
  definePayload(key, origin, alias) {
    const { setting } = this;
    if (!setting.origin) setting.origin = {};
    if (!setting.alias) setting.alias = {};
    setting.origin[key] = origin;
    setting.alias[key] = alias;
  }

  // 获得payload
  getRequestPayload(key, params) {
    const { setting, ERROR_MESSAGE } = this;
    const { origin, alias } = setting;
    if (!setting.origin && !setting.alias) return this.log('error', ERROR_MESSAGE[1003]);
    if (!origin[key]) return this.log('error', ERROR_MESSAGE[1002]);
    if (!alias[key]) return this.log('error', ERROR_MESSAGE[1001]);
    return this.recoverPayload('origin', origin[key], alias[key], params);
  }

  // 设置请求对象
  defineRequest(request = null) {
    this.setting.api = request;
  }

  // 设置请求前的处理
  defineRequestBefore(callback) {
    this.requestBeforeProcess = callback;
  }
}
