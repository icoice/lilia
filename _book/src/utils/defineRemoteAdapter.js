import remoteDrives from '../modules/remote-drives';
import RemoteDrivesMecha from '../modules/remote-drives/mecha';

/**
 * 用于转换remote-drives的access格式。
 * payload是用于校验API的参数，
 * payload必须被定义，payload未被定义的参数不会被接入。
 * 比如有3个参数，payload仅定义了argus1,argus2,
 * 那么argus3在实际传参中不会被服务器获得。
 *  payload需定义默认值。
 */
const remoteApdaterFormater = function remoteApdaterFormater(maps) {
 const apiMap = [];
 const apiPayload = [];

 Object.entries(maps).map((api) => {
   const [, desc] = api;
   apiMap.push(desc.info);
   apiPayload.push(desc.payload);
   return api;
 });

 return {
   list: apiMap,
   payloads: apiPayload,
 };
}

/**
* domain：使用代理时，请不要填写Domain。（暂时）
* access：API的映射表。
* fakeDelayTime：虚拟数据的延时获得，用于仿造访问远程时的情景。
*  fake: 是否接入虚假数据, 假设并没有定义fake的数据时，则默认接入真实接口。
* adapterMecha: 用于置换数据，预定义请求体, 方法别名，增加Promise的支持等等。
*  mecha用于支持remote-drives在HTTP协议规范上的情景处理。
*/
export const  defineRemoteAdapter = function defineRemoteAdapter({
 config,
 maps,
 sendBefore,
 onBuildPayload,
 onBuildHeaders,
 replaceSender,
}) {
  const apiMaps = remoteApdaterFormater(maps);
  const api = remoteDrives({
   domain: config.domain,
   access: apiMaps.list.map(api => Object.assign(api, {
     fake: !config.hasFake ? null : config.fakeBaseDataStruct(api.fake),
   })),
   fakeDelayTime: config.fakeDelay,
   onBuildPayload,
   onBuildHeaders,
   replaceSender,
  });

  const adapterMecha = new RemoteDrivesMecha(api);

  // 预定义请求体。
  apiMaps.payloads.map((payload) => {
   adapterMecha.definePayload(payload.name, payload.origin, payload.alias);
   return payload;
  });

  // 可用于请求前，变更payload的内容。
  // 这里主要处理用户数据在各类API间的切入。
  adapterMecha.defineRequestBefore((payload) => {
   return Object.assign(payload, sendBefore(payload));
  });

  return adapterMecha.init();
}
