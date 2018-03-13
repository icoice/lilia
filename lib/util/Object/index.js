'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _pile = require('./pile');

var _pile2 = _interopRequireDefault(_pile);

var _rename = require('./rename');

var _rename2 = _interopRequireDefault(_rename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  clone: _clone2.default,
  pile: _pile2.default,
  rename: _rename2.default
};