const util = window.$util;
const methods = {
  init() {
    this.yearScope();
    this.monthScope();
    this.dayScope();
    this.hourScope();
    this.minuteScope();
    this.secondScope();
    this.bindMouseMenus();
  },
  formatCurrent(y, m, d, h, i, s) {
    const date = this.hasShowTime ? `${y}/${m}/${d} ${h}:${i}:${s}` : `${y}/${m}/${d}`;
    return util.Date.timestamp(date);
  },
  // 输入框编辑编辑中
  editCurrent(v) {
    this.currentInput = v;
  },
  // 输入框编辑完成时
  editOver(v) {
    const {
      nowYear,
      nowMonth,
      nowDay,
      nowHour,
      nowMinute,
      nowSecond,
      years,
      months,
      days,
      hours,
      minutes,
      seconds
    } = this;

    let val = v.replace(/[^0-9]/g, '');
    let y = val.substr(0, 4);
    let m = val.substr(4, 2);
    let d = val.substr(6, 2);
    let h = val.substr(8, 2);
    let i = val.substr(10, 2);
    let s = val.substr(12, 2);

    if (!y || y.length < 4) y = nowYear;
    if (!m || m.length < 1) m = nowMonth;
    if (!d || d.length < 1) d = nowDay;
    if (!h || h.length < 1) h = nowHour;
    if (!i || i.length < 1) i = nowMinute;
    if (!s || s.length < 1) s = nowSecond;

    if (y < years[0]) y = nowYear;
    if (y > years[1]) y = nowYear;
    if (m < months[0]) m = nowMonth;
    if (m > months[1]) m = nowMonth;
    if (d < 1) d = nowDay;
    if (h < hours[0]) h = nowHour;
    if (h > hours[1]) h = nowHour;
    if (i < minutes[0]) i = nowMinute;
    if (i > minutes[1]) i = nowMinute;
    if (s < seconds[0]) s = nowSecond;
    if (s > seconds[1]) s = nowSecond;
    if ((y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0)) {
      if (d > 29) d = nowDay;
    } else {
      if (d > days[m]) d = nowDay;
    }

    this.currentInput = null;
    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.init();
    this.$emit('change', this.current);
  },
  // 获得当前选择
  getNow(type) {
    return this[`now${util.String.firstUppercase(type)}`];
  },
  // 获得编辑状态
  getEditStatus(type) {
    return this[`hasEdit${util.String.firstUppercase(type)}`];
  },
  // 去编辑
  toEdit(type, has) {
    this[`hasEdit${util.String.firstUppercase(type)}`] = has;
  },
  // 是否移离当前组件
  mousePos(has) {
    this.isMoveOver = has;
  },
  // 绑定移离事件
  bindMouseMenus() {
    if (!this.isBindMouseMenus && !this.hasNoAutoHide) {
      window.addEventListener('click', () => {
        if (!this.isMoveOver) this.open = false;
      }, true);
      this.isBindMouseMenus = true;
    }
  },
  // 上个时间
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

    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.init();
    this.$emit('change', this.current);
  },
  // 下个时间
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

    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.init();
    this.$emit('change', this.current);
  },
  // 上一年
  prevYear() {
    const y = this.nowYear - 21;
    const m = this.nowMonth;
    const d = this.nowDay;
    const h = this.nowHour;
    const i = this.nowMinute;
    const s = this.nowSecond;

    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.selectYearScope = [null, null];
    this.yearList = [];

    this.init();
    this.$emit('change', this.current);
  },
  // 下一年
  nextYear() {
    const y = this.nowYear + 21;
    const m = this.nowMonth;
    const d = this.nowDay;
    const h = this.nowHour;
    const i = this.nowMinute;
    const s = this.nowSecond;

    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.selectYearScope = [null, null];
    this.yearList = [];

    this.init();
    this.$emit('change', this.current);
  },
  // 返回今天
  today() {
    const td = util.Date.now();
    const y = td.year;
    const m = td.month;
    const d = td.day;
    const h = td.hour;
    const i = td.minute;
    const s = td.second;

    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.init();
    this.$emit('change', this.current);
  },
  // 所选日期
  choose(type, number) {
    const { years, months, days, hours, minutes, seconds } = this;
    let y = type === 'year' ? number : this.nowYear;
    let m = type === 'month' ? number : this.nowMonth;
    let d = type === 'day' ? number : this.nowDay;
    let h = type === 'hour' ? number : this.nowHour;
    let i = type === 'minute' ? number : this.nowMinute;
    let s = type === 'second' ? number : this.nowSecond;

    if (y < years[0]) y = this.nowYear;
    if (y > years[1]) y = this.nowYear;
    if (m < months[0]) m = this.nowMonth;
    if (m > months[1]) m = this.nowMonth;
    if (d < 1) d = this.nowDay;
    if ((y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0)) {
      if (d > 29) d = this.nowDay;
    } else {
      if (d > days[m]) d = this.nowDay;
    }
    if (h < hours[0]) h = this.nowHour;
    if (h > hours[1]) h = this.nowHour;
    if (i < minutes[0]) i = this.nowMinute;
    if (i > minutes[1]) i = this.nowMinute;
    if (s < seconds[0]) s = this.nowSecond;
    if (s > seconds[1]) s = this.nowSecond;

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
    const { current, hasShowTime, hours } = this;
    const hour = (new Date(current)).getHours();
    const list = [];

    for(let i = hours[0]; i <= hours[1]; i++) {
      list.push({
        name: `${i}时`,
        key: i,
      });
    }

    this.hourList = list;
    this.nowHour = !hasShowTime ? 0 : hour;
  },
  // 可选分
  minuteScope() {
    const { current, hasShowTime, minutes } = this;
    const minute = (new Date(current)).getMinutes();
    const list = [];

    for(let i = minutes[0]; i <= minutes[1]; i++) {
      list.push({
        name: `${i}分`,
        key: i,
      });
    }

    this.minuteList = list;
    this.nowMinute = !hasShowTime ? 0 : minute;
  },
  // 可选秒
  secondScope() {
    const { current, hasShowTime, seconds } = this;
    const second = (new Date(current)).getSeconds();
    const list = [];

    for(let i = seconds[0]; i <= seconds[1]; i++) {
      list.push({
        name: `${i}秒`,
        key: i,
      });
    }

    this.secondList = list;
    this.nowSecond = !hasShowTime ? 0 : second;
  },
  // 可选年份
  yearScope() {
    const { years, yearScope, current, selectYearScope } = this;
    const date = new Date(current);
    const nowYear = date.getFullYear();
    const amount = (nowYear + 150) - 1900;
    const min = years[0];
    const max = years[1];
    let list = [];

    if (util.Assert.hasEmpty(this.yearList)) {
      let start = selectYearScope[0];
      let end = selectYearScope[1];

      if (selectYearScope[0] === null) start = nowYear - Math.floor(amount / 2);
      if (selectYearScope[1] === null) end = nowYear + Math.floor(amount / 2);
      if (start < min) start = min;
      if (end > max) end = max;

      for(let i = start; i <= end; i++) {
        list.push({
          name: `${i}年`,
          key: i,
        });
      }

      this.selectYearScope = [start, end];
    } else {
      list = this.yearList;
    }

    this.yearList = list;
    this.nowYear = nowYear;
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
        name: `${i}月`,
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
};

export default {
  methods,
};
