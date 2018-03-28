<template>
  <div class="moo moo-paging" v-if="pageTotal > 0">
    <ul>
      <li class="paging-operate paging-first">
        <btn @tap="firstPageNo()">
          <span slot="btn">首页</span>
        </btn>
      </li>
      <li class="paging-operate paging-prev">
        <btn @tap="tapPageNo(currentPageNo - 1)">
          <span slot="btn">上一页</span>
        </btn>
      </li>
      <li v-for="pageNo in pageNoList" class="page-no" v-if="!maxPage(pageNo)" :class="{
          'page-no-selected': currentPageNo === pageNo,
          'page-no-disabled': maxPage(pageNo),
        }">
        <btn @tap="tapPageNo(pageNo)" :disabled="maxPage(pageNo)">
          <span slot="btn">{{format(pageNo)}}</span>
        </btn>
      </li>
      <li class="paging-operate paging-next">
        <btn @tap="tapPageNo(currentPageNo + 1)">
          <span slot="btn">下一页</span>
        </btn>
      </li>
      <li class="paging-operate paging-last">
        <btn @tap="tapPageNo(getTotalPage())">
          <span slot="btn">尾页</span>
        </btn>
      </li>
      <li class="paging-tips">
        共{{pageTotal}}条记录，全{{getTotalPage()}}页，每页限{{pageSize}}条记录
      </li>
    </ul>
  </div>
</template>

<script>
  import btn from '../../common/button';

  export default {
    components: {
      btn,
    },
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
        pageSize: this.size,
        pageNoStart: 1,
        pageNoEnd: 1,
        amountStart: 0,
        amountEnd: 0,
        currentPageNo: this.no,
        pageNoList: [],
        pageTotal: this.total,
      };
    },
    mounted() {
      this.reset();
    },
    watch: {
      no(no) {
        this.currentPageNo = no;
        if (no === 1) this.firstPageNo();
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
      getTotalPage() {
        const { pageTotal, pageSize } = this;
        return Math.ceil(pageTotal / pageSize);
      },
      // 触发选择
      tapPageNo(no) {
        const maxPg = this.getTotalPage();
        this.currentPageNo = no <= 0 ? 1 : no;
        this.currentPageNo = no >= maxPg ? maxPg : this.currentPageNo;
        this.reset();
        this.$emit('change', this.currentPageNo);
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
        this.currentPageNo = 1;
        this.pageNoStart = 1;
        this.pageNoEnd = 1;
        this.amountStart = 0;
        this.amountEnd = 0;
        this.reset();
        this.$emit('change', this.currentPageNo);
      },
      // 计算页面显示记录数量
      setRecordAmount() {
        const { pageSize, currentPageNo } = this;
        const start = currentPageNo * pageSize;
        const end = (currentPageNo * pageSize) + pageSize;
        this.amountStart = start;
        this.amountEnd = end;
      },
      // 计算可显示的页码
      setPageNoScope() {
        const { currentPageNo, pageSize, pageNoStart } = this;
        const nextPageNoStart = (currentPageNo + 1) - Math.ceil(pageSize / 2);
        const nextPageNoEnd = currentPageNo + Math.ceil(pageSize / 2);
        this.pageNoStart = nextPageNoStart >= 1 ? nextPageNoStart : pageNoStart;
        this.pageNoStart = currentPageNo <= 5 || this.pageNoStart <= 0 ? 1 : this.pageNoStart;
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
    },
  };
</script>
