'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

exports.default = vueState;

var _firstUppercase = require('./firstUppercase');

var _firstUppercase2 = _interopRequireDefault(_firstUppercase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function vueState(name, state) {
  var patch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var $props = {};
  var $watch = {};
  var $data = {};
  var props = patch.props,
      watch = patch.watch,
      _data = patch.data;


  (0, _entries2.default)(state).map(function (kv) {
    var _kv = (0, _slicedToArray3.default)(kv, 2),
        k = _kv[0],
        v = _kv[1];

    var dk = '' + name + (0, _firstUppercase2.default)(k);

    $props[k] = {
      type: v[0],
      default: (0, _typeof3.default)(v[1]) === 'object' ? function () {
        return v[1];
      } : v[1]
    };
    $watch[k] = function (val) {
      this[dk] = val;
    };
    $data[k] = v[1];

    return kv;
  });

  return {
    props: (0, _assign2.default)($props, props),
    watch: (0, _assign2.default)($watch, watch),
    data: function data() {
      var _this = this;

      var newData = {};

      (0, _entries2.default)($data).map(function (kv) {
        var _kv2 = (0, _slicedToArray3.default)(kv, 2),
            k = _kv2[0],
            v = _kv2[1];

        newData['' + name + (0, _firstUppercase2.default)(k)] = _this[k];
        return kv;
      });

      return (0, _assign2.default)(newData, _data);
    }
  };
}