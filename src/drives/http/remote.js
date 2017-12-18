export default class Http {

  constructor(setting = {}) {
    return this.init(setting);
  }

  // 配置Http实例
  init(setting = {}) {
    const {
     domain,
     access,
     fakeDelay,
     onBuildHeaders,
     onBuildPayload,
     sender,
     replaceSender,
    } = setting;

    // 延迟时间
    this.fakeDelayTime = fakeDelay ? fakeDelay : 1000;
    // 域名
    this.domain = domain ? domain : '';
    // api的映射表
    this.access = access ? access : [];
    // 每次请求创建请求头前的钩子
    this.buildHeaders = !onBuildHeaders ?  params => params : onBuildHeaders;
    // 每次请求创建请求参数前的钩子
    this.buildPayload = !onBuildPayload ?  params => params :  onBuildPayload;
    // 替换请求发送模块
    this.sender = !sender ? (!replaceSender ? null : replaceSender) : sender;
    //  注册接口
    return this.register();
  }

  // 自动选择content-type
  autoContentType(data) {
    if (data instanceof FormData) return 'multipart/form-data';
    if (typeof data === 'Object' && data !== null) return 'application/json';

    return 'text/plain';
  }

  // 创建payload
  createPayload(path, method, data) {
    this.buildPayload({
      url: `${this.domain}${path}`,
      method: method,
      headers: this.buildHeaders({
        'Content-Type': this.autoContentType(data),
      }),
      params: data,
      data,
    });
  }

  // remote api的处理内容
  request(item) {
    const { sender, fakeDelayTime } = this;
    const { name, method, path, fake } = item;

    return (params = {}) => {
      const { remoteData, remoteMethod } = params;
      const requestMethod = remoteMethod || method;
      const requestData = remoteData || params;
      const payload = this.createPayload(path, requestMethod, requestData);

      //  发送请求，data为body, params为query
      const send = (requesetPayload) => {
        const { data, params } = requesetPayload;
        if (fake !== null) {
          return new Promise(resolve => {
            setTimeout(() => resolve(fake), fakeDelayTime);
          });
        }
        switch (requestMethod) {
          case 'POST':
            requesetPayload.data = Object.assign({}, data, requestData);
            break;
          default:
            requesetPayload.params = Object.assign({}, params, requestData);
        }
        return sender?  axios(requesetPayload) : sender(requesetPayload);
     }

     // 假设payload返回的是一个promise
     if (payload && (payload instanceof Promise || typeof payload.then === 'function' )) {
       return payload.then(setting => send(setting));
     } else {
       return send(payload);
     }
    };
  }

  // 注册Remote实例方法
  register() {
    const { access } = this;
    const apiList = {};

    access.map((item) => {
      apiList[name] = this.request(item);
      return item;
    });

    return apiList;
  }
}
