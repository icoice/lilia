const util = window.$lilia_util;

export const methods = {
  allSelect(item) {
    item.value = [];
    item.items.map((v, code) => item.value.push(code));
    this.condList = util.Array.clone(this.condList);
  },
  change(item, val) {
    const { condList, showTime } = this;
    const newItem = item;
    newItem.value = val;
    this.$emit('change', Object.assign([], condList));
  },
  changeTimeZones(item, data) {
    const { condList, showTime } = this;
    const { items } = item;
    const time = util.Date.format(showTime ? 'YYYY-MM-DD HH:II:SS' : 'YYYY-MM-DD', data.value);
    items[data.type].value = time;
    this.$forceUpdate();
    this.$emit('change', this.condList);
  },
  changeTime(item, data) {
    const { condList, showTime } = this;
    const time = util.Date.format(showTime ? 'YYYY-MM-DD HH:II:SS' : 'YYYY-MM-DD', data.value);
    item.value = time;
    this.$forceUpdate();
    this.$emit('change', this.condList);
  },
  formatDate: time => !time ? '' : util.Date.format('YYYY-MM-DD', time),
  hasNoEmptry: items => items && items.length > 0,
  width: cols => ({ width: `${100 / cols}%` }),
};

export default {
  methods,
};
