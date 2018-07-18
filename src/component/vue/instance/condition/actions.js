const drive = window.$drive;
const util = window.$util;

export const methods = {
  allSelect(item) {
    item.value = [];
    item.items.map((v, code) => {
      item.value.push(code);
    });
    this.condList = util.Array.clone(this.condList);
  },
  bindMouseMenus() {
    if (!this.isBindMouseMenus) {
      window.addEventListener('click', () => {
        if (!this.isMoveOver) this.closeComponents();
      }, true);
      this.isBindMouseMenus = true;
    }
  },
  change(item, val) {
    const { condList } = this;
    const newItem = item;
    newItem.value = val;
    this.$emit('change', Object.assign([], condList));
  },
  closeDate(has) {
    this.hasDateOpen = has;
  },
  clearDate() {
    const { condList, dateTarget } = this;
    if (dateTarget) dateTarget.value = '';
    this.$emit('change', Object.assign([], condList));
  },
  changeDate(val) {
    const { condList, dateTarget } = this;
    const date = util.Date.toJSON(val);
    if (dateTarget) dateTarget.value = date;
    this.$emit('change', Object.assign([], condList));
  },
  changeDateStatus(item) {
    this.dateTarget = item;
    this.hasDateOpen = !this.hasDateOpen;
  },
  closeComponents() {
    const { condList } = this
    const list = [];
    condList.map((item) => {
      item.show = false;
      list.push(Object.assign({}, item));
      return item;
    });
    this.condList = list;
  },
  changeSearchCheckbox(show, item) {
    item.show = !item.show;
    if (show) this.checkboxSearchKey = '';
    this.$forceUpdate();
  },
  checkBoxSelected(item) {
    if (util.Assert.hasArr(item.value) && item.value.length > 0) {
      return item.value.map((code) => {
        return item.items[code].name;
      }).join(',');
    } else {
      return item.tips || '请点击选择';
    }
  },
  formatDate(time) {
    return !time ? '' : util.Date.format('YYYY-MM-DD', time);
  },
  hasNoEmptry: items => items && items.length > 0,
  hasMoveOnSelect() {
    this.isMoveOver = 1;
  },
  hasMouseLeave() {
    this.isMoveOver = 0;
  },
  updateSearchCheckbox(no, val) {
    this.checkboxSearchKey = Object.assign({},
      this.checkboxSearchKey,
      { [no]: val });
  },
  reverse(item) {
    const selected = util.Array.clone(item.value);
    item.value = [];
    item.items.map((v, code) => {
      if (selected.indexOf(code) < 0) {
        item.value.push(code);
      }
    });
    this.condList = util.Array.clone(this.condList);
  },
  searchCheckbox(no, item) {
    let newItems = [];
    if(this.checkboxSearchKey[no]) {
      item.items.map((data) => {
        if (data.name.indexOf(this.checkboxSearchKey[no]) >= 0) {
          newItems.push(data);
        } else {
          newItems.push(null);
        }
      });
      return newItems;
    } else {
      return item.items;
    }
  },
  width: cols => ({ width: `${100 / cols}%` }),
};

export default {
  methods,
};
