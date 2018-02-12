'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (method, name) {
  var _conf;

  var conf = (_conf = {
    name: name,
    method: method,
    path: ''
  }, (0, _defineProperty3.default)(_conf, 'method', 'GET'), (0, _defineProperty3.default)(_conf, 'origin', {}), (0, _defineProperty3.default)(_conf, 'alias', {}), (0, _defineProperty3.default)(_conf, 'fake', null), _conf);

  return {
    config: conf,
    path: function path(link) {
      conf.path = link;
      return this;
    },
    payload: function payload() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var alias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      keys.map(function (k, code) {
        conf.origin[k] = def;
        if (alias[code]) conf.alias[k] = alias[code];
      });
      return this;
    }
  };
};