'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _mecha = require('./mecha');

var _mecha2 = _interopRequireDefault(_mecha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* http、httpMecha的数据格式构造 */
var formatMaps = function formatMaps(maps) {
  var list = [];
  var payloads = [];

  (0, _entries2.default)(maps).map(function (link) {
    var _link = (0, _slicedToArray3.default)(link, 2),
        desc = _link[1];

    list.push({
      name: desc.name,
      method: desc.method,
      path: desc.path,
      fake: desc.fake
    });

    payloads.push({
      name: desc.name,
      origin: desc.origin,
      alias: desc.alias
    });

    return link;
  });

  return { list: list, payloads: payloads };
};

/* http、httpMecha的数据格式构造 */

exports.default = function (params) {
  var _params$config = params.config,
      domain = _params$config.domain,
      hasFake = _params$config.hasFake,
      fakeDataStruct = _params$config.fakeDataStruct,
      fakeDelay = _params$config.fakeDelay;
  var onBuildPayload = params.onBuildPayload,
      onBuildHeaders = params.onBuildHeaders,
      replaceSender = params.replaceSender,
      maps = params.maps;

  var _formatMaps = formatMaps(maps),
      list = _formatMaps.list,
      payloads = _formatMaps.payloads;

  var access = list.map(function (api) {
    return (0, _assign2.default)((0, _extends3.default)({}, api), {
      // fakeDataStruct 用于定义基础数据结构
      fake: !hasFake ? null : fakeDataStruct(api.fake)
    });
  });

  var apiParams = {
    fakeDelayTime: fakeDelay, // 模拟数据延迟时间
    domain: domain, // 常规域名
    access: access, // 接入映射
    onBuildPayload: onBuildPayload, // 当payload载入时
    onBuildHeaders: onBuildHeaders, // 当headers载入时
    replaceSender: replaceSender };

  var mecha = new _mecha2.default((0, _2.default)(apiParams)); // 针对http协议的夹层

  // 定义夹层的payload校验
  payloads.map(function (payload) {
    var name = payload.name,
        origin = payload.origin,
        alias = payload.alias;

    mecha.definePayload(name, origin, alias);
    return payload;
  });

  // 夹层发送请求前
  mecha.defineRequestBefore(function (payload) {
    (0, _assign2.default)(payload, params.sendBefore(payload));
  });

  // 初始化夹层
  return mecha.init();
};