import RequestMecha from './mecha';
import request from './create';
import { JUDGE, loop } from '../../common';
import requestPack from './requestPack';

const extractAccess = (maps) => {
  const accessGroup = [];

  loop(maps, access => extractAccess.push({
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
    alias: desc.alias,
    name: desc.name,
    origin: desc.origin,
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
})  => {
  const mecha = new RequestMecha({ ...serve, domain });
  const payloads = extractPayloads(access);
  const serve = request({
    access: extractAccess(access), // 接入映射
    domain, // 常规域名
    fakeDelay: fake.delay, // 模拟数据延迟时间
    hasFake: fake.open, // 是否开启虚拟数据
    sender, // 替换发送体
    setHeaders, // 当headers载入时
    setPayload, // 当payload载入时
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
    if (JUDGE.IS_FUN(params.sendBefore)) {
      return {
        ...payload,
        ...params.sendBefore(payload, name),
      };
    }

    return payload;
  });

  // 初始化夹层
  return mecha.init();
};
