const methods = {
  init() {
    if (!this.liliaHasInit) {
      this.liliaHasInit = true;
      window.addEventListener('click', (e) => {
        if (this.liliaHasInner) {
          this.liliaShow = false;
          this.liliaHasInner = false;
        }
      }, true);
    }
  },
  inner() {
    this.liliaHasInner = true;
  },
  clearInner() {
    this.liliaHasInner = false;
  },
  showPop() {
    this.liliaShow = !this.liliaShow;
    this.$emit('change');
  },
};

export default {
  methods,
}
