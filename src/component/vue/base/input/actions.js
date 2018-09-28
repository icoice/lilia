const methods = {
  // 获得值
  getValue() {
    const { m$hasKey, m$Val } = this;
    return !m$hasKey ? m$Val : { [m$hasKey]: m$Val };
  },
  // 内容输入事件
  setInput(e) {
    this.m$Val = e.target.value;
    this.$emit('input', this.getValue());
  },
  // 内容发生变换事件
  setChange(e) {
    this.m$Val = e.target.value;
    this.$emit('change', this.getValue());
  },
  // 获得焦点事件
  setFocus() {
    this.$emit('focus', this.getValue());
    this.m$HasClearNow = false;
  },
  // 取消焦点事件
  setBlur(e) {
    if (!this.m$HasClearNow) {
      this.$emit('blur', this.getValue());
    } else {
      this.m$HasClearNow = false;
    }
  },
  // 是否显示清除内容按钮
  showClear(val) {
    return this.hasClear && val && val !== '' && !this.m$Disabled;
  },
  // 清除输入内容
  clear() {
    this.m$HasClearNow = true;
    this.m$Val = '';
    this.verifyValue();
    this.$emit('clear', this.getValue());
  },
  // 过滤输入的值
  verifyValue(e = {}) {
    const { m$Verify, m$Filter, m$Val } = this;
    const { regExp } = m$Verify;

    if (e.target) this.m$Val = e.target.value;
    if (m$Filter !== null) this.m$Val = this.m$Val.replace(m$Filter, '');

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

    this.$emit('keyup', this.getValue());
  },
};

export default {
  methods,
}
