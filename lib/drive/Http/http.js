'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _util = require('../../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _util$Assert = _util2.default.Assert,
    def = _util$Assert.def,
    hasPromise = _util$Assert.hasPromise;

var Http = function () {
  function Http() {
    var set = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Http);

    return this.init(set);
  }

  (0, _createClass3.default)(Http, [{
    key: 'init',
    value: function init(set) {
      this.access = def(set.access, []);
      this.domain = def(set.domain, '');
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
  }, {
    key: 'autoContentType',
    value: function autoContentType(data) {
      if (data instanceof FormData) return 'multipart/form-data';
      if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object' && data !== null) return 'application/json';
      return 'text/plain';
    }
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
  }, {
    key: 'request',
    value: function request(item) {
      var _this2 = this;

      var sender = this.sender,
          fakeDelay = this.fakeDelay;
      var METHOD = this.METHOD,
          QUERY = this.QUERY,
          BODY = this.BODY;
      var name = item.name,
          method = item.method,
          path = item.path,
          fake = item.fake;


      return function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var rm = params[METHOD] || method;
        var rq = params[QUERY] || {};
        var rb = params[BODY] || {};

        delete params[METHOD];
        delete params[QUERY];
        delete params[BODY];

        var payload = _this2.createPayload(path, rm, rq, rb, params);

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

        return payload && hasPromise(payload) ? payload.then(function (set) {
          return req(set);
        }) : req(payload);
      };
    }
  }]);
  return Http;
}();

exports.default = Http;