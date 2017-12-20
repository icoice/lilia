# drives/http

http驱动器由两部分组成:

1、Http  
2、HttpMecha  

一个服务仅对应一个http对象。

## Sample Use

maps/getYourName/index.js

    const name = 'getYourName';

    const info = {
      name,
    }

    const payload = {
      name,
      path: '/get/your-name',
      fake: {
        name: 'myName',
      },
      origin: {
        userId: null,
      },
      alias: {
        userId: 'id',
      },
    }

    export default {
      info,
      payload,
    }


apater/index.js

    import httpApater from 'vue-moo/drives/http/apater';
    import maps from './maps';

    export default httpApater({
      // api接口及其payload的预定义
      maps，
      // 服务配置
      config: {
        domain: 'http://localhost:9000',
        hasFake: false,
        fakeDelay: 1500,
        fakeDataStruct: data => ({ code: 0, data }),
      },
      // 发送请求前，这里可重置payload，且参数不受预定义约束。
      sendBefore: () => ({
        token: window.token,
      }),
      // 重置请求体, 受payload的预定义约束
      setPayload(payload) { //... },
      // 重置请求头
      setHeaders(headers) { //... },
      // 替换发送装置
      sender(payload) { //... },
    });


## Http

http协议服务创建。

    import http from 'vue-moo/drives/http';

    // 接口定义
    const access = [
      {
        name: 'getYourName',
        path: '/get/your-name',
        fake: null,
      },
    ];

    // 接口创建
    const api = http({
      domain: 'http://localhost:3000', // 该服务的域名
      fakeDelay: 1500, // 伪数据的延迟，默认1000ms。
      access, // 接口映射
    });

    // 接口应用，QUERY的参数、BODY的参数会依据协议方法合并到data参数内。
    api.getYourName({
      id: '00001',
      [api.QUERY]: { //..覆盖合并data，或额外提交 },
      [api.BODY]: { //..覆盖合并data，或额外提交 },
      [api.METHOD]: { //..覆盖原接口定义的方法 },
    })
    .then((response) => {
      //..请求成功
    })
    .catch((err) => {
      //..请求失败或请求发送异常
    });

## HttpMecha

http协议夹层服务创建，夹层主要作用：  

1、处理http协议的异常响应，如响应码为500。  
2、校验payload参数  
3、设置payload的默认值  
4、重置payload参数名  
5、过滤非payload定义的key  
6、保存每次请求的日志

    import HttpMecha from 'vue-moo/drives/http/Mecha';

    const apiMecha = new HttpMecha(api);

    // 定义paylaod的key, 以及别名的映射关系
    apiMecha.definePayload('getYourName', {
      userId: null,
    }, {
      userId: 'id',
    });

    // 夹层发送请求前数据合并, 这里混合参数不受payload的预定义影响。
    apiMecha.defineRequestBefore((payload) => {
      Object.assign(payload, { token: window.token });
    });

    export default apiMecha.init();
