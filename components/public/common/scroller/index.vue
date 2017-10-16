<template>
  <div class="vp-scroller">
    <ul class="vp-scroller-conatiner" ref="conatiner"></ul>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: [],
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
        total: 0,
        amount: 5,
      };
    },
    mounted() {
      this.nodesRender();
    },
    methods: {
      nodesRender() {
        const { scrollerList } = this;
        scrollerList.map((item, code) => {
          this.createNode(item, code);
          return item;
        });
      },
      createNode(item, code) {
        const { conatiner } = this.$refs;
        const node = document.createElement('li');

        node.className = 'vp-menus-item';
        node.innerHTML = `<span>${item.name}</span>`;
        conatiner.appendChild(node);
        node.style.cssText = [
          'position: absolute',
          'left: 0',
          `top: ${code * node.offsetHeight}px`,
        ].join(';');
      },
    },
  }
</script>
