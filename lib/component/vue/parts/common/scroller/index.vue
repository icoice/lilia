<template>
  <div class="vp-scroller" ref="main" :style="mainStyle" @scroll="onScroll">
    <ul class="vp-scroller-container" ref="container" :style="containerStyle">
      <li  class="vp-scroller-item" v-for="item in groups" :style="getItemStyle(item.code)">
        <slot name="scroller-content" :item="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: data => (data === null || !data ? [] : data),
    },
    hasSave: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    viewHeight: {
      type: String,
      default: null,
    },
    amount: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      scrollerList: this.list,
      no: 1,
      scrollerTotal: this.total,
      currentTop: this.scrollTo,
      showAmount: this.amount,
      beforeCode: 0,
      groups: [],
      spaceHeight: null,
      containerStyle: {
        height: 'auto',
      },
      mainStyle: {
        height: this.viewHeight !== null ? this.viewHeight :  'auto' ,
      },
      itemStyle: {
        position: 'absolute',
        left: 0,
        top: 0,
      },
    };
  },
  watch: {
    list(list) {
      this.scrollerList = list;
      this.init();
      this.resize(1);
    },
    total(total) {
      this.scrollerTotal = total;
      this.resize(1);
    },
    scrollTo(top) {
      this.currentTop = top;
      this.resize(1);
    },
    amount(amount) {
      this.showAmount = amount;
      this.resize(1);
    },
  },
  mounted() {
    this.init();
    window.addEventListener('resize', () => this.init(), false);
    this.$refs.main.scrollTop = this.currentTop;
  },
  updated() {
    this.resize();
  },
  activated() {
    this.init();
    this.resize();
    this.$refs.main.scrollTop = this.currentTop;
  },
  methods: {
    init() {
      const { container } = this.$refs;
      let { showAmount, scrollerList } = this;
      showAmount = showAmount > scrollerList.length ? scrollerList.length : showAmount;
      this.push(this.beforeCode);
    },
    getItemStyle(code) {
      const { spaceHeight, itemStyle } = this;
      return Object.assign({}, itemStyle, {
        top: `${spaceHeight !== null ? (code * spaceHeight) : 0}px`,
      });
    },
    // 由于scrollTop指滚动条的顶部位置，但我们需要滚动条的底部位置，明确滚动条是否滚动到底部尽头。
    scrollBottom(dom) {
      const reallyHeight = dom.scrollHeight - (dom.scrollHeight - dom.offsetHeight);
      return dom.scrollTop + reallyHeight;
    },
    resize(refresh = 0) {
      const { spaceHeight, scrollerTotal, showAmount } = this;
      const { container } = this.$refs;
      if (spaceHeight === null && container.children.length > 0 || refresh) {
        const sample = container.children[0];
        const height = sample.offsetHeight;
        this.containerStyle = {
          height: `${height * scrollerTotal}px`,
        }
        if (this.viewHeight === null) {
          this.mainStyle = {
            height: `${height * (showAmount < scrollerTotal ? showAmount : scrollerTotal)}px`,
          }
        }
        this.spaceHeight = typeof height === 'number' ? height : this.spaceHeight;
      }
      if (refresh) this.push(this.beforeCode);
    },
    onScroll(e) {
      const { showAmount, beforeCode, spaceHeight, scrollerTotal } = this;
      const top = e.target.scrollTop;
      const bottom = this.scrollBottom(e.target);
      const code = Math.ceil(bottom / (spaceHeight === null ? 1 : spaceHeight));
      const page = Math.ceil(code / showAmount);

      this.currentTop = top;

      if (code !== this.beforeCode) {
        this.push(code);
        this.beforeCode = code;
      }
      this.$emit('scroll',  {
        page,
        nextPage: code >= scrollerTotal ? page + 1 : page,
        amount: showAmount,
        code,
        top,
        bottom,
      });
    },
    push(code) {
      const { scrollerList, showAmount, scrollerTotal, beforeCode } = this;
      const newGroups = [];
      const space = beforeCode - code;
      const move = 1;
      const start = code - move - showAmount < 0 ? 0 : code - move - showAmount;
      let end = code + move < showAmount ? showAmount : code + move;
      end = end > scrollerTotal ? scrollerTotal : end;

      for (let i = start; i < end; i += 1) {
        const item = scrollerList[i];
        if (!item) continue;
        newGroups.push({
          data: item,
          code: i,
        });
      }

      this.groups = newGroups;
    },
  },
}
</script>
