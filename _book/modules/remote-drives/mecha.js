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
    this.backRequestBefore = payload => payload;
    this.requestErrorHandle = () => {};
    this.requestHandle = () => {};
    this.requestExceptionHandle = () => {};
    this.defineRequest(adapter);
  }

  // 初始化
  init() {
    const { setting, ERROR_MESSAGE, backRequestBefore } = this;
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
        let payload = params;

        if (!(params instanceof FormData)) {
          payload = this.getRequestPayload(name, params);
          if (backRequestBefore) {
            payload = Object.assign({}, backRequestBefore(payload));
          }
        }

        return method(payload).then((response) => {
          if (!response.data) {
            this.log('exception', '未获得服务器的响应数据');
          } else {
            this.log('complete', `${response.description}`, response.data);
          }
          return response;
        }).catch(e => this.requsetException(e));
      };
      return access;
    });
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
        requestErrorHandle(record);
        throw description;
      case 'exception':
        requestExceptionHandle(record);
        throw description;
      default:
        requestHandle(record);
    }
    logger.push(record);
  }

  // axios的异常请求处理
  requsetException(e) {
    const { request, message } = e;
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
