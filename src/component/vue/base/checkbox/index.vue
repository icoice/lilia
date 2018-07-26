<template lang='pug'>
div.lilia-checkbox(class='lilia')
  div.box-item(v-for='(item, code) in m$Items')
    div(v-if='item && code !== "length"')
      btn(@tap='e => tap(Number(code), item)')
        div(slot='btn')
          div.box-mark
            span.iconfont(class='icon-check' v-if='btnSelected(Number(code), item)')
            span.iconfont(class='icon-blank' v-else)
          div.box-name {{ item.name }}
</template>

<script>
import actions from './actions';
import btn from '../button';

const drive = window.$lilia_drive;

export default {
  ...drive.Vue.state('m$', {
    items: [[Array, Object], () => []],
    selected: [Array, () => []],
  }),
  components: {
    btn,
  },
  ...actions,
};
</script>
