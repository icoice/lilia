<template lang="pug">
div.lilia-time
  lilia-pop
    div(slot='pop-btn')
      span {{ getTime }}
    div(slot='pop')
      lilia-datepicker(
        :show='true'
        :now='m$Val.value === "" || !m$Val.value ? Date.now() : m$Val.value'
        :noClose='true'
        :noAutoHide='true'
        :showTime='m$ShowTime'
        @change='val => change(val)')
      div.clear-time
        btn(@tap='initTime')
          span(slot='btn') 清空选择
</template>

<script>
import btn from '../../base/button';
import liliaDatepicker from '../datepicker';
import liliaPop from '../pop';

const drive = window.$lilia_drive;
const util = window.$lilia_util;

export default {
  ...drive.Vue.state('m$', {
    val: [Object, { value: Date.now(), tips: '请选择时间' }],
    showTime: [Boolean, false],
  }),
  components: {
    btn,
    liliaDatepicker,
    liliaPop,
  },
  computed: {
    getTime() {
      const { m$Val, m$ShowTime } = this;
      if (m$Val.value && m$Val.value !== '') {
        return util.Date.format(
          m$ShowTime ? 'YYYY-MM-DD HH:II:SS' : 'YYYY-MM-DD',
          m$Val.value);
      }
      return m$Val.tips;
    },
  },
  methods: {
    initTime() {
      this.m$Val = { value: '', tips: '请选择时间' };
    },
    change(val) {
      const { m$Val } = this;
      this.m$Val = { value: val, tips: m$Val.tips };
      this.$emit('change', this.m$Val);
    },
  },
}
</script>
