import http from './create';
import httpMecha from './mecha';
import util from '../../util';

const {
  hasEmpty,
  hasFunc,
} = util.Assert;

/* http、httpMecha的数据格式构造 */
const formatMaps = (maps) => {
 const payloads = [];
 const list = [];

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
  const { fake, domain } = params;
  const hasFake = fake.open;
  const fakeDataStruct = fake.pack;
  const fakeDelay = fake.delay;
  const setPayload = params.setPayload;
  const setHeaders = params.setHeaders;
  const sender = params.sender;
  const { list, payloads } = formatMaps(params.access);

  const apiParams = {
   domain, // 常规域名
   access: list, // 接入映射
   setPayload, // 当payload载入时
   setHeaders, // 当headers载入时
   sender, // 替换发送体
   fakeDelay, // 模拟数据延迟时间
   hasFake, // 是否开启虚拟数据
  };

  const serve = http(apiParams);
  const mecha = new httpMecha(serve); // 针对http协议的夹层

  // 定义夹层的payload校验
  payloads.map((payload) => {
    mecha.definePayload(
      payload.name,
      payload.origin,
      payload.alias);

    return payload;
  });

  // 夹层发送请求前
  mecha.defineRequestBefore((payload) => {
    if (hasFunc(params.sendBefore)) {
      return Object.assign(payload, params.sendBefore(payload));
    }

    return payload;
  });

  // 初始化夹层
  return mecha.init();
}
