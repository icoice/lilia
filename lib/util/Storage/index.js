'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _memory = require('./memory');

var _memory2 = _interopRequireDefault(_memory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  local: _local2.default,
  memory: _memory2.default
};