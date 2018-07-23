<template lang='pug'>
div.lilia-input(class='lilia' :class='status')
  div.input-container
    input(
      ref='input'
      :value='m$Val'
      :type='m$Type'
      :maxLength='m$MaxLength'
      :placeholder='m$Placeholder'
      @input='setInput'
      @change='setChange'
      @focus='setFocus'
      @blur='setBlur'
      @keyup='verifyVal')
    div.input-clear(v-if='showClear(m$Val)')
      span.iconfont(
      class='icon-cross'
      @click.stop='clear'
      @touchend.stop='clear')
    div.input-mask(v-if='m$Disabled')
</template>

<script>
import actions from './actions';

const drive = window.$lilia_drive;

export default {
  ...drive.Vue.state('m$', {
    disabled: [Boolean, false],
    filter: [RegExp, null],
    focus: [Boolean, false],
    maxLength: [Number, 100],
    hasClear: [Boolean, true],
    hasClearNow: [Boolean, false],
    hasKey: [[String, Number], null],
    hasEmptry: [Boolean, false],
    hasVerifyFail: [Boolean, false],
    isNoEmpty: [Boolean, false],
    type: [String, 'text'],
    val: [[String, Number], ''],
    verify: [Object, () => ({ regExp: null, message: '' })],
    placeholder: [String, ''],
  }),
  computed: {
    status() {
      return {
        'lilia-input-error': this.m$HasVerifyFail || this.m$HasEmptry,
        'lilia-input-disabled': this.m$Disabled,
      };
    },
  },
  updated() {
    // 注意，input重渲染的时候也会被触发，会让值被置空
    this.$emit('updated', this.getVal());
  },
  mounted() {
    if(this.m$Focus) this.$refs.input.focus();
  },
  ...actions,
};
</script>
