<template lang='pug'>
  div.moo-toast(class='moo' v-if='m$Show')
    div.toast-showcase
      p.toast-content {{ m$Message }}
      div.toast-bg
</template>

<script>
import actions from './actions';

const drive = window.$drive;

export default {
  ...drive.Vue.state('m$', {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    timeout: {
      type: Number,
      default: 5000,
    },
  }),
  mounted() {
    this.sandClock();
  },
  updated() {
    this.sandClock();
  },
  ...actions,
};
</script>
