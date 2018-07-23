<template lang="pug">
  div.moo-pop(class='moo' @mouseleave='inner')
    div.moo-pop-control(:class="{'moo-pop-open': mooShow }")
      btn(@tap='showPop' @mousemove='clearInner')
        div(slot='btn')
          slot(name='pop-btn')
    div.moo-pop-content(v-if='mooShow')
      slot(name='pop')
</template>

<script>
import btn from '../../common/button';
import actions from './actions';

const drive = window.$moo_drive;

export default {
  ...drive.Vue.state('moo', {
    name: [String, 'POP'],
    show: [Boolean, false],
    hasInit: [Boolean, false],
    hasInnter: [Boolean, false],
  }),
  mounted() {
    this.init();
  },
  components: {
    btn,
  },
  ...actions,
};
</script>
