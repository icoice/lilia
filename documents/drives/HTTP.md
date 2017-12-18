# drives/http

发送请求。

## http

    import http from 'vue-moo/drives/http';

    // 接口定义
    const access = [
      {
        name: 'getYourName',
        path: '/get/your-name',
        fake: null,
      }
    ];

    // 接口创建
    const api = http({
      domain: 'http://localhost:3000',
      fakeDelay: 1500,
      access,
    });

    // 接口应用
    api.getYourName({
      id: '00001',
    })
    .then((response) => {
      //..success
    })
    .catch((err) => {
      // fail..
    });
