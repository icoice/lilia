'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

    // 请求状态描述
    this.READY_STATE_MESSAGE = ['未发送', '已发送', '等待响应', '请求完成'];

    // request setting data
    this.setting = {
      api: null,
      origin: null,
      alias: null
    };
    this.logger = [];
    this.backRequestBefore = function (payload) {
      return payload;
    };
    this.requestErrorHandle = function () {};
    this.requestHandle = function () {};
    this.requestExceptionHandle = function () {};
    this.defineRequest(adapter);
  }

  // 初始化


  (0, _createClass3.default)(Mecha, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var setting = this.setting,
          ERROR_MESSAGE = this.ERROR_MESSAGE,
          backRequestBefore = this.backRequestBefore;
      var api = setting.api;

      var control = {
        // 请求内容发生错误时
        ON_REQUEST_ERROR: function ON_REQUEST_ERROR(callback) {
          _this.requestErrorHandle = callback;
        },
        // 请求完成后，发生异常时
        ON_REQUEST_EXCEPTION: function ON_REQUEST_EXCEPTION(callback) {
          _this.requestExceptionHandle = callback;
        },
        // 一般请求时
        ON_REQUEST: function ON_REQUEST(callback) {
          _this.requestHandle = callback;
        }
      };

      if (!api) return this.log('error', ERROR_MESSAGE[1004]);

      (0, _entries2.default)(api).map(function (access) {
        var _access = (0, _slicedToArray3.default)(access, 2),
            name = _access[0],
            method = _access[1];

        control[name] = function () {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var payload = params;

          if (!(params instanceof FormData)) {
            payload = _this.getRequestPayload(name, params);
            if (backRequestBefore) {
              payload = (0, _assign2.default)({}, backRequestBefore(payload));
            }
          }

          return method(payload).then(function (response) {
            if (!response.data) {
              _this.log('exception', '未获得服务器的响应数据');
            } else {
              _this.log('complete', '' + response.description, response.data);
            }
            return response;
          }).catch(function (e) {
            return _this.requsetException(e);
          });
        };
        return access;
      });

      return control;
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

    // axios的异常请求处理

  }, {
    key: 'requsetException',
    value: function requsetException(e) {
      var request = e.request,
          message = e.message;
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
      this.backRequestBefore = callback;
    }
  }]);
  return Mecha;
}();

exports.default = Mecha;