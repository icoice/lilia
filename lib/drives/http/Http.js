'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var def = _utils2.default.def,
    hasPromise = _utils2.default.hasPromise;

var Http = function () {
  function Http() {
    var set = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Http);

    return this.init(set);
  }

  // 配置Http实例


  (0, _createClass3.default)(Http, [{
    key: 'init',
    value: function init(set) {
      this.access = def(set.access, []);
      this.domain = def(set.domian, '');
      this.fakeDelay = def(set.fakeDelay, 1000);
      this.setHeaders = def(set.setHeaders, function (params) {
        return params;
      });
      this.setPayload = def(set.setPayload, function (params) {
        return params;
      });
      this.sender = def(set.sender, null);
      this.METHOD = '_HRM';
      this.QUERY = '_HRQ';
      this.BODY = '_HRB';
      return this.register();
    }

    // 注册Remote实例方法

  }, {
    key: 'register',
    value: function register() {
      var _this = this;

      var access = this.access;

      var list = {};
      access.map(function (item) {
        list[item.name] = _this.request(item);
        return item;
      });
      return list;
    }

    // 自动文本协议

  }, {
    key: 'autoContentType',
    value: function autoContentType(data) {
      if (data instanceof FormData) return 'multipart/form-data';
      if (typeof data === 'Object' && data !== null) return 'application/json';
      return 'text/plain';
    }

    // 创建axios的payload

  }, {
    key: 'createPayload',
    value: function createPayload(path, method, query, body, data) {
      var headers = {
        'Content-Type': this.autoContentType(data)
      };
      return this.setPayload({
        url: '' + this.domain + path,
        method: method,
        headers: this.setHeaders(headers),
        params: (0, _assign2.default)({}, query, method === 'POST' ? {} : data),
        data: (0, _assign2.default)({}, body, method !== 'POST' ? {} : data)
      });
    }

    // 请求

  }, {
    key: 'request',
    value: function request(item) {
      var _this2 = this;

      var sender = this.sender,
          fakeDelay = this.fakeDelay,
          METHOD = this.METHOD,
          QUERY = this.QUERY,
          BODY = this.BODY;
      var name = item.name,
          method = item.method,
          path = item.path,
          fake = item.fake;


      console.log(item);

      return function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var reqMethod = params[METHOD] || method;
        delete params[METHOD];
        var reqQuery = params[QUERY] || {};
        delete params[QUERY];
        var reqBody = params[BODY] || {};
        delete params[BODY];
        var payload = _this2.createPayload(path, reqMethod, reqQuery, reqBody, params);

        var req = function req(pl) {
          if (fake !== null) {
            return new _promise2.default(function (resolve) {
              setTimeout(function () {
                return resolve(fake);
              }, fakeDelay);
            });
          }
          return !sender ? (0, _axios2.default)(pl) : sender(pl);
        };

        // 假设payload返回的是一个promise
        if (payload && hasPromise(payload)) {
          return payload.then(function (set) {
            return req(set);
          });
        } else {
          return req(payload);
        }
      };
    }
  }]);
  return Http;
}();

exports.default = Http;