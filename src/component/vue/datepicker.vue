<template lang='pug'>
div.lilia-datepicker.lilia(v-if='open'
  class='lilia'
  @mouseover='e => isLeaveThis(1)'
  @mouseleave='e => isLeaveThis(0)')
  div.datepicker-nav
    div.nav-item
      lilia-input(
        :value='currentInput === null ? getCurrent : currentInput'
        :filter='/[^0-9\\-\\s\\:]/g'
        :placeholder='isShowTime ? "YYYY-MM-DD HH:II:SS" : "YYYY-MM-DD"'
        @keyup='editCurrent'
        @blur='editOver')
    div.nav-item
      lilia-button(@pressEnd='today')
        span.iconfont.icon-today(slot='button')
      lilia-button(@pressEnd='done')
        span.iconfont.icon-done(slot='button')
  div.datepicker-selector(class='speed-select')
    lilia-pulldown(
      :list='yearList'
      :value='currentYear'
      @change='item => choose("year", item.key)')
    lilia-pulldown(
      :list='monthList'
      :value='nowMonth'
      @change='item => choose("month", item.key)')
    lilia-pulldown(
      :list='hourList'
      :value='nowHour'
      @change='item => choose("hour", item.key)'
      v-if='isShowTime')
    lilia-pulldown(
      :list='minuteList'
      :value='nowMinute'
      @change='item => choose("minute", item.key)'
      v-if='isShowTime')
    lilia-pulldown(
      :list='secondList'
      :value='nowSecond'
      @change='item => choose("second", item.key)'
      v-if='isShowTime')
  div.datepicker-area
    div.datepicker-items
      table.row
        tr.datepicker-week
          td(v-for='week in weekList') {{ week }}
        tr.datepicker-day(v-for='line in dayList')
          td(v-for='day in line' :class='{select: day === nowDay}')
            lilia-button(@pressEnd='e => (day && choose("day", day))')
              span(slot='button') {{ day === null ? '&nbsp;' : day }}
</template>

<script>
import {
  JUDGE,
  dateFormat,
  eq,
  or,
  timestamp,
  week,
} from '../../common';
import leaveMouseHide from './mixins/leaveMouseHide';

