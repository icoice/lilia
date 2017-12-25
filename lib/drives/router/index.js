'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

exports.default = function (Vue, config, components) {
  var home = config.home;

  Vue.use(_vueRouter2.default);
  return new _vueRouter2.default({
    routes: (0, _entries2.default)(components).map(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          name = _ref2[0],
          component = _ref2[1];

      return {
        name: name === home ? 'home' : name,
        path: name === home ? '/' : '/' + (0, _utils.humpChangeTo)(name, '-'),
        component: component
      };
    })
  });
};

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }