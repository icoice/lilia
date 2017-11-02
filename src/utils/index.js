import remoteDrives from '../modules/remote-drives';
import RemoteDrivesMecha from '../modules/remote-drives/mecha';

// animate.css的控制
export const animate = function animate(name, target, type) {
  clearTimeout(animate.sid);

  const dom = target;
  const domClass = dom.className.split(' ');

  if (domClass.indexOf('animated') < 0) domClass.push('animated');
  if (type === 'quickly' && domClass.indexOf('animated-quickly') < 0) domClass.push('animated-quickly');

  if (domClass.indexOf(name) < 0) {
    domClass.push(name);
    dom.className = domClass.join(' ');
  } else {
    const newClass = [];
    domClass.map((cn) => {
      if (cn !== name) newClass.push(cn);
      return cn;
    });
    dom.className = newClass.join(' ');
    animate.sid = setTimeout(() => animate(name, target), 10);
  }
};

// 简易的storage存取
export const storage = {
  set(name, value) {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch(e) {
      this.exception(e);
    }
  },
  get(name) {
    try {
      const data = localStorage.getItem(name);
      return data !== null ? JSON.parse(data) : data;
    } catch(e) {
     this.exception(e);
    }
  },
  exception: () => {},
};

// 时间
export const clock = function clock(express, date = null) {
  const setter = typeof date === 'object' && date !== null ? `${date.year}/${date.month}/${date.day}` : date;
  const timer = typeof setter === 'number' || typeof setter === 'string' ? new Date(setter) : new Date();
  const YYYY = timer.getFullYear();
  const M = timer.getMonth() + 1;
  const D = timer.getDate();
  let dateExporess = express;
  dateExporess = dateExporess.replace(/YYYY/g, YYYY);
  dateExporess = dateExporess.replace(/YY/g, YYYY.toString().substr(2, 4));
  dateExporess = dateExporess.replace(/MM/g, M < 10 ? `0${M}` : M);
  dateExporess = dateExporess.replace(/M/g, M);
  dateExporess = dateExporess.replace(/DD/g, D < 10 ? `0${D}` : D);
  dateExporess = dateExporess.replace(/D/g, D < 10 ? `0${D}` : D);
  return dateExporess;
};

// 单层对象属性值的字符转换
export const objectValueString = function charsetChange(obj) {
  const target = obj;
  if (typeof target !== 'object') return obj;
  Object.entries(target).map((kv) => {
    const [k, v] = kv;
    target[k] = typeof v === 'number' ? v.toString() : v;
    return kv;
  });
  return target;
};

// 首字母大写
export const firstLetterUppercase = function firstLetterUppercase(word) {
  if (typeof word !== 'string') return word;
  const firstLetter = word.charAt(0);
  return `${firstLetter.toUpperCase()}${word.substr(1, word.length)}`;
}

// 判断变量是否为空值
export const hasEmpty = function hasEmpty(word) {
  return word === '' ||
  word === null ||
  word === 'null' ||
  JSON.stringify(word) === '{}' ||
  JSON.stringify(word) === '[]' ||
  typeof word === 'undefined';
}

// 驼峰替换
export const humpChangeTo = function humpChangeTo(word, separator) {
  const newWord = [];
  for (let i = 0; i < word.length; i += 1) {
    const letter = word[i];
    newWord.push(/[A-Z]/g.test(letter) ? `${separator}${letter.toLowerCase()}` : letter);
  }
  return newWord.join('');
}

/**
 * 用于转换remote-drives的access格式。
 * payload是用于校验API的参数，
 * payload必须被定义，payload未被定义的参数不会被接入。
 * 比如有3个参数，payload仅定义了argus1,argus2,
 * 那么argus3在实际传参中不会被服务器获得。
 *  payload需定义默认值。
 */
export const remoteApdaterFormater = function remoteApdaterFormater(maps) {
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
export const  defineRemoteAdapter = function defineRemoteAdapter(config, maps) {
  const apiMaps = remoteApdaterFormater(maps);
  const adapterMecha = new RemoteDrivesMecha(remoteDrives({
   domain: config.domain,
   access: apiMaps.list.map(api => Object.assign(api, {
     fake: !config.hasFake ? null : config.fakeBaseDataStruct(api.fake),
   })),
   fakeDelayTime: config.fakeDelay,
  }));

  // 预定义请求体。
  apiMaps.payloads.map((payload) => {
   adapterMecha.definePayload(payload.name, payload.origin, payload.alias);
   return payload;
  });

  // 可用于请求前，变更payload的内容。
  // 这里主要处理用户数据在各类API间的切入。
  adapterMecha.defineRequestBefore((payload) => {
   const { USER_INFO } = window;
   return Object.assign(payload,
    !USER_INFO ? {} : {
      userId: USER_INFO.id,
      police: USER_INFO.id,
    });
  });

  return adapterMecha.init();
}

export default {
  animate,
  storage,
  clock,
  firstLetterUppercase,
  humpChangeTo,
  hasEmpty,
  objectValueString,
  remoteApdaterFormater,
  defineRemoteAdapter,
};
