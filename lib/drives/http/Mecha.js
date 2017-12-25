'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

    // 错误信息
    this.ERROR_MESSAGE = {
      1000: '未定义该API接口',
      1001: '未定义接口的别名payload',
      1002: '未定义接口服务的payload',
      1003: '未设定该组接口的payload',
      1004: '未指定一组接口定义'
    };
    // http协议请求状态
    this.READY_STATE_MESSAGE = ['未发送', '已发送', '等待响应', '请求完成'];
    this.setting = {
      api: null, // API映射存放
      origin: null, // API payload的源定义
      alias: null };
    this.logger = [];
    this.sendRecords = {}; // 当前接口发送记录
    this.sendId = 0; // 发送id
    this.requestErrorHandle = function () {}; // 请求时发生错误的后续处理
    this.requestHandle = function () {}; // 请求完成的后续处理
    this.requestExceptionHandle = function () {}; // 请求时发生异常的后续处理
    this.requestBeforeProcess = function (payload) {
      return payload;
    }; // 请求前处理
    this.defineRequest(adapter); // 定义请求内容
  }

  // 初始化


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

      // 夹层的异常处理
      adapter.ON_REQUEST_ERROR = function (callback) {
        _this.requestErrorHandle = callback;
      };
      adapter.ON_REQUEST_EXCEPTION = function (callback) {
        _this.requestErrorHandle = callback;
      };
      adapter.ON_REQUEST = function (callback) {
        _this.requestErrorHandle = callback;
      };

      // 接口列
      var list = (0, _entries2.default)(api);

      // 方法请求
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
            data.HOW = (0, _assign2.default)({ id: id }, sendRecords[n][id]);
            _this.log('complete', '' + description, data);
          }
          delete sendRecords[n][id]; // 拒绝响应的措施, 解决无法abort的问题。
          return response;
        }).catch(function (e) {
          delete sendRecords[n][id];
          _this.requsetException(e);
        });
      };

      // 创建接口
      list.map(function (access) {
        var _access = (0, _slicedToArray3.default)(access, 2),
            n = _access[0],
            method = _access[1];

        adapter[n] = function () {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          _this.sendId += 1;
          var id = _this.sendId;
          var payload = params;
          sendRecords[n] = !sendRecords[n] ? {} : sendRecords[n];
          sendRecords[n][id] = { REJECT_RESPONSE: false };
          if (!(params instanceof FormData)) {
            payload = _this.getRequestPayload(name, params);
            if (requestBeforeProcess) {
              payload = (0, _assign2.default)({}, requestBeforeProcess(payload, method));
            }
          }
          dotMethod({ n: n, id: id, method: method, payload: payload });
        };

        return access;
      });

      // 拒绝响应
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

      return control;
    }

    // 日志

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

    // axios的异常请求处理

  }, {
    key: 'requsetException',
    value: function requsetException(e) {
      var message = typeof e === 'string' ? e : e.message;
      var request = e.request;
      var READY_STATE_MESSAGE = this.READY_STATE_MESSAGE;

      var defaultMessage = !message ? '程序存在异常，无法完成请求' : message;
      var infos = {
        description: !request ? '' : READY_STATE_MESSAGE[request.readyState - 1],
        statusText: !request ? defaultMessage : request.statusText,
        status: !request ? '' : request.status
      };
      var logInfo = '' + (infos.description !== '' ? infos.description + ',' : infos.description) + infos.statusText;
      this.log('exception', logInfo);
      return infos;
    }

    // 别名数据同步，同步别名数据到源数据，源数据同步到别名数据

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

    // 设置payload

  }, {
    key: 'definePayload',
    value: function definePayload(key, origin, alias) {
      var setting = this.setting;

      if (!setting.origin) setting.origin = {};
      if (!setting.alias) setting.alias = {};
      setting.origin[key] = origin;
      setting.alias[key] = alias;
    }

    // 获得payload

  }, {
    key: 'getRequestPayload',
    value: function getRequestPayload(key, params) {
      var setting = this.setting,
          ERROR_MESSAGE = this.ERROR_MESSAGE;
      var origin = setting.origin,
          alias = setting.alias;

      if (!setting.origin && !setting.alias) return this.log('error', ERROR_MESSAGE[1003]);
      if (!origin[key]) return this.log('error', ERROR_MESSAGE[1001]);
      if (!alias[key]) return this.log('error', ERROR_MESSAGE[1002]);
      return this.recoverPayload('origin', origin[key], alias[key], params);
    }

    // 设置请求对象

  }, {
    key: 'defineRequest',
    value: function defineRequest() {
      var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.setting.api = request;
    }

    // 设置请求前的处理

  }, {
    key: 'defineRequestBefore',
    value: function defineRequestBefore(callback) {
      this.requestBeforeProcess = callback;
    }
  }]);
  return Mecha;
}();

exports.default = Mecha;