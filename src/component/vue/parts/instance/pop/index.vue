<template>
  <div class="moo-pop moo">
    <div class="moo-pop-control" :class="{'moo-pop-open': popShow }">
      <btn @tap='showPop'>
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
  components: {
    btn,
  },
  data() {
    return {
      popName: this.name,
      popShow: this.show,
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
    showPop() {
      this.popShow = !this.popShow;
      this.$emit('change');
    },
  },
};
</script>
