<template>
  <div class="vp-date animated fadeIn">
    <div class="vp-date-time">
      <div class="vp-date-time-item vp-date-year" @click="selectDateType('year')">
        <p :class="{ 'vp-date-selected': selectType === 'year'}">
          {{base.year.selected}}{{base.year.unit}}
        </p>
      </div>
      <div class="vp-date-time-item vp-date-month" @click="selectDateType('month')">
        <p :class="{ 'vp-date-selected': selectType === 'month'}">
          {{base.month.selected}}{{base.month.unit}}
        </p>
      </div>
      <div class="vp-date-time-item vp-date-day" @click="selectDateType('day')">
        <p :class="{ 'vp-date-selected': selectType === 'day'}">
          {{base.day.selected}}{{base.day.unit}}
        </p>
      </div>
    </div>
    <div class="vp-date-time-select">
      <ul class="vp-date-weeks" v-if="selectType === 'day'">
        <li v-for="week in weeks">{{week}}</li>
      </ul>
      <ul class="vp-date-time-scope">
        <li class="animated fadeIn" :class="{ 'vp-date-selected': no === base[selectType].selected}" v-for="no in selectNo" @click="selectTime(no)">
          {{no < 10 && no !== '' ? `0${no}` : no}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /* import css */;

  export default {
    props: {
      selected: {
        type: Object,
        default: () => {
          const timer = new Date();
          return {
            year: timer.getFullYear(),
            month: timer.getMonth() + 1,
            day: timer.getDate(),
          };
        },
      },
    },
    watch: {
      selected(date) {
        const { base } = this;
        base.year.selected = date.year;
        base.month.selected = date.month;
        base.day.selected = date.day;
        this.$forceUpdate();
      },
    },
    data() {
      return {
        selectType: 'year',
        days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        base: {
          year: {
            scope: [1970, 9999],
            selected: this.selected.year,
            unit: '年',
          },
          month: {
            scope: [1, 12],
            selected: this.selected.month,
            unit: '月',
          },
          day: {
            scope: [1, 31],
            selected: this.selected.day,
            unit: '日',
          },
        },
      };
    },
    computed: {
      selectNo() {
        const list = [];
        const { selectType, base, days } = this;
        const options = base[selectType];
        const current = options.selected;
        const scope = [options.scope[0], options.scope[1]];
        const year = base.year.selected;
        const month = base.month.selected;
        if (selectType === 'year') {
          scope[0] = current - 3;
          scope[1] = current + 3;
        }
        // 闰年
        base.day.scope[1] = days[month - 1];
        if (year % 100 !== 0 && year % 4 === 0) base.day.scope[1] = 29;
        if (year % 400 === 0) base.day.scope[1] = 29;
        if (selectType === 'day') {
          scope[1] = base.day.scope[1];
          const week = (new Date(`${year}/${month}/1`)).getDay();
          for (let k = 0; k < week; k += 1) list.push('');
        }
        for (let i = scope[0]; i <= scope[1]; i += 1) list.push(i);
        return list;
      },
    },
    methods: {
      selectTime(no) {
        if (no === '') return;
        const { selectType, base } = this;
        const options = base[selectType];
        options.selected = no;
        this.$forceUpdate();
        this.$emit('selected', {
          year: base.year.selected,
          month: base.month.selected,
          day: base.day.selected,
        });
      },
      selectDateType(type) {
        this.selectType = type;
      },
    },
  };
</script>
