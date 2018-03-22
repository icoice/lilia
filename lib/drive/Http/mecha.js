'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mecha = function () {
  function Mecha(adapter) {
    (0, _classCallCheck3.default)(this, Mecha);

    this.ERROR_MESSAGE = {
      1000: '未定义该API接口',
      1001: '未定义接口的别名payload',
      1002: '未定义接口服务的payload',
      1003: '未设定该组接口的payload',
      1004: '未指定一组接口定义'
    };

    this.READY_STATE_MESSAGE = ['未发送', '已发送', '等待响应', '请求完成'];
    this.setting = {
      api: null,
      origin: null,
      alias: null };
    this.logger = [];
    this.sendRecords = {};
    this.sendId = 0;
    this.requestErrorHandle = function () {};
    this.requestHandle = function () {};
    this.requestExceptionHandle = function () {};
    this.requestBeforeProcess = function (payload) {
      return payload;
    };
    this.defineRequest(adapter);
  }

  (0, _createClass3.default)(Mecha, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var ERROR_MESSAGE = this.ERROR_MESSAGE,
          setting = this.setting,
          sendRecords = this.sendRecords,
          requestBeforeProcess = this.requestBeforeProcess;
      var api = setting.api;

      var adapter = {};

      if (!api) return this.log('error', ERROR_MESSAGE[1004]);

      adapter.ON_REQUEST_ERROR = function (callback) {
        _this.requestErrorHandle = callback;
      };
      adapter.ON_REQUEST_EXCEPTION = function (callback) {
        _this.requestExceptionHandle = callback;
      };
      adapter.ON_REQUEST = function (callback) {
        _this.requestHandle = callback;
      };

      var list = (0, _entries2.default)(api);

      var request = function request(params) {
        var n = params.n,
            id = params.id,
            method = params.method,
            payload = params.payload;


        return method(payload).then(function (response) {
          var description = response.description,
              data = response.data;

          if (!data) {
            _this.log('exception', '未获得服务器的响应数据');
          } else {
            if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object' && data !== null) data.HOW = (0, _assign2.default)({ id: id }, sendRecords[n][id]);
            _this.log('complete', '' + description, data);
          }
          delete sendRecords[n][id];
          return response;
        }).catch(function (e) {
          delete sendRecords[n][id];
          _this.requsetException(e);
        });
      };

      list.map(function (access) {
        var _access = (0, _slicedToArray3.default)(access, 2),
            n = _access[0],
            method = _access[1];

        adapter[n] = typeof method === 'function' ? function () {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          _this.sendId += 1;
          var id = _this.sendId;
          var payload = params;
          sendRecords[n] = !sendRecords[n] ? {} : sendRecords[n];
          sendRecords[n][id] = { REJECT_RESPONSE: false };
          if (!(params instanceof FormData)) {
            payload = _this.getRequestPayload(n, params);
            if (requestBeforeProcess) {
              payload = (0, _assign2.default)({}, requestBeforeProcess(payload, method));
            }
          }
          return request({ n: n, id: id, method: method, payload: payload });
        } : method;
        return access;
      });

      adapter.rejectResponse = function (name) {
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var sendRecords = _this.sendRecords;

        var ids = sendRecords[name];

        if (!ids) return;

        if (ids[id]) {
          ids[id].REJECT_RESPONSE = true;
          return;
        }

        (0, _entries2.default)(ids).map(function (kv) {
          var _kv = (0, _slicedToArray3.default)(kv, 2),
              id = _kv[0],
              config = _kv[1];

          config.REJECT_RESPONSE = true;
          return kv;
        });
      };

      return adapter;
    }
  }, {
    key: 'log',
    value: function log(type, description) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var record = {
        type: type,
        description: description,
        origin: data,
        time: Date.now()
      };
      switch (type) {
        case 'error':
          this.requestErrorHandle(record);
          throw description;
        case 'exception':
          this.requestExceptionHandle(record);
          throw description;
        default:
          this.requestHandle(record);
      }
      this.logger.push(record);
    }
  }, {
    key: 'requsetException',
    value: function requsetException(e) {
      var message = typeof e === 'string' ? e : e.message;
      var request = e.request;
      var READY_STATE_MESSAGE = this.READY_STATE_MESSAGE;

      var defaultMessage = !message ? '程序存在异常，无法完成请求' : message;
      var infos = {
        description: !request ? '' : READY_STATE_MESSAGE[request.readyState - 1],
        statusText: !request || request.statusText === '' ? defaultMessage : request.statusText,
        status: !request ? '' : request.status
      };
      var status = typeof infos.status === 'undefined' ? '' : '[' + infos.status + '] ';
      var statusTxt = infos.statusText !== '' && typeof infos.statusText === 'string' ? infos.description + ',' : infos.description;
      var logInfo = '' + status + statusTxt + infos.statusText;
      this.log('exception', logInfo);
      return infos;
    }
  }, {
    key: 'recoverPayload',
    value: function recoverPayload(type, origin, alias) {
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var payload = {};
      (0, _entries2.default)(origin).map(function (item) {
        var _item = (0, _slicedToArray3.default)(item, 2),
            key = _item[0],
            val = _item[1];

        var aliasKey = !alias[key] ? key : alias[key];
        var typeKey = { origin: key, alias: aliasKey }[type];
        payload[typeKey] = aliasKey in data ? data[aliasKey] : val;
        return item;
      });
      return payload;
    }
  }, {
    key: 'definePayload',
    value: function definePayload(key, origin, alias) {
      var setting = this.setting;

      if (!setting.origin) setting.origin = {};
      if (!setting.alias) setting.alias = {};
      setting.origin[key] = origin;
      setting.alias[key] = alias;
    }
  }, {
    key: 'getRequestPayload',
    value: function getRequestPayload(key, params) {
      var setting = this.setting,
          ERROR_MESSAGE = this.ERROR_MESSAGE;
      var origin = setting.origin,
          alias = setting.alias;

      if (!setting.origin && !setting.alias) return this.log('error', ERROR_MESSAGE[1003]);
      if (!origin[key]) return this.log('error', ERROR_MESSAGE[1002]);
      if (!alias[key]) return this.log('error', ERROR_MESSAGE[1001]);
      return this.recoverPayload('origin', origin[key], alias[key], params);
    }
  }, {
    key: 'defineRequest',
    value: function defineRequest() {
      var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.setting.api = request;
    }
  }, {
    key: 'defineRequestBefore',
    value: function defineRequestBefore(callback) {
      this.requestBeforeProcess = callback;
    }
  }]);
  return Mecha;
}();

exports.default = Mecha;