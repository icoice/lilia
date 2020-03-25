<template lang='pug'>
div.lilia-input.lilia
  div.input-mask(v-if='status === "disabled"')
  div.input-content
    input(
      ref='input'
      :value='val === null ? "" : val'
      :type='type'
      :maxLength='max'
      :placeholder='placeholder'
      @input='e => eventAction("input", e)'
      @change='e => eventAction("change", e)'
      @focus='e => eventAction("focus", e)'
      @blur='e => eventAction("blur", e)'
      @keyup='e => eventAction("keyup", e)'
      @keydown='e => eventAction("keydown", e)')
    lilia-button(@pressEnd='e => eventAction("clear", e)')
      span.iconfont.icon-clear(slot='button'
        v-if='val !== null && val !== "" && status !== "disabled"')
      span(slot='button' v-else)
</template>

<script>
import createState from './mixins/createState';
import disabled from './mixins/disabled';
import input from './mixins/input';

export default {
  mixins: [
    createState('input'),
    disabled,
    input,
  ],
  props: {
    max: {
      type: Number,
      default: 500,
    },
    firstFocus: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  watch: {
    firstFocus(is) {
      const { state } = this;

      state.wheelFlowAction(!is ? 'blur' : 'focus');
    },
  },
  mounted() {
    this.hasFirstFocus();
  },
  activated() {
    this.hasFirstFocus();
  },
  methods: {
    hasFirstFocus() {
      const { state } = this;

      if (this.firstFocus) {
        state.wheelFlowAction('focus');
      }

      state.wheelFlowAction('blur');
    },
  },
};
</script>
