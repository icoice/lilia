'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _createApi = require('./createApi');

var _createApi2 = _interopRequireDefault(_createApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpMethods = ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'HEADER'];
var httpMethodCreator = {};

httpMethods.map(function (method) {
  httpMethodCreator[method] = function (name) {
    var api = (0, _createApi2.default)(method, name);
    this.config.access[name] = api.config;
    return api;
  };
});

exports.default = (0, _extends3.default)({
  config: {
    domain: '',
    access: {},
    fake: {
      open: false,
      delay: 300,
      pack: function pack(data) {
        return data;
      } },
    sendBefore: function sendBefore() {
      return {};
    },
    setPayload: function setPayload(payload) {
      return payload;
    },
    setHeaders: function setHeaders(headers) {
      return headers;
    },
    sender: function sender(payload) {
      return payload;
    } },
  ORERR: function ORERR() {},
  OREXCEP: function OREXCEP() {},
  OR: function OR() {},
  onRequestError: function onRequestError(callback) {
    this.ORERR = callback;
  },
  onRequestException: function onRequestException(callback) {
    this.OREXCEP = callback;
  },
  onRequest: function onRequest(callback) {
    this.OR = callback;
  },
  bindPublicEvent: function bindPublicEvent(serves) {
    var _this = this;

    serves.map(function (serve) {
      serve.ON_REQUEST_ERROR(_this.ORERR);
      serve.ON_REQUEST_EXCEPTION(_this.ORERR);
      serve.ON_REQUEST(_this.OR);
    });
  },
  domain: function domain(host) {
    this.config.domain = host;
  },
  before: function before(callback) {
    this.config.sendBefore = callback;
  },
  payload: function payload(callback) {
    this.config.setPayload = callback;
  },
  header: function header(callback) {
    this.config.setHeaders = callback;
  },
  fake: function fake(has) {
    var config = this.config;

    config.fake.open = has;
    return {
      delay: function delay(msec) {
        config.fake.delay = msec;
        return this;
      },
      pack: function pack(callback) {
        config.fake.pack = callback;
        return this;
      }
    };
  },
  sender: function sender(callback) {
    this.config.setHeaders = callback;
  }
}, httpMethodCreator);