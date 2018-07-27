<template lang='pug'>
div.lilia-time-zones
  // start
  div.time-scope
    lilia-pop(@change='initClearStart')
      div.time-default(slot='pop-btn')
        div.select-time
          span {{ getStart }}
        div.clear-time(v-if='hasShowStartPop')
          btn(@tap='initStart')
            span.liliafont(class='icon-cross' slot='btn')
      div(slot='pop')
        lilia-datepicker(
          :show='true'
          :now='m$Start.value === "" || !m$Start.value ? Date.now() : m$Start.value'
          :noClose='true'
          :noAutoHide='true'
          :showTime='m$ShowTime'
          @change='val => change("start", val)')
  div.time-split &nbsp;至&nbsp;
  // end
  div.time-scope
    lilia-pop(@change='initClearEnd')
      div.time-default(slot='pop-btn')
        div.select-time
          span {{ getEnd }}
        div.clear-time(v-if='hasShowEndPop')
          btn(@tap='initEnd')
            span.liliafont(class='icon-cross' slot='btn')
      div(slot='pop')
        lilia-datepicker(
          :show='true'
          :now='m$End.value === "" || !m$End.value ? Date.now() : m$End.value'
          :noClose='true'
          :noAutoHide='true'
          :showTime='m$ShowTime'
          @change='val => change("end", val)')
</template>

<script>
import btn from '../../base/button';
import liliaDatepicker from '../datepicker';
import liliaPop from '../pop';

const drive = window.$lilia_drive;
const util = window.$lilia_util;

export default {
  ...drive.Vue.state('m$', {
    start: [Object, { value: Date.now(), tips: '开始时间' }],
    end: [Object, { value: Date.now(), tips: '结束时间' }],
    showTime: [Boolean, false],
  }, {
    data: {
      hasShowStartPop: false,
      hasShowEndPop: false,
    },
  }),
  components: {
    liliaDatepicker,
    liliaPop,
    btn,
  },
  computed: {
    getStart() {
      const { m$Start, m$ShowTime } = this;
      if (m$Start.value && m$Start.value !== '') {
        return util.Date.format(
          m$ShowTime ? 'YYYY-MM-DD HH:II:SS' : 'YYYY-MM-DD',
          m$Start.value);
      }
      return m$Start.tips;
    },
    getEnd() {
      const { m$End, m$ShowTime } = this;
      if (m$End.value && m$End.value !== '') {
        return util.Date.format(
          m$ShowTime ? 'YYYY-MM-DD HH:II:SS' : 'YYYY-MM-DD',
          m$End.value);
      }
      return m$End.tips;
    },
  },
  methods: {
    initClearStart(has) {
      this.hasShowStartPop = has;
    },
    initClearEnd(has) {
      this.hasShowEndPop = has;
    },
    initStart() {
      this.m$Start = { value: '', tips: '开始时间' };
    },
    initEnd() {
      this.m$End = { value: '', tips: '结束时间' };
    },
    change(type, value) {
      const key = `m$${util.String.firstUppercase(type)}`;
      this[key].value = value;
      this[key] = Object.assign({}, this[key]);
      this.$emit('tap', { type, value });
    },
  },
};
</script>
