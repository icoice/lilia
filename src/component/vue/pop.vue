<template lang="pug">
  div.lilia-pop.lilia(@mouseleave='leaveComponent' @mousemove='inComponent')
    div.lilia-pop-header(:class='{"lilia-pop-open": isOpen}')
      lilia-button(@pressEnd='popShow')
        div.lilia-pop-button(slot='button')
          slot(name='pop-header')
    div.lilia-pop-content(v-show='isOpen')
      slot(name='pop-body')
</template>

<script>
import createState from './mixins/createState';
import disabled from './mixins/disabled';
import pop from './mixins/pop';
import liliaButton from './button';

export default {
  mixins: [
    createState('pop'),
    disabled,
    pop,
  ],
  mounted() {
    this.listenMouseMove();
  },
  components: {
    liliaButton,
  },
  computed: {
    isOpen() {
      return this.status === 'open';
    },
  },
  methods: {
    listenMouseMove() {
      const { bindMouseMove, state } = this;

      if (bindMouseMove) return;

      this.bindMouseMove = true;

      return window.addEventListener('click', (e) => {
        const { isLeaveComponent } = this;

        if (isLeaveComponent) {
          state.wheelFlowAction('close');
        }
      }, true);
    },
    leaveComponent() {
      this.isLeaveComponent = true;
    },
    inComponent() {
      this.isLeaveComponent = false;
    },
    popShow() {
      const { status, state } = this;

      switch (status) {
        case 'open':
          state.wheelFlowAction('close');
          break;
        case 'close':
          state.wheelFlowAction('open');
          break;
        default:
          state.wheelFlowAction('close');
      }
    },
  },
};
</script>
