# Http

## util.Http.domain

设置服务域名

    util.Http.domain('http://localhost');

## util.Http.before

请求前

    util.Http.before(() => {});

## util.Http.header

重置header

    util.Http.header(header => header);

## util.Http.payload

重置payload

    util.Http.payload(payload => payload);

## util.Http.sender

替换axios

    util.Http.sender(payload => payload);

## util.Http.onRequestError

请求发生错误

    util.Http.onRequestError(e => {});

## util.Http.onRequestException

请求发生异常

    util.Http.onRequestException(e => {});

## util.Http.onRequest

请求完成

    util.Http.onRequest(e => {});

## util.Http.resetAccessPayload

改写payload的默认值

    util.Http.resetAccessPayload('getUsrInfo', 'id', null); // 改写payload的默认值

## util.Http.fake

    util.Http.fake(true).
      delay(1500).
      pack(data => ({
        code: 0,
        msg: 'fake message',
        data,
      }));

## util.Http.GET

    util.Http.GET('getUsrInfo').
      path('/get/userInfo'). // 服务真实路径
      payload(
        ['id'],
        ['userId']); // payload的默认值为空

## util.Http.POST

同上

## util.Http.PUT

同上

## util.Http.UPDATE

同上

## util.Http.DELETE

同上
