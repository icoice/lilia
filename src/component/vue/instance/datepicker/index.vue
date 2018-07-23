<template lang='pug'>
div.lilia-datepicker(v-if='open'
  class='lilia'
  @mouseover='e => mousePos(1)'
  @mouseleave='e => mousePos(0)')
  // 组件头
  div.datepicker-nav
    div.nav-item
      lilia-input(
        :val='currentInput || getCurrent'
        @keyup='editCurrent'
        @blur='editOver')
    div.nav-item
      btn(@tap='close' v-if='!hasNoClose')
        span.iconfont(class='icon-cross' slot='btn')
      btn(@tap='today')
        span.iconfont(class='icon-refresh' slot='btn')
  // 日期选择
  div.datepicker-selector(class='speed-select')
    lilia-select(:list='yearList' :val='nowYear' @change='item => choose("year", item.key)')
    lilia-select(:list='monthList' :val='nowMonth' @change='item => choose("month", item.key)')
  // 选择区域
  div.datepicker-area
    // 日份
    div.datepicker-items
      table.row
        tr.datepicker-week
          td(v-for='week in weekList') {{ week }}
        tr.datepicker-day(v-for='line in dayList')
          td(v-for='day in line' :class='{select: day === nowDay}')
            btn(@tap='e => (day && choose("day", day))')
              span(slot='btn') {{ day === null ? '&nbsp;' : day }}
  // 时间选择
  div.datepicker-selector(class='speed-select' v-if='hasShowTime')
    lilia-select(:list='hourList' :val='nowHour' @change='item => choose("hour", item.key)')
    lilia-select(:list='minuteList' :val='nowMinute' @change='item => choose("minute", item.key)')
    lilia-select(:list='secondList' :val='nowSecond' @change='item => choose("second", item.key)')
</template>

<script>
import btn from '../../common/button';
import liliaInput from '../../common/input';
import liliaSelect from '../../common/select';
import pop from '../../instance/pop';
import actions from './actions';

const util = window.$lilia_util;

const keyMap = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分',
  second: '秒',
};

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showTime: {
      type: Boolean,
      default: false,
    },
    now: {
      type: Number,
      default: Date.now(),
    },
    noClose: {
      type: Boolean,
      default: false,
    },
    noAutoHide: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(has) {
      this.open = has;
    },
    now() {
      this.current = this.now;
      this.init();
    },
    showTime(time) {
      this.hasShowTime = time;
    },
  },
  data() {
    return {
      cols: 7,
      current: this.now,
      dayList: [],
      days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      dateUnits: {year: '年', month: '月', day: '日', hour: '时', minute: '分', second: '秒'},
      hours: [0, 23],
      hourList: [],
      hasShowTime: this.showTime,
      hasNoClose: this.noClose,
      hasNoAutoHide: this.noAutoHide,
      months: [0, 11],
      monthList: [],
      minutes: [0, 59],
      minuteList: [],
      nowYear: null,
      nowMonth: null,
      nowDay: null,
      nowHour: null,
      nowMinute: null,
      nowSecond: null,
      open: this.show,
      isMoveOver: 0,
      isBindMouseMenus: false,
      seconds: [0, 59],
      secondList: [],
      showDate: ['year', 'month', 'day', 'hour', 'minute', 'second'],
      selectYearScope: [null, null],
      keyMap,
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      yearList: [],
      years: [1900, 9999],
      currentInput: null, // 用于处理组件更新问题
    };
  },
  components: {
    btn,
    pop,
    liliaInput,
    liliaSelect,
  },
  mounted() {
    this.init();
  },
  computed: {
    getCurrent() {
      const format = this.hasShowTime ? 'YYYY-MM-DD HH:II:SS' : 'YYYY-MM-DD';
      return util.Date.format(format, this.current);
    },
  },
  ...actions,
};
</script>