export default {
  mixins: [
    leaveMouseHide,
  ],
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
      type: [Number, String],
      default: Date.now(),
    },
  },
  watch: {
    show(has) {
      this.open = has;
    },
    now() {
      const { now } = this;

      this.current = timestamp(now) ? timestamp(now) : now;
      this.init();
    },
    showTime(time) {
      this.isShowTime = time;
    },
  },
  data() {
    const { now, showTime, show } = this;
    const dateUnits = { year: '年', month: '月', day: '日', hour: '时', minute: '分', second: '秒' };
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const hours = [0, 23];
    const minutes = [0, 59];
    const months = [0, 11];
    const seconds = [0, 59];
    const showDate = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    const weekList = ['日', '一', '二', '三', '四', '五', '六'];
    const years = [1900, 9999];

    return {
      cols: 7,
      current: now,
      currentInput: null, // 用于处理组件更新问题
      currentYear: null,
      dateUnits,
      dayList: [],
      days,
      hourList: [],
      hours,
      isMoveOver: 0,
      isShowTime: showTime,
      minuteList: [],
      minutes,
      monthList: [],
      months,
      nowDay: null,
      nowHour: null,
      nowMinute: null,
      nowMonth: null,
      nowSecond: null,
      open: show,
      secondList: [],
      seconds,
      selectYearScope: [null, null],
      showDate,
      weekList,
      yearList: [],
      years,
    };
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  updated() {
    if (!this.open) {
      this.$emit('autoHide');
    }
  },
  computed: {
    getCurrent() {
      const { current, isShowTime } = this;

      if (eq(current, '')) return current;

      const format = isShowTime ? 'YYYY-MM-DD HH:II:SS' : 'YYYY-MM-DD';

      return dateFormat(format, current);
    },
  },
  methods: {
    init() {
      this.yearScope();
      this.monthScope();
      this.dayScope();
      this.hourScope();
      this.minuteScope();
      this.secondScope();
      this.setHideListener();
      this.$emit('init', this.current);
    },
    leaveHere() {
      this.open = false;
    },
    formatCurrent(y, m, d, h, i, s) {
      return timestamp(this.isShowTime ?
        `${y}/${m}/${d} ${h}:${i}:${s}` :
        `${y}/${m}/${d}`);
    },
    // 输入框编辑编辑中
    editCurrent(v) {
      this.currentInput = v;
    },
    overDone(v) {
      const {
        currentYear,
        days,
        hours,
        minutes,
        months,
        nowDay,
        nowHour,
        nowMinute,
        nowMonth,
        nowSecond,
        seconds,
        years,
      } = this;

      // 校验格式为2018/5/5
      if (v.indexOf('/') >= 0) {
        const vgroup = v.split('/');
        let vstr = '';

        vgroup.map((numStr) => {
          vstr = vstr + (Number(numStr) < 10 ? `0${numStr}` : numStr);
          return numStr;
        });

        v = vstr;
      }

      let val = v.replace(/[^0-9]/g, '');
      let y = val.substr(0, 4);
      let m = val.substr(4, 2);
      let d = val.substr(6, 2);
      let h = val.substr(8, 2);
      let i = val.substr(10, 2);
      let s = val.substr(12, 2);

      if (!y || y.length < 4) y = currentYear;
      if (!m || m.length < 1) m = nowMonth;
      if (!d || d.length < 1) d = nowDay;
      if (!h || h.length < 1) h = nowHour;
      if (!i || i.length < 1) i = nowMinute;
      if (!s || s.length < 1) s = nowSecond;

      if (y < years[0]) y = years[0];
      if (y > years[1]) y = years[1];
      if (m < months[0] + 1) m = months[0] + 1;
      if (m > months[1] + 1) m = months[1] + 1;
      if (d < 1) d = 1;

      if (h < hours[0]) h = hours[0];
      if (h > hours[1]) h = hours[1];
      if (i < minutes[0]) i = minutes[0];
      if (i > minutes[1]) i = minutes[1];
      if (s < seconds[0]) s = seconds[0];
      if (s > seconds[1]) s = seconds[1];

      if (((y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0)) && m === 2) {
        if (d > 29) d = 29;
      } else {
        if (d > days[m - 1]) d = days[m - 1];
      }

      this.currentInput = null;
      this.current = this.formatCurrent(y, m, d, h, i, s);
      this.init();
    },
    // 输入框编辑完成时
    editOver(v) {
      this.overDone(v);
      this.$emit('change', this.current);
    },
    done() {
      this.$emit('done', this.current);
    },
    // 获得当前选择
    getNow(type) {
      return this[`now${firstUppercase(type)}`];
    },
    // 获得编辑状态
    getEditStatus(type) {
      return this[`hasEdit${firstUppercase(type)}`];
    },
    // 去编辑
    toEdit(type, has) {
      this[`hasEdit${firstUppercase(type)}`] = has;
    },
    // 返回今天
    today() {
      const td = now();
      const d = td.day;
      const h = td.hour;
      const i = td.minute;
      const m = td.month;
      const s = td.second;
      const y = td.year;

      this.current = this.formatCurrent(y, m, d, h, i, s);
      this.init();
      this.$emit('change', this.current);
    },
    // 所选日期
    choose(type, number) {
      const { years, months, days, hours, minutes, seconds } = this;
      let d = eq(type, 'day') ? number : this.nowDay;
      let h = eq(type, 'hour') ? number : this.nowHour;
      let i = eq(type, 'minute') ? number : this.nowMinute;
      let m = eq(type, 'month') ? number : this.nowMonth;
      let s = eq(type, 'second') ? number : this.nowSecond;
      let y = eq(type, 'year') ? number : this.currentYear;

      if (y < years[0]) y = years[0];
      if (y > years[1]) y = years[1];
      if (m < months[0] + 1) m = months[0] + 1;
      if (m > months[1] + 1) m = months[1] + 1;
      if (d < 1) d = 1;

      if (h < hours[0]) h = hours[0];
      if (h > hours[1]) h = hours[1];
      if (i < minutes[0]) i = minutes[0];
      if (i > minutes[1]) i = minutes[1];
      if (s < seconds[0]) s = seconds[0];
      if (s > seconds[1]) s = seconds[1];

      if (((y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0)) && m === 2) {
        if (d > 29) d = 29;
      } else {
        if (d > days[m - 1]) d =  days[m - 1];
      }

      this.current = this.formatCurrent(y, m, d, h, i, s);

      this.init();
      this.$emit('change', this.current);
    },
    // 关闭
    close() {
      this.open = false;

      this.$emit('close', this.open);
    },
    // 可选时
    hourScope() {
      const { current, isShowTime, hours } = this;
      const hour = (new Date(current)).getHours();
      const list = [];

      for(let i = hours[0]; i <= hours[1]; i++) {
        list.push({
          value: `${i}时`,
          key: i,
        });
      }

      this.hourList = list;
      this.nowHour = !isShowTime ? 0 : hour;
    },
    // 可选分
    minuteScope() {
      const { current, isShowTime, minutes } = this;
      const minute = (new Date(current)).getMinutes();
      const list = [];

      for(let i = minutes[0]; i <= minutes[1]; i++) {
        list.push({
          value: `${i}分`,
          key: i,
        });
      }

      this.minuteList = list;
      this.nowMinute = !isShowTime ? 0 : minute;
    },
    // 可选秒
    secondScope() {
      const { current, isShowTime, seconds } = this;
      const second = (new Date(current)).getSeconds();
      const list = [];

      for(let i = seconds[0]; i <= seconds[1]; i++) {
        list.push({
          value: `${i}秒`,
          key: i,
        });
      }

      this.secondList = list;
      this.nowSecond = !isShowTime ? 0 : second;
    },
    // 可选年份
    yearScope() {
      const { years, yearScope, current, selectYearScope } = this;
      const date = new Date(current);
      const currentYear = date.getFullYear();
      const nowYear = new Date().getFullYear();
      const amount = (currentYear + 150) - 1900;
      const min = years[0];
      const max = years[1];
      let list = [];

      if (empty(this.yearList)) {
        let start = selectYearScope[0];
        let end = selectYearScope[1];

        if (eq(selectYearScope[0], null)) start = nowYear - Math.floor(amount / 2);
        if (eq(selectYearScope[1], null)) end = nowYear + Math.floor(amount / 2);
        if (start < min) start = min;
        if (end > max) end = max;

        for(let i = start; i <= end; i++) {
          list.push({
            value: `${i}年`,
            key: i,
          });
        }

        this.selectYearScope = [start, end];
      } else {
        list = this.yearList;
      }

      this.yearList = list;
      this.currentYear = currentYear;
    },
    // 可选月份
    monthScope() {
      const { months, current } = this;
      const amount = 12;
      const min = months[0] + 1;
      const max = months[1] + 1;
      const list = [];
      const date = new Date(current);
      const nowMonth = date.getMonth() + 1;

      for(let i = min; i <= max; i++) {
        list.push({
          value: `${i}月`,
          key: i,
        });
      }

      this.monthList = list;
      this.nowMonth = nowMonth;
    },
    //可选日期范围
    dayScope() {
      const { days, current } = this;
      const date = new Date(current);
      const currentYear = date.getFullYear();
      const nowMonth = date.getMonth() + 1;
      const nowDay = date.getDate();
      const firstWeek = week(`${currentYear}/${nowMonth}/1`);
      const min = 1;
      const max = days[nowMonth - 1] + firstWeek;
      const cols = this.cols;
      const list = [];
      let grid = 0;
      let line = [];

      for (let i = min; i <= max; i++) {
        grid++;

        if (i <= firstWeek) {
          line.push(null);
          continue;
        }

        line.push(i - firstWeek);

        if (or([
          eq(grid % cols, 0),
          eq(max, i)],
        )) {
          list.push([].concat(line));
          line = [];
        }
      }

      this.dayList = list;
      this.nowDay = nowDay;
    }
  },
};
</script>
