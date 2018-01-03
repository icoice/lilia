'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = function (setting) {
  var access = setting.access;

  _imaginationAdapter2.default.accross('onExecuteBefore', function (next) {
    return next();
  });
  _imaginationAdapter2.default.accross('onExecuteAfter', function (next) {
    return next();
  });
  setting.access = access.map(function (api) {
    var fake = api.fake;

    api.fake = fake !== null ? setAxiosResponse(fake) : fake;
    return (0, _assign2.default)({}, api);
  });
  return new _imaginationAdapter2.default(new _Http2.default(setting));
};

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _imaginationAdapter = require('imagination-adapter');

var _imaginationAdapter2 = _interopRequireDefault(_imaginationAdapter);

var _Http = require('./Http');

var _Http2 = _interopRequireDefault(_Http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置伪响应格式，对应axios
var setAxiosResponse = function setAxiosResponse(fake) {
  return {
    config: {},
    status: 200,
    statusText: 'ok',
    data: (0, _assign2.default)({}, fake),
    headers: {},
    request: {},
    HOW: {} };
};