const methods = {
  setSelect() {
    const { m$Selected, m$Items } = this;
    if (m$Selected !== null) {
      this.$emit('updated', {
        code: m$Selected,
        data: m$Items[m$Selected],
      });
    }
  },
  selectRadio(code, data) {
    this.m$Selected = code;
    this.$emit('tap', { code, data });
  },
  hasSelected(code) {
    return this.m$Selected == code;
  },
};

export default {
  methods,
};
