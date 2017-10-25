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

export const storage = {
  set(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  },
  get(name) {
    const data = localStorage.getItem(name);
    return data !== null ? JSON.parse(data) : data;
  },
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

export const firstLetterUppercase = function firstLetterUppercase(word) {
  if (typeof word !== 'string') return word;
  const firstLetter = word.charAt(0);
  return `${firstLetter.toUpperCase()}${word.substr(1, word.length)}`;
}

export const hasEmpty = function hasEmpty(word) {
  return word === '' ||
  word === null ||
  word === 'null' ||
  typeof word === 'undefined';
}

export default {
  animate,
  storage,
  clock,
  objectValueString,
  firstLetterUppercase,
  hasEmpty,
};
