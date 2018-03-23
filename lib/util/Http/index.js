'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpMethods = ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'HEADER'];
var httpMethodCreator = {};

httpMethods.map(function (method) {
  httpMethodCreator[method] = function (name) {
    var config = this.config;

    var i = (0, _api2.default)(method, name);
    config.access[name] = i.config;
    return i;
  };
});

exports.default = (0, _extends3.default)({
  ORERR: function ORERR() {},
  OREXCEP: function OREXCEP() {},
  OR: function OR() {},
  config: {
    fake: {
      delay: 300,
      open: false,
      pack: function pack(data) {
        return data;
      } },
    access: {},
    domain: '',
    sendBefore: function sendBefore() {
      return {};
    },
    setPayload: function setPayload(payload) {
      return payload;
    },
    setHeaders: function setHeaders(headers) {
      return headers;
    },
    sender: null },
  bindPublicEvent: function bindPublicEvent(serves) {
    var _this = this;

    serves.map(function (serve) {
      serve.ON_REQUEST_ERROR(_this.ORERR);
      serve.ON_REQUEST_EXCEPTION(_this.ORERR);
      serve.ON_REQUEST(_this.OR);
    });
  },
  onRequestError: function onRequestError(callback) {
    this.ORERR = callback;
  },
  onRequestException: function onRequestException(callback) {
    this.OREXCEP = callback;
  },
  onRequest: function onRequest(callback) {
    this.OR = callback;
  },
  domain: function domain(host) {
    var config = this.config;

    config.domain = host;
  },
  before: function before(callback) {
    var config = this.config;

    config.sendBefore = callback;
  },
  payload: function payload(callback) {
    var config = this.config;

    config.setPayload = callback;
  },
  header: function header(callback) {
    var config = this.config;

    config.setHeaders = callback;
  },
  sender: function sender(callback) {
    var config = this.config;

    config.sender = callback;
  },
  fake: function fake(has) {
    var fake = this.config.fake;

    fake.open = has;
    return {
      delay: function delay(msec) {
        fake.delay = msec;
        return this;
      },
      pack: function pack(callback) {
        fake.pack = callback;
        return this;
      }
    };
  }
}, httpMethodCreator);