'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {
  showClear: function showClear(val) {
    return this.hasClear && val && val !== '' && !this.m$Disabled;
  },
  getVal: function getVal() {
    var m$hasKey = this.m$hasKey,
        m$Val = this.m$Val;

    return !m$hasKey ? m$Val : (0, _defineProperty3.default)({}, m$hasKey, m$Val);
  },
  verifyVal: function verifyVal() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var m$Verify = this.m$Verify,
        m$Filter = this.m$Filter,
        m$Val = this.m$Val;
    var regExp = m$Verify.regExp;


    if (e.target) this.m$Val = e.target.value;

    if (m$Filter !== null) {
      this.m$Val = this.m$Val.replace(m$Filter, '');
    }

    if (this.m$IsNoEmpty && this.value === '') {
      this.$emit('verify', false);
      this.m$HasEmptry = true;
    } else if (regExp instanceof RegExp && this.m$Val !== '') {
      var verifyRes = !regExp.test(this.m$Val);

      this.$emit('verify', !verifyRes);
      this.m$HasVerifyFail = verifyRes;
      this.m$HasEmptry = false;
    } else {
      this.m$HasVerifyFail = false;
      this.m$HasEmptry = false;
      this.$emit('verify', true);
    }

    this.$emit('keyup', this.getVal());
  },
  setInput: function setInput() {
    this.$emit('input', this.getVal());
  },
  setChange: function setChange() {
    this.$emit('change', this.getVal());
  },
  setFocus: function setFocus() {
    this.$emit('focus', this.getVal());
    this.m$HasClearNow = false;
  },
  setBlur: function setBlur(e) {
    if (!this.m$HasClearNow) {
      this.$emit('blur', this.getVal());
    } else {
      '';
      this.m$HasClearNow = false;
      if (e.target) e.target.focus();
    }
  },
  clear: function clear() {
    this.m$HasClearNow = true;
    this.m$Val = '';
    this.verifyVal();
    this.$emit('clear', this.getVal());
  }
};

exports.default = {
  methods: methods
};