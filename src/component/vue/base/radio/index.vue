<template lang="pug">
  div.lilia-radio(:class="{ 'lilia-radio-disabled': m$Disabled }")
    div.radio-item(
      v-for="(item, code) in m$Items"
      v-if='item && code !== "length"')
      div.radio-check
        btn(@tap='selectRadio(code, item)')
          div(slot='btn')
            span.radio-checked-box(class='liliafont icon-check' v-if='hasSelected(code)')
            span.radio-checked-box(class='liliafont icon-blank' v-else)
            span.radio-name {{ item.name }}
    div.radio-mask(v-if='m$Disabled')
</template>

<script>
import actions from './actions';
import btn from '../button';

const drive = window.$lilia_drive;

export default {
  ...drive.Vue.state('m$', {
    items: [[Array, Object], () => []],
    selected: [[Number, String], null],
    disabled: [Boolean, false],
  }),
  components: {
    btn,
  },
  mounted() {
    this.setSelect();
  },
  activated() {
    this.setSelect();
  },
  updated() {
    this.setSelect();
  },
  ...actions,
};
</script>
