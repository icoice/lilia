<template lang="pug">
  div.moo-radio(:class="{ 'moo-radio-disabled': m$Disabled }")
    div.radio-item(
      v-for="(item, code) in m$Items"
      v-if='item'
      @click='selectRadio(code, item)')
      div.radio-check
        div.radio-checked-box(class='iconfont icon-check' v-if='hasSelected(code)')
        div.radio-checked-box(class='iconfont icon-blank' v-else)
      div.radio-name {{ item.name }}
    div.radio-mask(v-if='m$Disabled')
</template>

<script>
import actions from './actions';

const drive = window.$drive;

export default {
  ...drive.Vue.state('m$', {
    items: [Array, () => []],
    selected: [Number, null],
    disabled: [Boolean, false],
  }),
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
