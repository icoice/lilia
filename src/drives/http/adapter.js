import http from './';
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
  const { domain, hasFake, fakeDataStruct, fakeDelay } = params.config;
  const { onBuildPayload, onBuildHeaders, replaceSender, maps } = params;
  const { list, payloads } = formatMaps(maps);
  const access = list.map(api => Object.assign({ ...api }, {
    // fakeDataStruct 用于定义基础数据结构
    fake: !hasFake ? null : fakeDataStruct(api.fake),
  }));

  const apiParams = {
   fakeDelayTime: fakeDelay, // 模拟数据延迟时间
   domain, // 常规域名
   access, // 接入映射
   onBuildPayload, // 当payload载入时
   onBuildHeaders, // 当headers载入时
   replaceSender, // 替换发送体
  };

  const mecha = new httpMecha(http(apiParams)); // 针对http协议的夹层

  // 定义夹层的payload校验
  payloads.map((payload) => {
    const { name, origin, alias } = payload;
    mecha.definePayload(name, origin, alias);
    return payload;
  });

  // 夹层发送请求前
  mecha.defineRequestBefore((payload) => {
    Object.assign(payload, params.sendBefore(payload));
  });

  // 初始化夹层
  return mecha.init();
}
