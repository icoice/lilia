'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Http = require('./Http');

var _Http2 = _interopRequireDefault(_Http);

var _Vue2 = require('./Vue');

var _Vue3 = _interopRequireDefault(_Vue2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$drive = {
  Http: _Http2.default,
  Vue: _Vue3.default
};

exports.default = window.$drive;