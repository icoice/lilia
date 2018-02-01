<template>
  <!-- 滑动的效果在H5体验不管怎么弄都不太好，所以制作一个以年代为基准的日期插件 -->
  <div class="vm" v-if="hasOpen">
    <div class="date-selector">
      <div class="date-setting">
        <vm-button @tap="setToday">
          <span slot="button-content">今天</span>
        </vm-button>
        <vm-button @tap="setDate({ year: 2000 })">
          <span slot="button-content">00年代</span>
        </vm-button>
        <vm-button @tap="setDate({ year: 1990 })">
          <span slot="button-content">90年代</span>
        </vm-button>
        <vm-button @tap="setDate({ year: 1980 })">
          <span slot="button-content">80年代</span>
        </vm-button>
        <vm-button @tap="setDate({ year: 1970 })">
          <span slot="button-content">70年代</span>
        </vm-button>
        <vm-button @tap="setDate({ year: 1960 })">
          <span slot="button-content">60年代</span>
        </vm-button>
      </div>

      <div class="date-time-show">
        <div class="date-selector-scope" v-for="(date, unit) in current">
          <!-- 日期 -->
          <div class="date-grid animated fadeIn">
            <span>{{ date }}</span>
          </div>
          <div class="date-operator">
            <!-- 递增 -->
            <vm-button>
              <div slot="button-content"
                class="psm-icon psm-arrow-left"
                @mousedown="e => upBegin(unit)"
                @mousemove="e => e.preventDefault()"
                @mouseup="upOver">
              </div>
            </vm-button>
            <!-- 单位 -->
            <vm-button>
              <div slot="button-content">
                <span class="date-unit">{{ dictionary[unit] }}</span>
              </div>
            </vm-button>
            <!-- 递减 -->
            <vm-button>
              <div slot="button-content"
                class="psm-icon psm-arrow-right"
                @mousedown="e => downBegin(unit)"
                @mousemove="e => e.preventDefault()"
                @mouseup="downOver">
              </div>
            </vm-button>
          </div>
        </div>

        <div class="date-selector-scope date-time-selector"
          v-for="(date, unit) in currentTime"
          v-if="showItems.indexOf('time') >= 0">
          <!-- 时间 -->
          <div class="date-grid animated fadeIn">
            <span>{{ date }}</span>
          </div>
          <div class="date-operator">
            <!-- 递增 -->
            <vm-button>
              <div slot="button-content"
                class="psm-icon psm-arrow-left"
                @mousedown="e => upTimeBegin(unit)"
                @mousemove="e => e.preventDefault()"
                @mouseup="upTimeOver">
              </div>
            </vm-button>
            <!-- 单位 -->
            <vm-button>
              <div slot="button-content">
                <span class="date-unit">{{ dictionary[unit] }}</span>
              </div>
            </vm-button>
            <!-- 递减 -->
            <vm-button>
              <div slot="button-content"
                class="psm-icon psm-arrow-right"
                @mousedown="e => downTimeBegin(unit)"
                @mousemove="e => e.preventDefault()"
                @mouseup="downTimeOver">
              </div>
            </vm-button>
          </div>
        </div>
      </div>

      <div class="date-control">
        <vm-button @tap="closeDate">
          <span slot="button-content">
            关闭
          </span>
        </vm-button>
      </div>
    </div>
  </div>
</template>

