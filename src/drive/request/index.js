import RequestMecha from './mecha';
import request from './create';
import { JUDGE, loop } from '../../common';
import requestPack from './requestPack';

const extractAccess = (maps) => {
  const accessGroup = [];

  loop(maps, access => accessGroup.push({
    fake: access.fake,
    method: access.method,
    name: access.name,
    path: access.path,
  }));

  return accessGroup;
};

const extractPayloads = (maps) => {
  const payloadGroup = [];

  loop(maps, access => payloadGroup.push({
    alias: access.alias,
    name: access.name,
    origin: access.origin,
  }));

  return payloadGroup;
};

export {
  requestPack,
};

export default ({
  access,
  domain,
  fake,
  sender,
  setHeaders,
  setPayload,
  sendBefore,
})  => {
  const payloads = extractPayloads(access);
  const mecha = new RequestMecha({
    ...request({
      access: extractAccess(access), // 接入映射
      domain, // 常规域名
      fakePack: fake.pack,
      fakeDelay: fake.delay, // 模拟数据延迟时间
      hasFake: fake.open, // 是否开启虚拟数据
      sender, // 替换发送体
      setHeaders, // 当headers载入时
      setPayload, // 当payload载入时
    }),
    domain,
  });

  payloads.map((payload) => {
    mecha.definePayload(
      payload.name,
      payload.origin,
      payload.alias);

    return payload;
  });

  // 夹层发送请求前
  mecha.defineRequestBefore((payload, name) => {
    if (JUDGE.IS_FUN(sendBefore)) {
      return {
        ...payload,
        ...sendBefore(payload, name),
      };
    }

    return payload;
  });

  // 初始化夹层
  return mecha.init();
};
