const util = window.$mooUtil;

const methods = {
  tap(code, item) {
    const newSelected = [];
    let selected = this.m$Selected;

    if (this.m$Selected.indexOf(code) < 0) {
      this.m$Selected.push(code);
      selected = Object.assign([], this.m$Selected);
    } else {
      this.m$Selected.map((boxCode) => {
        if(boxCode !== code) {
          newSelected.push(boxCode);
        }
      });
      selected = newSelected;
      this.m$Selected = newSelected;
    }

    this.$emit('tap', selected);
  },
  btnSelected(code, item) {
    const { m$Selected } = this;
    return m$Selected.indexOf(code) >= 0 || m$Selected.indexOf(item.key) >= 0;
  },
};

export default {
  methods,
}
