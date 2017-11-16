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

    // 请求状态描述
    this.READY_STATE_MESSAGE = [
      '未发送',
      '已发送',
      '等待响应',
      '请求完成',
    ];

    // request setting data
    this.setting = {
      api: null,
      origin: null,
      alias: null,
    };
    this.logger = [];
    //  当前接口发送记录
    this.adapterSendRecord = {};
    // 发送id
    this.sendId = 0;
    this.backRequestBefore = payload => payload;
    this.requestErrorHandle = () => {};
    this.requestHandle = () => {};
    this.requestExceptionHandle = () => {};
    this.defineRequest(adapter);
  }

  // 初始化
  init() {
    const {
     setting,
     ERROR_MESSAGE,
     backRequestBefore,
     adapterSendRecord,
    } = this;
    const { api } = setting;
    const control = {
      // 请求内容发生错误时
      ON_REQUEST_ERROR: (callback) => {
        this.requestErrorHandle = callback;
      },
      // 请求完成后，发生异常时
      ON_REQUEST_EXCEPTION: (callback) => {
        this.requestExceptionHandle = callback;
      },
      // 一般请求时
      ON_REQUEST: (callback) => {
        this.requestHandle = callback;
      },
    };

    if (!api) return this.log('error', ERROR_MESSAGE[1004]);

    Object.entries(api).map((access) => {
      const [name, method] = access;
      control[name] = (params = {}) => {
        this.sendId += 1;

        let payload = params;
        const myId = this.sendId;

        if (!adapterSendRecord[name]) {
          adapterSendRecord[name] = {};
        }

        adapterSendRecord[name][myId] = {
          REJECT_RESPONSE: false,
        };

        if (!(params instanceof FormData)) {
          payload = this.getRequestPayload(name, params);
          if (backRequestBefore) {
            payload = Object.assign({}, backRequestBefore(payload, method));
          }
        }

        return method(payload).then((response) => {
          if (!response.data) {
            this.log('exception', '未获得服务器的响应数据');
          } else {
            response.data.HOW = Object.assign({
              id: myId,
            }, adapterSendRecord[name][myId]);
            this.log('complete', `${response.description}`, response.data);
          }
          delete adapterSendRecord[name][myId];
          // 用于replaceSender里面无法取消请求的请求对象，采用拒绝响应的措施
          return response;
        }).catch(e => {
          delete adapterSendRecord[name][myId];
          this.requsetException(e);
        });
      };

      return access;
    });

    // 拒绝响应
    control.rejectResponse = (name, id = null) => {
      const { adapterSendRecord } = this;
      const ids = adapterSendRecord[name];

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

    return control;
  }

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
    if (!origin[key]) return this.log('error', ERROR_MESSAGE[1001]);
    if (!alias[key]) return this.log('error', ERROR_MESSAGE[1002]);
    return this.recoverPayload('origin', origin[key], alias[key], params);
  }

  // 设置请求对象
  defineRequest(request = null) {
    this.setting.api = request;
  }

  // 设置请求前的处理
  defineRequestBefore(callback) {
    this.backRequestBefore = callback;
  }
}
