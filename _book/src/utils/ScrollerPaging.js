// scroller的分页用法支持
export default function ScrollerPaging(scroller) {
  this.data = {};
  this.currentPage = null;
  this.onChange = function onChange(me, callback) {
    if (this.currentPage !== me.nextPage || me.isRefresh) {
      this.currentPage = me.nextPage;
      if (callback) {
        callback(params => this.getter(params),
        data => this.setter(this.currentPage, data), me);
      }
    }
  };
  this.setter = function setter(page, data) {
    this.data[page] = typeof data === 'object' && data instanceof Array ? data : [];
  };
  this.getter = function getter(me) {
    const { data } = this;
    let allData = [];
    Object.entries(data).map((kv) => {
      const [, v] = kv;
      allData = allData.concat(v);
      return kv;
    });
    return !me ? allData : data[scroller.page];
  };
}
