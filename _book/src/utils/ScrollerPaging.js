// scroller的分页用法支持
export default function(scroller) {
  this.data = {};
  this.currentPage = null;
  this.onChange = function(scroller, callback) {
   if (this.currentPage !== scroller.nextPage || scroller.isRefresh) {
     this.currentPage = scroller.nextPage;
     if(callback) callback(params => this.getter(params), data => this.setter(this.currentPage, data), scroller);
   }
  },
  this.setter = function(page, data) {
   this.data[page] = typeof data === 'object' && data instanceof Array ? data : [] ;
  }
  this.getter = function(scroller) {
   const { data } = this;
   let allData = [];
   Object.entries(data).map((kv) => {
     const [, v] = kv;
     allData = allData.concat(v);
     return kv;
   });
   return !scroller ? allData : data[scroller.page];
  }
}
