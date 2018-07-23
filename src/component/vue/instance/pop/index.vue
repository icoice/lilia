<template lang="pug">
  div.lilia-pop(class='lilia' @mouseleave='inner')
    div.lilia-pop-control(:class="{'lilia-pop-open': liliaShow }")
      btn(@tap='showPop' @mousemove='clearInner')
        div(slot='btn')
          slot(name='pop-btn')
    div.lilia-pop-content(v-if='liliaShow')
      slot(name='pop')
</template>

<script>
import btn from '../../base/button';
import actions from './actions';

const drive = window.$lilia_drive;

export default {
  ...drive.Vue.state('lilia', {
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
