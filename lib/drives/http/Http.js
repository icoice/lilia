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

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      this.access = (0, _utils.def)(set.access, []);
      this.domain = (0, _utils.def)(set.domian, '');
      this.fakeDelay = (0, _utils.def)(set.fakeDelay, 1000);
      this.setHeaders = (0, _utils.def)(set.setHeaders, function (params) {
        return params;
      });
      this.setPayload = (0, _utils.def)(set.setPayload, function (params) {
        return params;
      });
      this.sender = (0, _utils.def)(set.sender, null);
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
        list[name] = _this.request(item);
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
      this.setPayload({
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


      return function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var reqMethods = params[METHOD] || method;
        delete params[METHOD];
        var reqQuery = params[QUERY] || {};
        delete params[QUERY];
        var reqBody = params[BODY] || {};
        delete params[BODY];
        var payload = _this2.createPayload(path, reqMethods, reqQuery, reqBody, params);

        var req = function req(pl) {
          if (fake !== null) {
            return new _promise2.default(function (resolve) {
              setTimeout(function () {
                return resolve(fake);
              }, fakeDelay);
            });
          }
          return sender ? axios(pl) : sender(pl);
        };

        // 假设payload返回的是一个promise
        if (payload && (0, _utils.hasPromise)(payload)) {
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