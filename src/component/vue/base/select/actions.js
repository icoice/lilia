const methods = {
  iconChange() {
    return this.listOpen ? 'icon-arrowup' : 'icon-arrowdown';
  },
  selectDefaultChange() {
    return this.listOpen ? 'list-open' : 'list-close';
  },
  hasMoveOnSelect() {
    this.isMoveOver = 1;
  },
  hasMouseLeave() {
    this.isMoveOver = 0;
  },
  bindMouseMenus() {
    if (!this.isBindMouseMenus) {
      window.addEventListener('click', () => {
        if (!this.isMoveOver) this.listOpen = false;
      }, true);
      this.isBindMouseMenus = true;
    }
  },
  openlist() {
    this.listOpen = !this.listOpen;
    this.$emit('open', this.openlist);
  },
  selectOption(item) {
    this.selected = item;
    this.listOpen = !this.listOpen;
    this.$emit('change', this.selected);
  },
};

export default {
  methods,
};
