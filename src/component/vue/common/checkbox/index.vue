<template lang='pug'>
div.moo-checkbox(class='moo')
  div.box-item(v-for='(item, code) in m$Items')
    div(v-if='item')
      btn(@tap='e => tap(code, item)')
        div(slot='btn')
          div.box-mark
            span.iconfont(class='icon-check' v-if='btnSelected(code, item)')
            span.iconfont(class='icon-blank' v-else)  
          div.box-name {{ item.name }}
</template>

<script>
import actions from './actions';
import btn from '../button';

const drive = window.$moo_drive;

export default {
  ...drive.Vue.state('m$', {
    items: [Array, []],
    selected: [Array, []],
  }),
  components: {
    btn,
  },
  ...actions,
};
</script>
