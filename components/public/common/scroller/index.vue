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
      },
      total(total) {
        this.scrollerTotal = total;
        this.spaceHeight = null;
      },
      amount(amount) {
        this.showAmount = amount;
      },
    },
    mounted() {
      this.init();
      window.addEventListener('resize', () => this.init());
    },
    updated() {
      this.resize();
    },
    activated() {
      this.init();
    },
    methods: {
      init() {
        const { container } = this.$refs;
        let { showAmount, scrollerList } = this;
        showAmount = showAmount > scrollerList.length ? scrollerList.length : showAmount;
        this.beforeCode = 10;
        this.push(0);
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
      resize() {
        const { spaceHeight, scrollerTotal, showAmount } = this;
        const { container } = this.$refs;

        if (spaceHeight === null && container.children.length > 0) {
          const sample = container.children[0];
          const height = sample.offsetHeight;
          this.containerStyle = {
            height: `${height * scrollerTotal}px`,
          }
          if (this.viewHeight === null) {
            this.mainStyle = {
              height: `${height * (scrollerTotal > showAmount ? showAmount : scrollerTotal)}px`,
            }
          }
          this.spaceHeight = height;
        }
      },
      onScroll(e) {
        const { showAmount, beforeCode, spaceHeight } = this;
        const top = e.target.scrollTop;
        const bottom = this.scrollBottom(e.target);
        const code = Math.floor(bottom / (spaceHeight === null ? 1 : spaceHeight));

        if (code !== this.beforeCode) {
          this.push(code);
          this.beforeCode = code;
        }
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
