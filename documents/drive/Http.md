# Http

由两部分组成: Http, HttpMecha  

## Sample Use

    import { util } from 'vue-moo';

    const $ = util.Http;

    $.fake(true).
      delay(1500).
      pack(data => ({
        code: 0,
        msg: 'fake message',
        data,
      }));

    $.GET('getUsrInfo').
      path('/get/userInfo'). // 服务真实路径
      payload(
        ['id'],
        ['userId']); // payload的默认值为空

    $.POST('uploadOrder').
      path('/upload/order').
      payload(
        ['uid', time, 'oid'],
        ['userId', null, 'orderId']);

    $.resetAccessPayload('getUsrInfo', 'id', null); // 改写payload的默认值
    $.domain('http://localhost'); // 服务域名
    $.before(() => {}); // 请求前
    $.header(header => header); // 重置payload
    $.payload(payload => payload); // 重置header
    $.sender(payload => payload); // 替换axios
    $.onRequestError(e => {}); // 请求发生错误
    $.onRequestException(e => {}); // 请求发生异常
    $.onRequest(e => {}); // 请求完成

    const serve = drive.Http($.config); // 创建服务

    $.bindPublicEvent([api]); // 使多个服务绑定相同的公共事件

    serve.getUserInfo({
      userId: '00001',
    }).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });

    serve.uploadOrder({
      userId: '00001',
      orderId: 'A0002',
    }).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });
