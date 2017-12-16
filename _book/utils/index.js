'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageScaleExpress = exports.fileToBase64 = exports.ScrollerPaging = exports.defineRemoteAdapter = exports.remoteApdaterFormater = exports.humpChangeTo = exports.hasEmpty = exports.firstLetterUppercase = exports.objectValueString = exports.clock = exports.storage = exports.animate = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _remoteDrives = require('../modules/remote-drives');

var _remoteDrives2 = _interopRequireDefault(_remoteDrives);

var _mecha = require('../modules/remote-drives/mecha');

var _mecha2 = _interopRequireDefault(_mecha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// animate.css的控制
var animate = exports.animate = function animate(name, target, type) {
  clearTimeout(animate.sid);

  var dom = target;
  var domClass = dom.className.split(' ');

  if (domClass.indexOf('animated') < 0) domClass.push('animated');
  if (type === 'quickly' && domClass.indexOf('animated-quickly') < 0) domClass.push('animated-quickly');

  if (domClass.indexOf(name) < 0) {
    domClass.push(name);
    dom.className = domClass.join(' ');
  } else {
    var newClass = [];
    domClass.map(function (cn) {
      if (cn !== name) newClass.push(cn);
      return cn;
    });
    dom.className = newClass.join(' ');
    animate.sid = setTimeout(function () {
      return animate(name, target);
    }, 10);
  }
};

// 简易的storage存取
var storage = exports.storage = {
  set: function set(name, value) {
    try {
      localStorage.setItem(name, (0, _stringify2.default)(value));
    } catch (e) {
      this.exception(e);
    }
  },
  get: function get(name) {
    try {
      var data = localStorage.getItem(name);
      return data !== null ? JSON.parse(data) : data;
    } catch (e) {
      this.exception(e);
    }
  },

  exception: function exception() {}
};

// 时间
var clock = exports.clock = function clock(express) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var setter = (typeof date === 'undefined' ? 'undefined' : (0, _typeof3.default)(date)) === 'object' && date !== null ? date.year + '/' + date.month + '/' + date.day : date;
  var timer = typeof setter === 'number' || typeof setter === 'string' ? new Date(setter) : new Date();
  var YYYY = timer.getFullYear();
  var M = timer.getMonth() + 1;
  var D = timer.getDate();
  var dateExporess = express;
  dateExporess = dateExporess.replace(/YYYY/g, YYYY);
  dateExporess = dateExporess.replace(/YY/g, YYYY.toString().substr(2, 4));
  dateExporess = dateExporess.replace(/MM/g, M < 10 ? '0' + M : M);
  dateExporess = dateExporess.replace(/M/g, M);
  dateExporess = dateExporess.replace(/DD/g, D < 10 ? '0' + D : D);
  dateExporess = dateExporess.replace(/D/g, D < 10 ? '0' + D : D);
  return dateExporess;
};

// 单层对象属性值的字符转换
var objectValueString = exports.objectValueString = function charsetChange(obj) {
  var target = obj;
  if ((typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) !== 'object') return obj;
  (0, _entries2.default)(target).map(function (kv) {
    var _kv = (0, _slicedToArray3.default)(kv, 2),
        k = _kv[0],
        v = _kv[1];

    target[k] = typeof v === 'number' ? v.toString() : v;
    return kv;
  });
  return target;
};

// 首字母大写
var firstLetterUppercase = exports.firstLetterUppercase = function firstLetterUppercase(word) {
  if (typeof word !== 'string') return word;
  var firstLetter = word.charAt(0);
  return '' + firstLetter.toUpperCase() + word.substr(1, word.length);
};

// 判断变量是否为空值
var hasEmpty = exports.hasEmpty = function hasEmpty(word) {
  return word === '' || word === null || word === 'null' || (0, _stringify2.default)(word) === '{}' || (0, _stringify2.default)(word) === '[]' || typeof word === 'undefined';
};

// 驼峰替换
var humpChangeTo = exports.humpChangeTo = function humpChangeTo(word, separator) {
  var newWord = [];
  for (var i = 0; i < word.length; i += 1) {
    var letter = word[i];
    newWord.push(/[A-Z]/g.test(letter) ? '' + separator + letter.toLowerCase() : letter);
  }
  return newWord.join('');
};

/**
 * 用于转换remote-drives的access格式。
 * payload是用于校验API的参数，
 * payload必须被定义，payload未被定义的参数不会被接入。
 * 比如有3个参数，payload仅定义了argus1,argus2,
 * 那么argus3在实际传参中不会被服务器获得。
 *  payload需定义默认值。
 */
