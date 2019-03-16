<template lang='pug'>
  div.lilia-toast(class='lilia' v-if='m$Show')
    div.toast-showcase(ref='showcase')
      p.toast-content {{ m$Message }}
      div.toast-bg
</template>

<script>
import actions from './actions';

const drive = window.$lilia_drive;

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
  }, {
    data: {
      timeoutID: null,
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
