const util = window.$lilia_util;

export const methods = {
  allSelect(item) {
    item.value = [];
    item.items.map((v, code) => {
      item.value.push(code);
    });
    this.condList = util.Array.clone(this.condList);
  },
  change(item, val) {
    const { condList } = this;
    const newItem = item;
    newItem.value = val;
    this.$emit('change', Object.assign([], condList));
  },
  changeDate(items, data) {
    const { condList } = this;
    items[data.type].value = util.Date.toJSON(data.value);
    this.$forceUpdate();
    this.$emit('change', this.condList);
  },
  changeTime(item, data) {
    const { condList } = this;
    item.value = util.Date.toJSON(data.value);
    this.$forceUpdate();
    this.$emit('change', this.condList);
  },
  formatDate(time) {
    return !time ? '' : util.Date.format('YYYY-MM-DD', time);
  },
  hasNoEmptry: items => items && items.length > 0,
  width: cols => ({ width: `${100 / cols}%` }),
};

export default {
  methods,
};
