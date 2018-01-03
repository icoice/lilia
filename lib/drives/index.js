'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _adapter = require('./http/adapter');

var _adapter2 = _interopRequireDefault(_adapter);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _vuex = require('./vuex');

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  vuex: _vuex2.default,
  http: _http2.default,
  router: _router2.default,
  httpApater: _adapter2.default
};