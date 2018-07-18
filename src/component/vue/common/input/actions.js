const methods = {
  showClear(val) {
    return this.hasClear && val && val !== '' && !this.m$Disabled;
  },
  getVal() {
    const { m$hasKey, m$Val } = this;
    return !m$hasKey ? m$Val : { [m$hasKey]: m$Val };
  },
  verifyVal(e = {}) {
    const { m$Verify, m$Filter, m$Val } = this;
    const { regExp } = m$Verify;

    if (e.target) this.m$Val = e.target.value;

    if (m$Filter !== null) {
      this.m$Val = this.m$Val.replace(m$Filter, '');
    }

    if (this.m$IsNoEmpty && this.value === '') {
      this.$emit('verify', false);
      this.m$HasEmptry = true;
    } else if (regExp instanceof RegExp && this.m$Val !== '') {
      const verifyRes = !regExp.test(this.m$Val);

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
  setInput() {
    this.$emit('input', this.getVal());
  },
  setChange() {
    this.$emit('change', this.getVal());
  },
  setFocus() {
    this.$emit('focus', this.getVal());
    this.m$HasClearNow = false;
  },
  setBlur(e) {
    if (!this.m$HasClearNow) {
      this.$emit('blur', this.getVal());
    } else {``
      this.m$HasClearNow = false;
      if(e.target) e.target.focus();
    }
  },
  clear() {
    this.m$HasClearNow = true;
    this.m$Val = '';
    this.verifyVal();
    this.$emit('clear', this.getVal());
  },
};

export default {
  methods,
}
