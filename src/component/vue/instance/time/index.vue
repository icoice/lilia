<template lang="pug">
div.lilia-time
  lilia-pop(@change='init')
    div.time-default(slot='pop-btn')
      div.select-time
        span {{ getTime }}
      div.clear-time(v-if='hasShowPop')
        btn(@tap='initTime')
          span.liliafont(class='icon-cross' slot='btn')
    div(slot='pop')
      lilia-datepicker(
        :show='true'
        :now='m$Val.value === "" || !m$Val.value ? Date.now() : m$Val.value'
        :noClose='true'
        :noAutoHide='true'
        :showTime='m$ShowTime'
        @change='val => change(val)')
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
  }, {
    data: {
      hasShowPop: false,
    },
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
    init(has) {
      this.hasShowPop = has;
    },
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
