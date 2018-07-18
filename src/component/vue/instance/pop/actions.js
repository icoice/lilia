const methods = {
  init() {
    if (!this.mooHasInit) {
      this.mooHasInit = true;
      window.addEventListener('click', (e) => {
        if (this.mooHasInner) {
          this.mooShow = false;
          this.mooHasInner = false;
        }
      }, true);
    }
  },
  inner() {
    this.mooHasInner = true;
  },
  clearInner() {
    this.mooHasInner = false;
  },
  showPop() {
    this.mooShow = !this.mooShow;
    this.$emit('change');
  },
};

export default {
  methods,
}
