'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$vue = exports.util = exports.drive = exports.component = undefined;

var _drive2 = require('./drive');

var _drive3 = _interopRequireDefault(_drive2);

var _util2 = require('./util');

var _util3 = _interopRequireDefault(_util2);

var _vue2 = require('./component/vue');

var _vue3 = _interopRequireDefault(_vue2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = exports.component = _vue3.default;
var drive = exports.drive = _drive3.default;
var util = exports.util = _util3.default;

var $vue = exports.$vue = {
  state: function state(n, d) {
    return drive.Vue.state(n, d);
  },
  store: function store(v, c) {
    return drive.Vue.store.create(v, c);
  },
  getters: function getters(n) {
    return drive.Vue.store.getterAll(n);
  },
  actions: function actions(n) {
    return drive.Vue.store.actions(n);
  }
};

exports.default = {
  component: component,
  drive: drive,
  util: util,
  $vue: $vue
};