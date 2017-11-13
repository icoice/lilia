import axios from 'axios';
import Adapter from 'imagination-adapter';

/**
 *  API 一级调用封装
 *  <属性>
 *  fakeDelayTime: 用于控制伪造数据的返回时间
 *  domain: 访问的域名
 *  access: 接口列定义
 *  注：目前规范上不允许POST请求携带QUERY参数。
 */
 class Remote {
  constructor(setting = {}) {
    const { fakeDelayTime } = setting;
    return this.setters(setting);
  }
  // 配置Remote实例
  setters(setting = {}) {
    const { domain, access, fakeDelayTime } = setting;
    this.fakeDelayTime = fakeDelayTime ? fakeDelayTime : 1000;
    this.domain = domain ? domain : '';
    this.access = access ? access : [];
    this.buildHeaders = !setting.onBuildHeaders ?  params => params : setting.onBuildHeaders;
    this.buildPayload = !setting.onBuildPayload ?  params => params : setting.onBuildPayload;
    this.replaceSender = !setting.replaceSender ? null : setting.replaceSender;
    return this.register();
  }
  // 注册Remote实例方法
  register() {
    const { access, domain, fakeDelayTime } = this;
    const apiList = {};

    access.map((item) => {
      const { name, method, path, fake } = item;
      const _self = this;
      apiList[name] = (params = {}) => {
        // 1、实时传参
        // 2、payload的默认定义
        // 1存在未被定义的内容，那么使用2。
        const requestMethod = params.remoteMethod || method;
        const requestData = params.remoteData || params;

        const headers = this.buildHeaders({
          'Content-Type': requestData instanceof FormData ? 'multipart/form-data' : 'application/json',
        });

        const axiosSetting = this.buildPayload({
          url: `${domain}${path}`,
          method: requestMethod,
          params: requestData,
          data: requestData,
          headers,
        });

        //  发送请求
        function send(payload) {
          if (fake === null) {
            switch (requestMethod) {
              case 'POST':
                payload.data = Object.assign({},
                 payload.data,
                 requestData);
                break;
              default: payload.params = Object.assign({},
               payload.params,
               requestData);
            }
            if (typeof _self.replaceSender === 'function') {
              return _self.replaceSender(payload);
            } else {
              return axios(setting);
            }
          }
          return new Promise(resolve => setTimeout(() => resolve(fake), fakeDelayTime));
      }

       if (axiosSetting && (axiosSetting instanceof Promise || typeof axiosSetting.then === 'function' )) {
         return axiosSetting.then(setting => send(setting));
       } else {
         return send(axiosSetting);
       }
      };
      return item;
    });

    return apiList;
  }
}

// Adapter用于将特定数据转换为一级对象调用。next()会返回源数据方法的返回值，需要return
export default function (setting) {
  const newSetting = Object.assign({} , setting);
  const { access } = setting;
  Adapter.accross('onExecuteBefore', next => next());
  Adapter.accross('onExecuteAfter', next => next());
  setting.access = setting.access.map(api=> {
    const newApi = Object.assign({}, api);
    newApi.fake = api.fake !== null && typeof api.fake === 'object' ? {
      config: {},
      headers: {},
      request: {},
      status: 200,
      statusText: 'ok',
      data: Object.assign({}, api.fake),
   } : api.fake;
   return newApi;
  });
  return new Adapter(new Remote(setting));
}