<script>
  import vmButton from '../../common/button';

  const getToday = () => {
    const dt = new Date();
    return {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      day: dt.getDate(),
    };
  };

  const getTime = () => {
    const dt = new Date();
    return {
      hour: dt.getHours(),
      minute: dt.getMinutes(),
      second: dt.getSeconds(),
    };
  };

  export default {
    props: {
      open: {
        type: Boolean,
        default: false,
      },
      now: {
        type: Object,
        default: () => Object.assign({}, getToday()),
      },
      nowTime: {
        type: Object,
        default: () => Object.assign({}, getTime()),
      },
      group: {
        type: Array,
        default: () => ['date'],
      },
    },
    watch: {
      now(date) {
        this.current = date;
      },
      group(group) {
        this.items = group;
      },
      open(has) {
        this.hasOpen = has;
      }
    },
    data() {
      return {
        dictionary: {
          year: '年',
          month: '月',
          day: '日',
          hour: '时',
          minute: '分',
          second: '秒',
        },
        showItems: this.group,
        current: this.now,
        currentTime: this.nowTime,
        dayOver: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        upComplete: false,
        upTimeComplete: false,
        downComplete: false,
        downTimeComplete: false,
        hasOpen: this.open,
        hasStop: false,
        timeId: null,
      };
    },
    activated() {
      this.upComplete = false;
      this.downComplete = false;
      this.upTimeComplete = false;
      this.downTimeComplete = false;
      this.clear();
    },
    updated() {
      this.upComplete = false;
      this.downComplete = false;
      this.upTimeComplete = false;
      this.downTimeComplete = false;
    },
    methods: {
      setToday() {
        this.current = getToday();
        this.currentTime = getTime();
        this.$emit('change', this.current);
        this.$emit('changeTime', this.currentTime);
      },
      setDate(date) {
        this.current = Object.assign({}, this.current, date);
        this.$emit('change', this.current);
      },
      closeDate() {
        this.hasOpen = false;
      },
      changeNumber(direct, unit, speed = 1) {
        this.clear();
        this.current[unit] += direct === 'up' ? -1 : 1;
        this.resetDayOver();
        this.resetDay();
        this.timeId = setTimeout(() => this[`${direct}Begin`](unit, speed > 0.3 ? speed - 0.1 : 0.3), 150 * speed < 30 ? 30 : 150 * speed);
        this.$emit('change', this.current);
      },
      changeTimeNumber(direct, unit, speed = 1) {
        this.clear();
        this.currentTime[unit] += direct === 'up' ? -1 : 1;
        this.timeId = setTimeout(() => this[`${direct}TimeBegin`](unit, speed > 0.3 ? speed - 0.1 : 0.3), 150 * speed < 30 ? 30 : 150 * speed);
        this.$emit('changeTime', this.currentTime);
      },
      resetDayOver() {
        const { year } = this.current;
        this.dayOver[1] = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
      },
      resetDay() {
        const dayX = this.dayOver[this.current.month - 1];
        if (dayX < this.current.day) this.current.day = dayX;
      },
      hasOver(direct, unit) {
        const { current, currentTime } = this;
        const { year, month, day } = current;
        const { hour, minute, second } = currentTime;
        const today = getToday();
        const dayX = this.dayOver[month - 1];

        this.clear();
        this.hasStop = true;

        switch (direct) {
          case 'up':
            if (unit === 'year' && year <= 1920) return this.hasStop;
            if (unit === 'month' && month <= 1) return this.hasStop;
            if (unit === 'day' && day <= 1) return this.hasStop;
            if (unit === 'hour' && hour <= 0) return this.hasStop;
            if (unit === 'minute' && minute <= 0) return this.hasStop;
            if (unit === 'second' && second <= 0) return this.hasStop;
            break;
          case 'down':
            if (unit === 'year' && year >= today.year) return this.hasStop;
            if (unit === 'month' && month >= 12) return this.hasStop;
            if (unit === 'day' && day >= dayX) return this.hasStop;
            if (unit === 'hour' && hour >= 23) return this.hasStop;
            if (unit === 'minute' && minute >= 59) return this.hasStop;
            if (unit === 'second' && second >= 59) return this.hasStop;
            break;
          default:
        }
        this.hasStop = false;
        return this.hasStop;
      },
      clear() {
        clearTimeout(this.timeId);
      },
      upBegin(unit, speed) {
        if (this.hasOver('up', unit)) return;
        if (this.upComplete) {
          this.upComplete = false;
          return;
        }
        this.changeNumber('up', unit, speed);
        this.hasStop = true;
      },
      upTimeBegin(unit, speed) {
        if (this.hasOver('up', unit)) return;
        if (this.upTimeComplete) {
          this.upTimeComplete = false;
          return;
        }
        this.changeTimeNumber('up', unit, speed);
        this.hasStop = true;
      },
      upOver() {
        if (!this.hasStop && !this.upComplete) {
          this.upComplete = true;
        } else {
          this.clear();
        }
      },
      upTimeOver() {
        if (!this.hasStop && !this.upTimeComplete) {
          this.upTimeComplete = true;
        } else {
          this.clear();
        }
      },
      downBegin(unit, speed) {
        if (this.hasOver('down', unit)) return;
        if (this.downComplete) {
          this.downComplete = false;
          return;
        }
        this.changeNumber('down', unit, speed);
        this.hasStop = true;
      },
      downTimeBegin(unit, speed) {
        if (this.hasOver('down', unit)) return;
        if (this.downTimeComplete) {
          this.downTimeComplete = false;
          return;
        }
        this.changeTimeNumber('down', unit, speed);
        this.hasStop = true;
      },
      downTimeOver() {
        if (!this.hasStop && !this.downTimeComplete) {
          this.downTimeComplete = true;
        } else {
          this.clear();
        }
      },
      downOver() {
        if (!this.hasStop && !this.downComplete) {
          this.downComplete = true;
        } else {
          this.clear();
        }
      },
    },
  };
</script>
