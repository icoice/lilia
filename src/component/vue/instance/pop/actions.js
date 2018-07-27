const methods = {
  init() {
    if (!this.liliaHasInit) {
      this.liliaHasInit = true;
      window.addEventListener('click', (e) => {
        if (this.liliaHasInner) {
          this.liliaShow = false;
          this.liliaHasInner = false;
          this.$emit('change', this.liliaShow);
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
    this.$emit('change', this.liliaShow);
  },
};

export default {
  methods,
}
