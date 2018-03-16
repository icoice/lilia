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

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _mecha = require('./mecha');

var _mecha2 = _interopRequireDefault(_mecha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = function (params) {
  var domain = params.domain,
      fake = params.fake;

  var hasFake = fake.open;
  var fakeDataStruct = fake.pack;
  var fakeDelay = fake.delay;
  var setPayload = params.setPayload;
  var setHeaders = params.setHeaders;
  var replaceSender = params.sender;

  var _formatMaps = formatMaps(params.access),
      list = _formatMaps.list,
      payloads = _formatMaps.payloads;

  var access = list.map(function (api) {
    return (0, _assign2.default)((0, _extends3.default)({}, api), {
      fake: !hasFake ? null : fakeDataStruct(api.fake)
    });
  });

  var apiParams = {
    domain: domain,
    access: access,
    setPayload: setPayload,
    setHeaders: setHeaders,
    replaceSender: replaceSender,
    fakeDelayTime: fakeDelay };

  var serve = (0, _create2.default)(apiParams);
  var mecha = new _mecha2.default(serve);
  payloads.map(function (payload) {
    var name = payload.name,
        origin = payload.origin,
        alias = payload.alias;

    mecha.definePayload(name, origin, alias);
    return payload;
  });

  mecha.defineRequestBefore(function (payload) {
    if (typeof params.sendBefore === 'function') {
      return (0, _assign2.default)(payload, params.sendBefore(payload));
    }
    return payload;
  });

  return mecha.init();
};