'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasEmpty = require('./hasEmpty');

var _hasEmpty2 = _interopRequireDefault(_hasEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (val, defVal) {
  return (0, _hasEmpty2.default)(val) ? defVal : val;
};