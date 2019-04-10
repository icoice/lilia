function isJSONStr(str) {
  return /^\{((".{0,}":".{0,}")|('.{0,}':'.{0,}')){0,}\}$/g.test(str);
}

function isArrStr(str) {
  return /^\[.+\]$/g.test(str);
}

const judge = {
  // Null
  IS_NUL: val => val === null,
  NO_NUL: val => val !== null,
  BY_NUL: val => judge.IS_UND(val) || judge.IS_NUL(val),
  // String
  IS_STR: val => typeof val === 'string',
  NO_STR: val => typeof val !== 'string',
  BY_STR: val => judge.IS_UND(val) || judge.IS_STR(val),
  // Boolean
  IS_BON: val => typeof val === 'boolean',
  NO_BON: val => typeof val !== 'boolean',
  BY_BON: val => judge.IS_UND(val) || judge.IS_BON(val),
  // Object
  IS_OBJ: val => typeof val === 'object' && val !== null,
  NO_OBJ: val => typeof val !== 'object' && val !== null,
  BY_OBJ: val => judge.IS_UND(val) || judge.IS_OBJ(val),
  // Number
  IS_NUM: val => typeof val === 'number',
  NO_NUM: val => typeof val !== 'number',
  BY_NUM: val => judge.IS_UND(val) || judge.IS_NUM(val),
  // Function
  IS_FUN: val => typeof val === 'function',
  NO_FUN: val => typeof val !== 'function',
  BY_FUN: val => judge.IS_UND(val) || judge.IS_FUN(val),
  BE_FUN: (val, context = judge) => judge.IS_FUN(val) ? val.bind(context) : Function(),
  // JSON
  IS_JSN: val => typeof val === 'string' && (isJSONStr(val) || isArrStr(val)),
  NO_JSN: val => typeof val !== 'string' || !(isJSONStr(val) || isArrStr(val)),
  BY_JSN: val => judge.IS_UND(val) || judge.IS_JSN(val),
  // Array
  IS_ARR: val => (val instanceof Array),
  NO_ARR: val => !(val instanceof Array),
  BY_ARR: val => judge.IS_UND(val) || judge.IS_ARR(val),
  // RegExp
  IS_REG: val => val instanceof RegExp,
  NO_REG: val => !(val instanceof RegExp),
  BY_BON: val => judge.IS_UND(val) || judge.IS_REG(val),
  // NaN
  IS_NAN: val => isNaN(val),
  NO_NAN: val => !isNaN(val),
  BY_NAN: val => judge.IS_UND(val) || judge.IS_NAN(val),
  // undefined
  IS_UND: val => typeof val === 'undefined',
  NO_UND: val => typeof val !== 'undefined',
  // Date
  IS_DAT: val => val instanceof Date,
  NO_DAT: val => !val instanceof Date,
  // FormData
  IS_FOD: val => val instanceof FormData,
  NO_FOD: val => !val instanceof FormData,
  // File
  IS_FIL: val => val instanceof File,
  NO_FIL: val => !val instanceof File,
  // FileReader
  IS_FIR: val => val instanceof FileReader,
  NO_FIR: val => !val instanceof FileReader,
  // multiple swtich
  IN(value, sequence) {
    let count = 0;

    Object.entries(sequence).map((kv) => {
      const [typeName, callback] = kv;

      if (this.IS_FUN(callback) && this.IS_FUN(judge[typeName])) {
        if (judge[typeName](value)) {
          count += 1;
          callback();
        }
      }
    });

    if (!count && this.IS_FUN(sequence.DEF)) {
      sequence.DEF();
    }
  },
};

// 将类型验证的结果以否定的形式返回
const decideType = (express = [], doth) => {
  let existFalse = false;

  if (judge.IS_ARR(express)) {
    for (let i = 0; i < express.length; i += 1) {
      if (!judge.IS_FUN(express[i])) break;

      const verifyGroup = express[i]();
      const judgeResult = Object.entries(verifyGroup).map((kv) => {
        const [name, val] = kv;
        return judge[name](val);
      });

      existFalse = judgeResult.indexOf(false) >= 0;

      if (existFalse) break;
    }
  }

  if (judge.IS_FUN(doth.exception) && existFalse) {
    return doth.exception(express);
  } else if (judge.IS_FUN(doth.clear)) {
    return doth.clear();
  } else {
    return doth.exception(express);
  }

  return existFalse;
};

decideType.JUDGE = judge;

export default decideType;
