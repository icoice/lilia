'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (method, name) {
  return {
    config: {
      alias: {},
      method: method,
      name: name,
      origin: {},
      path: '',
      fake: null
    },
    payload: function payload() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var alias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var config = this.config;

      keys.map(function (k, code) {
        config.origin[k] = def;
        if (alias[code]) config.alias[k] = alias[code];
      });
      return this;
    },
    path: function path(link) {
      var config = this.config;

      config.path = link;
      return this;
    },
    fake: function fake(data) {
      var config = this.config;

      config.fake = !data[config.name] ? data : data[config.name];
      return this;
    }
  };
};