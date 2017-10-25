'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = function (setting) {
  var newSetting = (0, _assign2.default)({}, setting);
  var access = setting.access;

  _imaginationAdapter2.default.accross('onExecuteBefore', function (next) {
    return next();
  });
  _imaginationAdapter2.default.accross('onExecuteAfter', function (next) {
    return next();
  });

  setting.access = setting.access.map(function (api) {
    var newApi = (0, _assign2.default)({}, api);
    newApi.fake = api.fake !== null && typeof api.fake === 'Object' ? {
      config: {},
      headers: {},
      request: {},
      status: 200,
      statusText: 'ok',
      data: (0, _assign2.default)({}, api.fake)
    } : api.fake;
    return newApi;
  });

  return new _imaginationAdapter2.default(new Remote(setting));
};

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _imaginationAdapter = require('imagination-adapter');

var _imaginationAdapter2 = _interopRequireDefault(_imaginationAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  API 一级调用封装
 *  <属性>
 *  fakeDelayTime: 用于控制伪造数据的返回时间
 *  domain: 访问的域名
 *  access: 接口列定义
 *  注：目前规范上不允许POST请求携带QUERY参数。
 */
var Remote = function () {
  function Remote() {
    var setting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Remote);
    var fakeDelayTime = setting.fakeDelayTime;

    return this.setters(setting);
  }
  // 配置Remote实例


  (0, _createClass3.default)(Remote, [{
    key: 'setters',
    value: function setters() {
      var setting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var domain = setting.domain,
          access = setting.access,
          fakeDelayTime = setting.fakeDelayTime;

      this.fakeDelayTime = fakeDelayTime ? fakeDelayTime : 1000;
      this.domain = domain ? domain : '';
      this.access = access ? access : [];
      return this.register();
    }
    // 注册Remote实例方法

  }, {
    key: 'register',
    value: function register() {
      var access = this.access,
          domain = this.domain,
          fakeDelayTime = this.fakeDelayTime;

      var apiList = {};

      access.map(function (item) {
        var name = item.name,
            method = item.method,
            path = item.path,
            fake = item.fake;

        apiList[name] = function () {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          // 1、实时传参
          // 2、payload的默认定义
          // 1存在未被定义的内容，那么使用2。
          var requestMethod = params.remoteMethod || method;
          var requestData = params.remoteData || params;

          if (fake === null) {
            var headers = {
              'Content-Type': requestData instanceof FormData ? 'multipart/form-data' : 'application/json'
            };
            var axiosSetting = {
              url: '' + domain + path,
              method: requestMethod,
              params: {},
              data: {},
              headers: headers
            };
            switch (requestMethod) {
              case 'POST':
                axiosSetting.data = requestData;
                break;
              default:
                axiosSetting.params = requestData;
            }
            console.log(axiosSetting);
            return (0, _axios2.default)(axiosSetting);
          }

          return new _promise2.default(function (resolve) {
            return setTimeout(function () {
              return resolve(fake);
            }, fakeDelayTime);
          });
        };
        return item;
      });

      return apiList;
    }
  }]);
  return Remote;
}();

// Adapter用于将特定数据转换为一级对象调用。next()会返回源数据方法的返回值，需要return