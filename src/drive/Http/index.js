import http from './create';
import httpMecha from './mecha';

/* http、httpMecha的数据格式构造 */
const formatMaps = (maps) => {
 const list = [];
 const payloads = [];

 Object.entries(maps).map((link) => {
   const [, desc] = link;

   list.push({
     name: desc.name,
     method: desc.method,
     path: desc.path,
     fake: desc.fake,
   });

   payloads.push({
     name: desc.name,
     origin: desc.origin,
     alias: desc.alias,
   });

   return link;
 });

 return { list, payloads };
}

/* http、httpMecha的数据格式构造 */
export default (params)  => {
  const { domain, fake } = params;
  const hasFake = fake.open;
  const fakeDataStruct = fake.pack;
  const fakeDelay = fake.delay;
  const setPayload = params.setPayload;
  const setHeaders = params.setHeaders;
  const replaceSender = params.sender;
  const { list, payloads } = formatMaps(params.access);
  const access = list.map(api => Object.assign({ ...api }, {
    fake: !hasFake ? null : fakeDataStruct(api.fake),
  }));

  const apiParams = {
   domain, // 常规域名
   access, // 接入映射
   setPayload, // 当payload载入时
   setHeaders, // 当headers载入时
   replaceSender, // 替换发送体
   fakeDelayTime: fakeDelay, // 模拟数据延迟时间
  };

  const serve = http(apiParams);
  const mecha = new httpMecha(serve); // 针对http协议的夹层

  // 定义夹层的payload校验
  payloads.map((payload) => {
    const { name, origin, alias } = payload;
    mecha.definePayload(name, origin, alias);
    return payload;
  });

  // 夹层发送请求前
  mecha.defineRequestBefore((payload) => {
    if (typeof params.sendBefore === 'function') {
      return Object.assign(payload, params.sendBefore(payload));
    }
    return payload;
  });

  // 初始化夹层
  return mecha.init();
}
