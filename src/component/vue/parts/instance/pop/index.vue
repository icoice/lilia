<template>
  <div class="moo-pop moo" @mouseleave='inner' >
    <div class="moo-pop-control" :class="{'moo-pop-open': popShow }">
      <btn @tap='showPop'@mousemove='clearInner'>
        <div slot="btn">
          <slot name="pop-btn"></slot>
        </div>
      </btn>
    </div>
    <div class="moo-pop-content" v-if="popShow">
      <slot name="pop"></slot>
    </div>
  </div>
</template>

<script>
import btn from '../../common/button';

export default {
  props: {
    name: {
      type: String,
      default: 'POP',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    window.addEventListener('click', (e) => {
      if (this.hasInner) {
        this.popShow = false;
        this.hasInner = false;
      }
    }, true);
  },
  components: {
    btn,
  },
  data() {
    return {
      popName: this.name,
      popShow: this.show,
      hasInner: false,
    };
  },
  watch: {
    name(name) {
      this.popName = name;
    },
    show(show) {
      this.popShow = show;
    },
  },
  methods: {
    inner() {
      this.hasInner = true;
    },
    clearInner() {
      this.hasInner = false;
    },
    showPop() {
      this.popShow = !this.popShow;
      this.$emit('change');
    },
  },
};
</script>
