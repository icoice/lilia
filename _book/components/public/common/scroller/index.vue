<template>
  <div class="vp-menus">
    <ul class="vp-menus-items" ref="menus"></ul>
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
        menus: this.list,
        no: 1,
        total: 0,
        amount: 5,
      };
    },
    mounted() {
      this.nodesRender();
    },
    method: {
      nodesRender() {
        const { menus } = this;
        menus.map((item, code) => {
          this.createNode(item, code);
          return item;
        });
      },
      createNode(item, code) {
        const { menus } = this.$refs;
        const node = document.createElement('li');

        node.className = 'vp-menus-item';
        node.innerHTML = `<span>${item.name}</span>`;
        menus.appendChild(node);
        node.style.cssText = [
          'position: absolute',
          'left: 0',
          `top: ${code * node.offsetHeight}px`,
        ].join(';');
      },
    },
  }
</script>
