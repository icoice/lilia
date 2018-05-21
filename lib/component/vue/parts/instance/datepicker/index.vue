<template>
  <div v-if="open" class="moo moo-datepicker">
    <div class="datepicker-nav">
      <btn @tap="today">
        <span slot="btn">今天</span>
      </btn>
      <btn @tap='close'>
        <span class="iconfont icon-close" slot="btn"></span>
      </btn>
      <btn @tap='clearDate()'>
        <span class="iconfont icon-brush" slot="btn"></span>
      </btn>
    </div>
    <div class="datepicker-area">
      <div class="area-list">
        <div class="area-title">
          <div class="left">
            <moo-btn>
              <span slot="btn">&nbsp;</span>
            </moo-btn>
          </div>
          <div class="right">
            <moo-btn @tap="e => prevTime('year')">
              <span slot="btn" class="iconfont2 icon2-arrow-left1"></span>
            </moo-btn>
            <moo-btn @tap="showArea('year')">
              <span slot="btn">{{ nowYear }}年</span>
            </moo-btn>
            <moo-btn @tap="e => nextTime('year')">
              <span slot="btn" class="iconfont2 icon2-arrow-right1"></span>
            </moo-btn>
          </div>
        </div>
        <div class="area-title" :class="{'area-hidden': !showMonth}">
          <div class="left">
            <moo-btn>
              <span slot="btn">&nbsp;</span>
            </moo-btn>
          </div>
          <div class="right">
            <moo-btn @tap="e => prevTime('month')">
              <span slot="btn" class="iconfont2 icon2-arrow-left1"></span>
            </moo-btn>
            <moo-btn @tap="showArea('month')">
              <span slot="btn">{{ nowMonth }}月</span>
            </moo-btn>
            <moo-btn @tap="e => nextTime('month')">
              <span slot="btn" class="iconfont2 icon2-arrow-right1"></span>
            </moo-btn>
          </div>
        </div>
        <div class="area-title">
          <div class="left">
            <moo-btn>
              <span slot="btn">&nbsp;</span>
            </moo-btn>
          </div>
          <div class="right">
            <moo-btn @tap="e => prevTime('day')">
              <span slot="btn" class="iconfont2 icon2-arrow-left1"></span>
            </moo-btn>
            <moo-btn>
              <span slot="btn">{{ nowDay }}日</span>
            </moo-btn>
            <moo-btn @tap="e => nextTime('day')">
              <span slot="btn" class="iconfont2 icon2-arrow-right1"></span>
            </moo-btn>
          </div>
        </div>
      </div>
      <div class="area-list" v-if="hasCloseTime">
        <div class="area-title">
          <div class="left">
            <moo-btn>
              <span slot="btn">&nbsp;</span>
            </moo-btn>
          </div>
          <div class="right">
            <moo-btn @tap="e => prevTime('hour')">
              <span slot="btn" class="iconfont2 icon2-arrow-left1"></span>
            </moo-btn>
            <moo-btn>
              <span slot="btn">{{ nowHour }}时</span>
            </moo-btn>
            <moo-btn @tap="e => nextTime('hour')">
              <span slot="btn" class="iconfont2 icon2-arrow-right1"></span>
            </moo-btn>
          </div>
        </div>
        <div class="area-title">
          <div class="left">
            <moo-btn>
              <span slot="btn">&nbsp;</span>
            </moo-btn>
          </div>
          <div class="right">
            <moo-btn @tap="e => prevTime('minute')">
              <span slot="btn" class="iconfont2 icon2-arrow-left1"></span>
            </moo-btn>
            <moo-btn>
              <span slot="btn">{{ nowMinute }}分</span>
            </moo-btn>
            <moo-btn @tap="e => nextTime('minute')">
              <span slot="btn" class="iconfont2 icon2-arrow-right1"></span>
            </moo-btn>
          </div>
        </div>
        <div class="area-title">
          <div class="left">
            <moo-btn>
              <span slot="btn">&nbsp;</span>
            </moo-btn>
          </div>
          <div class="right">
            <moo-btn @tap="e => prevTime('second')">
              <span slot="btn" class="iconfont2 icon2-arrow-left1"></span>
            </moo-btn>
            <moo-btn>
              <span slot="btn">{{ nowSecond }}秒</span>
            </moo-btn>
            <moo-btn @tap="e => nextTime('second')">
              <span slot="btn" class="iconfont2 icon2-arrow-right1"></span>
            </moo-btn>
          </div>
        </div>
      </div>
      <div class="datepicker-items" v-if="showYear">
        <div class="row">
          <ul v-for="line in yearList">
            <li v-for="year in line" :class="{'select': year === nowYear}">
              <btn @tap="e => choose('year', year)">
                <span slot="btn">
                  {{ year }}
                </span>
              </btn>
            </li>
          </ul>
        </div>
        <div class="datepicker-items-operator">
          <btn @tap="PrevYear">
            <span slot="btn">上一页</span>
          </btn>
          <btn @tap="NextYear">
            <span slot="btn">下一页</span>
          </btn>
        </div>
      </div>
      <div class="datepicker-items" v-if="showMonth">
        <div class="row">
          <ul v-for="line in monthList">
            <li v-for="month in line" :class="{'select': month === nowMonth}">
              <btn @tap="e => choose('month', month)">
                <span slot="btn">
                  {{ month }}
                </span>
              </btn>
            </li>
          </ul>
        </div>
      </div>
      <div class="datepicker-items">
        <div class="row datepicker-week">
          <ul>
            <li v-for="week in weekList">
              {{ week }}
            </li>
          </ul>
        </div>
        <div class="row datepicker-day">
          <ul v-for="line in dayList">
            <li v-for="day in line" :class="{'select': day === nowDay}">
              <btn @tap="e => (day && choose('day', day))">
                <span slot="btn">
                  {{ day === null ? '&nbsp;' : day }}
                </span>
              </btn>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../../../../../util';
  import btn from '../../common/button';

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
      closeTime: {
        type: Boolean,
        default: false,
      },
      now: {
        type: Number,
        default: Date.now(),
      },
    },
    watch: {
      show(has) {
        this.open = has;
        // 重置 年 月选择框
        if (has === true) {
          this.showYear = false;
          this.showMonth = false;
        }
      },
      now() {
        this.current = this.now;
        this.init();
      },
      closeTime(time) {
        this.hasCloseTime = time;
      },
    },
    data() {
      return {
        keyMap,
        current: this.now,
        open: this.show,
        years: [0, 9999],
        months: [0, 11],
        hours: [0, 23],
        minutes: [0, 59],
        seconds: [0, 59],
        nowYear: null,
        nowMonth: null,
        nowDay: null,
        nowHour: null,
        nowMinute: null,
        nowSecond: null,
        showYear: false,
        showMonth: false,
        hasCloseTime: this.closeTime,
        selectYearScope: [null, null],
        yearList: [],
        monthList: [],
        dayList: [],
        days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        weekList: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        cols: 7,
      };
    },
    components: {
      btn,
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.yearScope();
        this.monthScope();
        this.dayScope();
        this.hourScope();
        this.minuteScope();
        this.secondScope();
      },
      showArea(type) {
        switch (type) {
          case 'year': this.showYear = !this.showYear;
          break;
          case 'month': this.showMonth = !this.showMonth;
          break;
          default:
        }
      },
      prevTime(type) {
        let y = type === 'year' ? this.nowYear - 1 : this.nowYear;
        let m = type === 'month' ? this.nowMonth - 1 : this.nowMonth;
        let d = type === 'day' ? this.nowDay - 1 : this.nowDay;
        let h = type === 'hour' ? this.nowHour - 1 : this.nowHour;
        let i = type === 'minute' ? this.nowMinute - 1 : this.nowMinute;
        let s = type === 'second' ? this.nowSecond - 1 : this.nowSecond;
        const { months, selectYearScope, days, years } = this;
        if (d <= 0) {
          m = m - 1;
          d = days[m - 1];
        }
        if (m <= months[0]) {
          this.yearList = [];
          y = y - 1;
          m = months[1] + 1;
          if (!d || d > days[m - 1]) d = days[m - 1];
        }
        if (y < selectYearScope[0] && y > years[0] + 21) {
          this.yearList = [];
          this.selectYearScope = [y - 20, y];
        }
        if (y < years[0]) y = years[0];
        if (h <= 0) h = 23;
        if (i <= 1) i = 59;
        if (s <= 1) s = 59;
        this.current = util.Date.timestamp(`${y}/${m}/${d} ${h}:${i}:${s}`);
        this.init();
        this.$emit('change', this.current);
      },
      nextTime(type) {
        let y = type === 'year' ? this.nowYear + 1 : this.nowYear;
        let m = type === 'month' ? this.nowMonth + 1 : this.nowMonth;
        let d = type === 'day' ? this.nowDay + 1 : this.nowDay;
        let h = type === 'hour' ? this.nowHour + 1 : this.nowHour;
        let i = type === 'minute' ? this.nowMinute + 1 : this.nowMinute;
        let s = type === 'second' ? this.nowSecond + 1 : this.nowSecond;
        const { months, selectYearScope, days, years } = this;
        if (d > days[m - 1]) {
          m = m + 1;
          d = 1;
        }
        if (m > months[1] + 1) {
          this.yearList = [];
          y = y + 1;
          m = months[0] + 1;
          if (d > days[m - 1]) d = day[m - 1];
        }
        if (y > years[1]) {
          this.yearList = [];
          y = years[1];
        }
        if (y > selectYearScope[1] && y <= years[1] - 21) {
          this.yearList = [];
          this.selectYearScope = [y + 20, y];
        }
        if (h >= 24) h = 0;
        if (i >= 59) i = 1;
        if (s >= 59) s = 1;
        this.current = util.Date.timestamp(`${y}/${m}/${d} ${h}:${i}:${s}`);
        this.init();
        this.$emit('change', this.current);
      },
      PrevYear() {
        const y = this.nowYear - 21;
        const m = this.nowMonth;
        const d = this.nowDay;
        const h = this.nowHour;
        const i = this.nowMinute;
        const s = this.nowSecond;
        this.current = util.Date.timestamp(`${y}/${m}/${d} ${h}:${i}:${s}`);
        this.selectYearScope = [null, null];
        this.yearList = [];
        this.init();
        this.$emit('change', this.current);
      },
      NextYear() {
        const y = this.nowYear + 21;
        const m = this.nowMonth;
        const d = this.nowDay;
        const h = this.nowHour;
        const i = this.nowMinute;
        const s = this.nowSecond;
        this.current = util.Date.timestamp(`${y}/${m}/${d} ${h}:${i}:${s}`);
        this.selectYearScope = [null, null];
        this.yearList = [];
        this.init();
        this.$emit('change', this.current);
      },
      close() {
        this.open = false;
        this.$emit('close', this.open);
      },
      today() {
        const td = util.Date.now();
        const y = td.year;
        const m = td.month;
        const d = td.day;
        const h = td.hour;
        const i = td.minute;
        const s = td.second;
        this.current = util.Date.timestamp(`${y}/${m}/${d} ${h}:${i}:${s}`);
        this.init();
        this.$emit('change', this.current);
      },
      clearDate() {
        this.$emit('clear', null);
      },
      choose(type, number) {
        const y = type === 'year' ? number : this.nowYear;
        const m = type === 'month' ? number : this.nowMonth;
        const d = type === 'day' ? number : this.nowDay;
        const h = type === 'year' ? number : this.nowHour;
        const i = type === 'month' ? number : this.nowMinute;
        const s = type === 'second' ? number : this.nowSecond;
        this.current = util.Date.timestamp(`${y}/${m}/${d} ${h}:${i}:${s}`);
        this.init();
        this.$emit('change', this.current);
      },
      hourScope() {
        const { current, hasCloseTime } = this;
        const hour = (new Date(current)).getHours();
        this.nowHour = !hasCloseTime ? 0 : hour;
      },
      minuteScope() {
        const { current, hasCloseTime } = this;
        const minute = (new Date(current)).getMinutes();
        this.nowMinute = !hasCloseTime ? 0 : minute;
      },
      secondScope() {
        const { current, hasCloseTime } = this;
        const second = (new Date(current)).getSeconds();
        this.nowSecond = !hasCloseTime ? 0 : second;
      },
      yearScope() {
        const { years, yearScope, current, selectYearScope } = this;
        const amount = 21;
        const cols = this.cols;
        const min = years[0];
        const max = years[1];
        const date = new Date(current);
        const nowYear = date.getFullYear();
        let list = [];

        if (util.Assert.hasEmpty(this.yearList)) {
          let start = selectYearScope[0] === null ? nowYear - Math.floor(amount / 2) : selectYearScope[0];
          let end = selectYearScope[1] === null ? nowYear + Math.floor(amount / 2) : selectYearScope[1];
          let grid = 0;
          let line = [];

          if (start < min) start = min;
          if (end > max) end = max;

          for(let i = start; i <= end; i++) {
            grid++;
            line.push(i);
            if ((grid % cols === 0) || (end - i) === 0) {
              list.push([].concat(line));
              line = [];
            }
          }

          this.selectYearScope = [start, end];
        } else {
          list = this.yearList;
        }

        this.yearList = list;
        this.nowYear = nowYear;
      },
      monthScope() {
        const { months, current } = this;
        const amount = 12;
        const cols = this.cols;
        const min = months[0] + 1;
        const max = months[1] + 1;
        const list = [];
        const date = new Date(current);
        const nowMonth = date.getMonth() + 1;
        let grid = 0;
        let line = [];

        for(let i = min; i <= max; i++) {
          grid++;
          line.push(i);
          if (grid % cols === 0 || max - i === 0) {
            list.push([].concat(line));
            line = [];
          }
        }

        this.monthList = list;
        this.nowMonth = nowMonth;
      },
      dayScope() {
        const { days, current } = this;
        const date = new Date(current);
        const nowYear = date.getFullYear();
        const nowMonth = date.getMonth() + 1;
        const nowDay = date.getDate();
        const firstWeek = util.Date.week(`${nowYear}/${nowMonth}/1`);
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
          if (grid % cols === 0 || max - i === 0) {
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