var remoteApdaterFormater = exports.remoteApdaterFormater = function remoteApdaterFormater(maps) {
  var apiMap = [];
  var apiPayload = [];

  (0, _entries2.default)(maps).map(function (api) {
    var _api = (0, _slicedToArray3.default)(api, 2),
        desc = _api[1];

    apiMap.push(desc.info);
    apiPayload.push(desc.payload);
    return api;
  });

  return {
    list: apiMap,
    payloads: apiPayload
  };
};

/**
* domain：使用代理时，请不要填写Domain。（暂时）
* access：API的映射表。
* fakeDelayTime：虚拟数据的延时获得，用于仿造访问远程时的情景。
*  fake: 是否接入虚假数据, 假设并没有定义fake的数据时，则默认接入真实接口。
* adapterMecha: 用于置换数据，预定义请求体, 方法别名，增加Promise的支持等等。
*  mecha用于支持remote-drives在HTTP协议规范上的情景处理。
*/
var defineRemoteAdapter = exports.defineRemoteAdapter = function defineRemoteAdapter(_ref) {
  var config = _ref.config,
      maps = _ref.maps,
      sendBefore = _ref.sendBefore,
      onBuildPayload = _ref.onBuildPayload,
      onBuildHeaders = _ref.onBuildHeaders,
      replaceSender = _ref.replaceSender;

  var apiMaps = remoteApdaterFormater(maps);
  var api = (0, _remoteDrives2.default)({
    domain: config.domain,
    access: apiMaps.list.map(function (api) {
      return (0, _assign2.default)(api, {
        fake: !config.hasFake ? null : config.fakeBaseDataStruct(api.fake)
      });
    }),
    fakeDelayTime: config.fakeDelay,
    onBuildPayload: onBuildPayload,
    onBuildHeaders: onBuildHeaders,
    replaceSender: replaceSender
  });

  var adapterMecha = new _mecha2.default(api);

  // 预定义请求体。
  apiMaps.payloads.map(function (payload) {
    adapterMecha.definePayload(payload.name, payload.origin, payload.alias);
    return payload;
  });

  // 可用于请求前，变更payload的内容。
  // 这里主要处理用户数据在各类API间的切入。
  adapterMecha.defineRequestBefore(function (payload) {
    return (0, _assign2.default)(payload, sendBefore(payload));
  });

  return adapterMecha.init();
};

// scroller的分页用法支持
var ScrollerPaging = exports.ScrollerPaging = function ScrollerPaging(scroller) {
  this.data = {};
  this.currentPage = null;
  this.onChange = function (scroller, callback) {
    var _this = this;

    if (this.currentPage !== scroller.nextPage || scroller.isRefresh) {
      this.currentPage = scroller.nextPage;
      if (callback) callback(function (params) {
        return _this.getter(params);
      }, function (data) {
        return _this.setter(_this.currentPage, data);
      }, scroller);
    }
  }, this.setter = function (page, data) {
    this.data[page] = (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object' && data instanceof Array ? data : [];
  };
  this.getter = function (scroller) {
    var data = this.data;

    var allData = [];
    (0, _entries2.default)(data).map(function (kv) {
      var _kv2 = (0, _slicedToArray3.default)(kv, 2),
          v = _kv2[1];

      allData = allData.concat(v);
      return kv;
    });
    return !scroller ? allData : data[scroller.page];
  };
};

var fileToBase64 = exports.fileToBase64 = function fileToBase64(file, callback) {
  var base64 = new FileReader();
  base64.onloadend = function () {
    callback && callback(base64.result);
  };
  base64.readAsDataURL(file);
};

// 图片比例压缩
var imageScaleExpress = exports.imageScaleExpress = function imageScaleExpress(image, express, callback) {
  function expressImage(image) {
    var canvas = document.createElement('canvas');
    var width = image.naturalWidth * (image.naturalWidth > 1200 ? express : 1);
    var height = image.naturalHeight * (image.naturalWidth > 1200 ? express : 1);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
    callback && callback(canvas.toDataURL());
  }

  function createImage(image) {
    var img = new Image();
    img.src = image;
    img.onload = function (e) {
      expressImage(img);
    };
  }

  if (image instanceof File || image.toString().indexOf('File') >= 0) {
    fileToBase64(image, function (fileBase64) {
      return createImage(fileBase64);
    });
  } else if (typeof image === 'string') {
    createImage(image);
  } else {
    expressImage(image);
  }
};

exports.default = {
  animate: animate,
  storage: storage,
  clock: clock,
  firstLetterUppercase: firstLetterUppercase,
  fileToBase64: fileToBase64,
  humpChangeTo: humpChangeTo,
  hasEmpty: hasEmpty,
  objectValueString: objectValueString,
  remoteApdaterFormater: remoteApdaterFormater,
  ScrollerPaging: ScrollerPaging,
  defineRemoteAdapter: defineRemoteAdapter,
  imageScaleExpress: imageScaleExpress
};