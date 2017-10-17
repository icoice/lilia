<template>
  <div class="vp-scroller" @scroll="onScroll">
    <ul class="vp-scroller-container" ref="container"></ul>
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
      amount: {
        type: Number,
        default: 5,
      },
      condition: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        filtrate: this.condition,
        scrollerList: this.list,
        no: 1,
        scrollerTotal: this.total,
        showAmount: this.amount,
        beforeCode: 0,
        scroller: {
          overHeight: 0,
          spaceHeight: 0,
        },
      };
    },
    watch: {
      list(list) {
        this.scrollerList = list;
        this.init();
      },
      total(total) {
        this.scollerTotal = total;
      },
      amount(amount) {
        this.showAmount = amount;
      },
    },
    mounted() {
      this.init();
      window.addEventListener('resize', () => this.init());
    },
    methods: {
      init() {
        const { container } = this.$refs;
        let { showAmount, scrollerList, scroller } = this;
        showAmount = showAmount > scrollerList.length ? scrollerList.length : showAmount;
        this.beforeCode = 10;
        this.push(0);
        scroller.currentBottom = scroller.spaceHeight;
      },
      innerStyle(dom, style) {
        dom.style.cssText = Object.entries(style).map(([k, v]) => {
          return `${[k]}:${[v]}`;
        }).join(';');
      },
      // 由于scrollTop指滚动条的顶部位置，但我们需要滚动条的底部位置，明确滚动条是否滚动到底部尽头。
      scrollBottom(dom) {
        const reallyHeight = dom.scrollHeight - (dom.scrollHeight - dom.offsetHeight);
        return dom.scrollTop + reallyHeight;
      },
      onScroll(e) {
        const { scroller, showAmount, beforeCode } = this;
        const { spaceHeight } = scroller;
        const beforeTop = scroller.currentTop;
        const beforeBottom = scroller.currentBottom;
        const top = e.target.scrollTop;
        const bottom = this.scrollBottom(e.target);
        const code = Math.floor(bottom / spaceHeight);

        if (code !== this.beforeCode) {
          this.push(code);
          this.beforeCode = code;
          scroller.currentBottom = bottom;
        }
      },
      push(code) {
        const { container } = this.$refs;
        const { scrollerList, showAmount, scrollerTotal, scroller, groups, beforeCode } = this;
        const space = beforeCode - code;
        const move = 1;
        const start = code - move - showAmount < 0 ? 0 : code - move - showAmount;
        let end = code + move < showAmount ? showAmount : code + move;
        end = end > scrollerTotal ? scrollerTotal : end;
        container.innerHTML = '';
        for (let i = start; i < end; i += 1) {
          const node = this.createNode(scrollerList[i],  i, ({ height }) => {
            this.innerStyle(container, { height: `${scrollerList.length * height}px` });
            this.innerStyle(container.parentNode, { height: `${showAmount  * height}px` });
            scroller.overHeight = scrollerList.length * height;
            scroller.spaceHeight = height;
          });
          container.appendChild(node);
        }
      },
      createNode(item, code, callback) {
        const { container } = this.$refs;
        const node = document.createElement('li');

        node.className = ['vp-scroller-item'].join(' ');
        node.innerHTML = `<span>${item.name}</span>`;

        container.appendChild(node);

        this.innerStyle(node, {
          position: 'absolute',
          left: 0,
          top: `${code * node.offsetHeight}px`,
        });

        callback && callback({
          height: node.offsetHeight,
        });

        return node;
      },
      setPageNo(space) {
        const { scrollerList, showAmount, scollerTotal } = this;
        const no = this.no + space <= 0 ? 1 : (this.no + space);
        const start = no - this.showAmount <= 0 ? 1 : (no - this.showAmount);
        const end = no * this.showAmount > scollerTotal ? scollerTotal : (no * this.showAmount);
        this.no = no;
      },
      next() {
        return this.setPageNo(1);
      },
      prev() {
        return this.setPageNo(-1);
      },
    },
  }
</script>
