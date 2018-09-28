<template lang="pug">
div.lilia-self-adaptive-box(ref='container')
  btn(@tap='doTap')
    div.box-tap(slot='btn')
      slot(name='box')
</template>

<script>
import btn from '../../base/button';

export default {
  props: {
    type: {
      type: String,
      default: 'outside',
    },
    autoWidth: {
      type: String,
      default: 'noAuto',
    },
    autoHeight: {
      type: String,
      default: 'noAuto',
    },
  },
  components: {
    btn,
  },
  mounted() {
    this.toResize();
  },
  data() {
    return {
      unit: 'px',
      adaptiveType: this.type,
      hasBindResize: false,
    };
  },
  watch: {
    type(data) {
      this.adaptiveType = data;
    },
  },
  mounted() {
    this.resize();
  },
  activated() {
    this.resize();
  },
  updated() {
    this.resize();
  },
  methods: {
    resize() {
      const { unit, adaptiveType } = this;
      const { container } = this.$refs;
      const { parentNode, children } = container;
      const node = adaptiveType === 'outside' ? parentNode : children[0];

      if (!node) return node;

      const { offsetWidth, offsetHeight } = node;

      if (this.autoWidth === 'noAuto') {
        container.style.width = `${offsetWidth}${unit}`;
      }

      if (this.autoHeight === 'noAuto') {
        container.style.height = `${offsetHeight}${unit}`;
      }

      this.$emit('resize', {
        width: offsetWidth,
        height: offsetHeight,
      });

      return node;
    },
    toResize() {
      if (!this.hasBindResize) {
        this.resize();
        this.hasBindResize = false;
        window.addEventListener('resize', () => {
          this.resize();
        }, false);
      }
    },
    doTap(e) {
      this.$emit('tap', e);
    },
  },
}
</script>
