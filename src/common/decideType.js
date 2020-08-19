function isJSONStr(str) {
  return /^\{((".{0,}":".{0,}")|('.{0,}':'.{0,}')){0,}\}$/g.test(str);
}

function isArrStr(str) {
  return /^\[.+\]$/g.test(str);
}

export const JUDGE = {
  // Null
  IS_NUL: val => val === null,
  NO_NUL: val => val !== null,
  BY_NUL: val => JUDGE.IS_UND(val) || JUDGE.IS_NUL(val),
  // String
  IS_STR: val => typeof val === 'string',
  NO_STR: val => typeof val !== 'string',
  BY_STR: val => JUDGE.IS_UND(val) || JUDGE.IS_STR(val),
  // Boolean
  IS_BON: val => typeof val === 'boolean',
  NO_BON: val => typeof val !== 'boolean',
  BY_BON: val => JUDGE.IS_UND(val) || JUDGE.IS_BON(val),
  // Object
  IS_OBJ: val => typeof val === 'object' && val !== null,
  NO_OBJ: val => typeof val !== 'object' && val !== null,
  BY_OBJ: val => JUDGE.IS_UND(val) || JUDGE.IS_OBJ(val),
  // Number
  IS_NUM: val => typeof val === 'number',
  NO_NUM: val => typeof val !== 'number',
  BY_NUM: val => JUDGE.IS_UND(val) || JUDGE.IS_NUM(val),
  // Function
  IS_FUN: val => typeof val === 'function',
  NO_FUN: val => typeof val !== 'function',
  BY_FUN: val => JUDGE.IS_UND(val) || JUDGE.IS_FUN(val),
  BE_FUN: (val, context = JUDGE) => JUDGE.IS_FUN(val) ? val.bind(context) : Function(),
  // JSON
  IS_JSN: val => typeof val === 'string' && (isJSONStr(val) || isArrStr(val)),
  NO_JSN: val => typeof val !== 'string' || !(isJSONStr(val) || isArrStr(val)),
  BY_JSN: val => JUDGE.IS_UND(val) || JUDGE.IS_JSN(val),
  // Array
  IS_ARR: val => (val instanceof Array),
  NO_ARR: val => !(val instanceof Array),
  BY_ARR: val => JUDGE.IS_UND(val) || JUDGE.IS_ARR(val),
  // RegExp
  IS_REG: val => val instanceof RegExp,
  NO_REG: val => !(val instanceof RegExp),
  BY_BON: val => JUDGE.IS_UND(val) || JUDGE.IS_REG(val),
  // NaN
  IS_NAN: val => isNaN(val),
  NO_NAN: val => !isNaN(val),
  BY_NAN: val => JUDGE.IS_UND(val) || JUDGE.IS_NAN(val),
  // undefined
  IS_UND: val => typeof val === 'undefined',
  NO_UND: val => typeof val !== 'undefined',
  // Date
  IS_DAT: val => val instanceof Date,
  NO_DAT: val => !JUDGE.IS_DAT(val),
  // FormData
  IS_FOD: val => val instanceof FormData,
  NO_FOD: val => !JUDGE.IS_FOD(val),
  // File
  IS_FIL: val => val instanceof File,
  NO_FIL: val => !JUDGE.IS_FIL(val),
  // File Image
  IS_IMG: val => JUDGE.IS_FIL(val) && val.type.indexOf('image') >= 0,
  NO_IMG: val => !JUDGE.IS_IMG(val),
  // FileReader
  IS_FIR: val => val instanceof FileReader,
  NO_FIR: val => !val instanceof FileReader,
  // Promise
  IS_PRO: val => val instanceof Promise || (JUDGE.IS_FUN(val.then) && JUDGE.IS_FUN(val.catch)),
  NO_PRO: val => !JUDGE.IS_PRO(val),
  // multiple swtich
  IN(value, sequence) {
    let count = 0;

    Object.entries(sequence).map((kv) => {
      const [typeName, callback] = kv;

      if (JUDGE.IS_FUN(callback) && JUDGE.IS_FUN(JUDGE[typeName])) {
        if (JUDGE[typeName](value)) {
          count += 1;
          callback();
        }
      }
    });

    if (!count && JUDGE.IS_FUN(sequence.DEF)) {
      sequence.DEF();
    }
  },
  DO_FUN(fn, params = []) {
    if (JUDGE.IS_FUN(fn)) {
      return fn(...params);
    }
  },
  IS_CON(v, t) {
    if (JUDGE.NO_STR(t) && JUDGE.NO_ARR(t)) {
      return false;
    }

    return t.indexOf(v) >= 0;
  },
  NO_CON(v, t) {
    if (JUDGE.NO_STR(t) && JUDGE.NO_ARR(t)) {
      return false;
    }

    return t.indexOf(v) < 0;
  },
  BELONG(v, t) {
    if (JUDGE.NO_OBJ(t)) {
      return false;
    }

    return (v instanceof t) || v === t;
  },
  BELONG_IN(v, t) {
    if (JUDGE.NO_ARR(t)) {
      return false;
    }

    for (let i = 0; i < t.length; i += 1) {
      if (JUDGE.BELONG(v, t[i])) {
        return true;
      }

      if (v === t[i]) {
        return true;
      }
    }

    return false;
  },
};

// 将类型验证的结果以否定的形式返回
const decideType = (express = [], doth) => {
  let existFalse = false;

  if (JUDGE.IS_ARR(express)) {
    for (let i = 0; i < express.length; i += 1) {
      if (!JUDGE.IS_FUN(express[i])) break;

      const verifyGroup = express[i]();
      const JUDGEResult = Object.entries(verifyGroup).map((kv) => {
        const [name, val] = kv;
        return JUDGE[name](val);
      });

      existFalse = JUDGEResult.indexOf(false) >= 0;

      if (existFalse) break;
    }
  }

  if (JUDGE.IS_FUN(doth.exception) && existFalse) {
    return doth.exception(express);
  } else if (JUDGE.IS_FUN(doth.clear)) {
    return doth.clear();
  } else {
    return doth.exception(express);
  }

  return existFalse;
};

export default decideType;
