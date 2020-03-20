import { eq } from  '../../../common';

export default {
  props: {
    no: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      amountEnd: 0,
      amountStart: 0,
      currentNo: this.no,
      pageNoEnd: 1,
      pageNoList: [],
      pageNoStart: 1,
      pageSize: this.size,
      pageTotal: this.total,
      status: '',
    };
  },
  mounted() {
    const { state } = this;

    this.reset();

    state.setFlowAction('change', (status, no) => {
      const maxPg = this.getTotalPage();

      this.status = status;
      this.currentNo = no <= 0 ? 1 : no;
      this.currentNo = this.currentNo >= maxPg ? maxPg : this.currentNo;

      this.reset();

      return this.eventHappen(status, this.currentNo);
    });
  },
  watch: {
    no(no) {
      this.currentNo = no;

      if (eq(no, 1)) {
        this.firstPageNo();
      }

      this.reset();
    },
    size(size) {
      this.pageSize = size;

      this.reset();
    },
    total(total) {
      this.pageTotal = total;

      this.reset();
    },
  },
  methods: {
    selected(pageNo) {
      const { currentNo } = this;

      return eq(currentNo, pageNo) ? 'page-selected' : '';
    },
    getTotalPage() {
      const { pageTotal, pageSize } = this;

      return Math.ceil(pageTotal / pageSize);
    },
    inputPageNo(no) {
      const { state } = this;

      state.wheelFlowAction('change', Number(no));
    },
    // 触发选择
    tapPageNo(no) {
      const { state } = this;

      state.wheelFlowAction('change', no);
    },
    // 重置
    reset() {
      this.setPageNoScope();
      this.setRecordAmount();
      this.createPageNoList();
    },
    maxPage(no) {
      return this.getTotalPage() < no;
    },
    // 补齐
    format(no) {
      return no < 10 ? `0${no}` : no;
    },
    firstPageNo() {
      const { state } = this;

      this.amountEnd = 0;
      this.amountStart = 0;
      this.pageNoEnd = 1;
      this.pageNoStart = 1;

      state.wheelFlowAction('change', 1);
    },
    // 计算页面显示记录数量
    setRecordAmount() {
      const { pageSize, currentNo } = this;
      const start = currentNo * pageSize;
      const end = (currentNo * pageSize) + pageSize;

      this.amountStart = start;
      this.amountEnd = end;
    },
    // 计算可显示的页码
    setPageNoScope() {
      const { currentNo, pageSize, pageNoStart } = this;
      const nextPageNoStart = (currentNo + 1) - Math.ceil(pageSize / 2);
      const nextPageNoEnd = currentNo + Math.ceil(pageSize / 2);

      this.pageNoStart = nextPageNoStart >= 1 ? nextPageNoStart : pageNoStart;
      this.pageNoStart = currentNo <= 5 || this.pageNoStart <= 0 ? 1 : this.pageNoStart;
      this.pageNoEnd = nextPageNoEnd < pageSize ? pageSize : nextPageNoEnd;
    },
    // 创建一组页码
    createPageNoList() {
      const { pageNoStart, pageNoEnd } = this;

      this.pageNoList = [];

      for (let i = pageNoStart; i <= pageNoEnd; i += 1) {
        this.pageNoList.push(i);
      }
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
