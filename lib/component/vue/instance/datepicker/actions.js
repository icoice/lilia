'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var util = window.$util;
var methods = {
  init: function init() {
    this.yearScope();
    this.monthScope();
    this.dayScope();
    this.hourScope();
    this.minuteScope();
    this.secondScope();
    this.bindMouseMenus();
  },
  formatCurrent: function formatCurrent(y, m, d, h, i, s) {
    var date = this.hasShowTime ? y + '/' + m + '/' + d + ' ' + h + ':' + i + ':' + s : y + '/' + m + '/' + d;
    return util.Date.timestamp(date);
  },
  editCurrent: function editCurrent(v) {
    this.currentInput = v;
  },
  editOver: function editOver(v) {
    var nowYear = this.nowYear,
        nowMonth = this.nowMonth,
        nowDay = this.nowDay,
        nowHour = this.nowHour,
        nowMinute = this.nowMinute,
        nowSecond = this.nowSecond,
        years = this.years,
        months = this.months,
        days = this.days,
        hours = this.hours,
        minutes = this.minutes,
        seconds = this.seconds;


    var val = v.replace(/[^0-9]/g, '');
    var y = val.substr(0, 4);
    var m = val.substr(4, 2);
    var d = val.substr(6, 2);
    var h = val.substr(8, 2);
    var i = val.substr(10, 2);
    var s = val.substr(12, 2);

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
    if (y % 100 !== 0 && y % 4 === 0 || y % 400 === 0) {
      if (d > 29) d = nowDay;
    } else {
      if (d > days[m]) d = nowDay;
    }

    this.currentInput = null;
    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.init();
    this.$emit('change', this.current);
  },
  getNow: function getNow(type) {
    return this['now' + util.String.firstUppercase(type)];
  },
  getEditStatus: function getEditStatus(type) {
    return this['hasEdit' + util.String.firstUppercase(type)];
  },
  toEdit: function toEdit(type, has) {
    this['hasEdit' + util.String.firstUppercase(type)] = has;
  },
  mousePos: function mousePos(has) {
    this.isMoveOver = has;
  },
  bindMouseMenus: function bindMouseMenus() {
    var _this = this;

    if (!this.isBindMouseMenus && this.hasAutoHidden) {
      window.addEventListener('click', function () {
        if (!_this.isMoveOver) _this.open = false;
      }, true);
      this.isBindMouseMenus = true;
    }
  },
  prevTime: function prevTime(type) {
    var y = type === 'year' ? this.nowYear - 1 : this.nowYear;
    var m = type === 'month' ? this.nowMonth - 1 : this.nowMonth;
    var d = type === 'day' ? this.nowDay - 1 : this.nowDay;
    var h = type === 'hour' ? this.nowHour - 1 : this.nowHour;
    var i = type === 'minute' ? this.nowMinute - 1 : this.nowMinute;
    var s = type === 'second' ? this.nowSecond - 1 : this.nowSecond;

    var months = this.months,
        selectYearScope = this.selectYearScope,
        days = this.days,
        years = this.years;


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
  nextTime: function nextTime(type) {
    var y = type === 'year' ? this.nowYear + 1 : this.nowYear;
    var m = type === 'month' ? this.nowMonth + 1 : this.nowMonth;
    var d = type === 'day' ? this.nowDay + 1 : this.nowDay;
    var h = type === 'hour' ? this.nowHour + 1 : this.nowHour;
    var i = type === 'minute' ? this.nowMinute + 1 : this.nowMinute;
    var s = type === 'second' ? this.nowSecond + 1 : this.nowSecond;

    var months = this.months,
        selectYearScope = this.selectYearScope,
        days = this.days,
        years = this.years;


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
  prevYear: function prevYear() {
    var y = this.nowYear - 21;
    var m = this.nowMonth;
    var d = this.nowDay;
    var h = this.nowHour;
    var i = this.nowMinute;
    var s = this.nowSecond;

    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.selectYearScope = [null, null];
    this.yearList = [];

    this.init();
    this.$emit('change', this.current);
  },
  nextYear: function nextYear() {
    var y = this.nowYear + 21;
    var m = this.nowMonth;
    var d = this.nowDay;
    var h = this.nowHour;
    var i = this.nowMinute;
    var s = this.nowSecond;

    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.selectYearScope = [null, null];
    this.yearList = [];

    this.init();
    this.$emit('change', this.current);
  },
  today: function today() {
    var td = util.Date.now();
    var y = td.year;
    var m = td.month;
    var d = td.day;
    var h = td.hour;
    var i = td.minute;
    var s = td.second;

    this.current = this.formatCurrent(y, m, d, h, i, s);
    this.init();
    this.$emit('change', this.current);
  },
  choose: function choose(type, number) {
    var years = this.years,
        months = this.months,
        days = this.days,
        hours = this.hours,
        minutes = this.minutes,
        seconds = this.seconds;

    var y = type === 'year' ? number : this.nowYear;
    var m = type === 'month' ? number : this.nowMonth;
    var d = type === 'day' ? number : this.nowDay;
    var h = type === 'hour' ? number : this.nowHour;
    var i = type === 'minute' ? number : this.nowMinute;
    var s = type === 'second' ? number : this.nowSecond;

    if (y < years[0]) y = this.nowYear;
    if (y > years[1]) y = this.nowYear;
    if (m < months[0]) m = this.nowMonth;
    if (m > months[1]) m = this.nowMonth;
    if (d < 1) d = this.nowDay;
    if (y % 100 !== 0 && y % 4 === 0 || y % 400 === 0) {
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
  close: function close() {
    this.open = false;
    this.$emit('close', this.open);
  },
  hourScope: function hourScope() {
    var current = this.current,
        hasShowTime = this.hasShowTime,
        hours = this.hours;

    var hour = new Date(current).getHours();
    var list = [];

    for (var i = hours[0]; i <= hours[1]; i++) {
      list.push({
        name: i + '\u65F6',
        key: i
      });
    }

    this.hourList = list;
    this.nowHour = !hasShowTime ? 0 : hour;
  },
  minuteScope: function minuteScope() {
    var current = this.current,
        hasShowTime = this.hasShowTime,
        minutes = this.minutes;

    var minute = new Date(current).getMinutes();
    var list = [];

    for (var i = minutes[0]; i <= minutes[1]; i++) {
      list.push({
        name: i + '\u5206',
        key: i
      });
    }

    this.minuteList = list;
    this.nowMinute = !hasShowTime ? 0 : minute;
  },
  secondScope: function secondScope() {
    var current = this.current,
        hasShowTime = this.hasShowTime,
        seconds = this.seconds;

    var second = new Date(current).getSeconds();
    var list = [];

    for (var i = seconds[0]; i <= seconds[1]; i++) {
      list.push({
        name: i + '\u79D2',
        key: i
      });
    }

    this.secondList = list;
    this.nowSecond = !hasShowTime ? 0 : second;
  },
  yearScope: function yearScope() {
    var years = this.years,
        yearScope = this.yearScope,
        current = this.current,
        selectYearScope = this.selectYearScope;

    var date = new Date(current);
    var nowYear = date.getFullYear();
    var amount = nowYear + 150 - 1900;
    var min = years[0];
    var max = years[1];
    var list = [];

    if (util.Assert.hasEmpty(this.yearList)) {
      var start = selectYearScope[0];
      var end = selectYearScope[1];

      if (selectYearScope[0] === null) start = nowYear - Math.floor(amount / 2);
      if (selectYearScope[1] === null) end = nowYear + Math.floor(amount / 2);
      if (start < min) start = min;
      if (end > max) end = max;

      for (var i = start; i <= end; i++) {
        list.push({
          name: i + '\u5E74',
          key: i
        });
      }

      this.selectYearScope = [start, end];
    } else {
      list = this.yearList;
    }

    this.yearList = list;
    this.nowYear = nowYear;
  },
  monthScope: function monthScope() {
    var months = this.months,
        current = this.current;

    var amount = 12;
    var min = months[0] + 1;
    var max = months[1] + 1;
    var list = [];
    var date = new Date(current);
    var nowMonth = date.getMonth() + 1;

    for (var i = min; i <= max; i++) {
      list.push({
        name: i + '\u6708',
        key: i
      });
    }

    this.monthList = list;
    this.nowMonth = nowMonth;
  },
  dayScope: function dayScope() {
    var days = this.days,
        current = this.current;

    var date = new Date(current);
    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth() + 1;
    var nowDay = date.getDate();
    var firstWeek = util.Date.week(nowYear + '/' + nowMonth + '/1');
    var min = 1;
    var max = days[nowMonth - 1] + firstWeek;
    var cols = this.cols;
    var list = [];
    var grid = 0;
    var line = [];

    for (var i = min; i <= max; i++) {
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

exports.default = {
  methods: methods
};