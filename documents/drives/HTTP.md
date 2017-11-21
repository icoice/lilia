# drives/http

发送请求。

## 示例代码

定义一个remote实例

    import remoteDrives from 'vue-ui-drives/modules/remote-drives';
    import RemoteDrivesMecha from 'vue-ui-drives/modules/remote-drives/mecha';

    const fakes = {
      getOrders: [
        {
          id: 0,
          name: 'product-0',
        },
        {
          id: 1,
          name: 'product-1',
        },
      ],
    };

    const apiMap = [
      {
        name: 'getOrders',
        path: '/get/orders',
        fake: fakes.getOrders,
      },
    ];

    const adapter = remoteDrives({
      domain: 'http://localhost:3000',
      access: apiMap,
      fakeDelayTime: 1500,
    });

    // 用于置换数据，预定义请求体, 方法别名，增加Promise的支持等等。
    const adapterMecha = new RemoteDrivesMecha(adapter);

    // 可用于请求前，变更payload的内容。
    adapterMecha.defineRequestBefore(payload => payload);

    // 预定义请求体。
    adapterMecha.definePayload('getOrders', {
      uid: '', // 默认值
    }, {
      uid: 'userId',  //别名
    });

    export default adapterMecha;
