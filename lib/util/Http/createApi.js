'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (method, name) {
  var conf = {
    name: name,
    method: method,
    path: '',
    origin: {},
    alias: {},
    fake: null
  };

  return {
    config: conf,
    fake: function fake(data) {
      conf.fake = !data[conf.name] ? data : data[conf.name];
      return this;
    },
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