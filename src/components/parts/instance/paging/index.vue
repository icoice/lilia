<template>
  <div class="vp-paging" v-if="pageTotal > 0">
    <ul>
      <li class="vp-paging-operate vp-paging-first">
        <vp-button @click="firstPageNo()">
          <span class="psm-icon psm-first" slot="button-name"></span>
        </vp-button>
      </li>
      <li class="vp-paging-operate vp-paging-prev">
        <vp-button @click="clickPageNo(currentPageNo - 1)">
          <span class="psm-icon psm-arrow-left" slot="button-name"></span>
        </vp-button>
      </li>
      <li v-for="pageNo in pageNoList" class="vp-page-no" :class="{
          'vp-page-no-selected': currentPageNo === pageNo,
          'vp-page-no-disabled': maxPage(pageNo),
        }">
        <vp-button @click="clickPageNo(pageNo)" :disabled="maxPage(pageNo)">
          <span slot="button-name">{{format(pageNo)}}</span>
        </vp-button>
      </li>
      <li class="vp-paging-operate vp-paging-next">
        <vp-button @click="clickPageNo(currentPageNo + 1)">
          <span  class="psm-icon psm-arrow-right" slot="button-name"></span>
        </vp-button>
      </li>
      <li class="vp-paging-operate vp-paging-last">
        <vp-button @click="clickPageNo(getTotalPage())">
          <span class="psm-icon psm-last" slot="button-name"></span>
        </vp-button>
      </li>
      <li class="vp-paging-tips">
        共{{pageTotal}}条记录，全{{getTotalPage()}}页，每页限{{pageSize}}条记录
      </li>
    </ul>
  </div>
</template>

<script>
  import vpButton from '../../common/button';

  export default {
    components: {
      vpButton,
    },
    props: {
      pageNo: {
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
        currentPageNo: this.pageNo,
        pageNoList: [],
        pageTotal: this.total,
      };
    },
    mounted() {
      this.reset();
    },
    watch: {
      pageNo(no) {
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
      clickPageNo(no) {
        const maxPg = this.getTotalPage();
        this.currentPageNo = no <= 0 ? 1 : no;
        this.currentPageNo = no >= maxPg ? maxPg : this.currentPageNo;
        this.reset();
        this.$emit('selected', this.currentPageNo);
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
        this.$emit('selected', this.currentPageNo);
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
        const nextPageNoStart = (currentPageNo + 1) - (pageSize / 2);
        const nextPageNoEnd = currentPageNo + (pageSize / 2);
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
