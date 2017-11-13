<template>
  <div class="vp-date animated fadeIn">
    <div class="vp-date-time">
      <div class="vp-date-time-item vp-date-year">
        <vp-button @tap="selectDateType('year')">
          <span slot="button-name" :class="{ 'vp-date-selected': selectType === 'year'}">
            {{base.year.selected}}{{base.year.unit}}
          </span>
        </vp-button>
      </div>
      <div class="vp-date-time-item vp-date-month">
        <vp-button @tap="selectDateType('month')">
            <span slot="button-name" :class="{ 'vp-date-selected': selectType === 'month'}">
              {{base.month.selected}}{{base.month.unit}}
            </span>
        </vp-button>
      </div>
      <div class="vp-date-time-item vp-date-day" @click="selectDateType('day')">
        <vp-button @tap="selectDateType('day')">
            <span slot="button-name" :class="{ 'vp-date-selected': selectType === 'day'}">
              {{base.day.selected}}{{base.day.unit}}
            </span>
        </vp-button>
      </div>
    </div>
    <div class="vp-date-time-select">
      <div class="vp-date-time-select-body">
        <ul class="vp-date-weeks" v-if="selectType === 'day'">
          <li v-for="week in weeks">{{week}}</li>
        </ul>
        <ul class="vp-date-time-scope">
          <li v-for="(no, code) in selectNo" :class="{
            'vp-date-selected': no === base[selectType].selected,
            'vp-date-last-grid': (code + 1) % 7 === 0 || (code + 1) === selectNo.length,
          }">
            <vp-button @tap="selectTime(no)">
              <span slot="button-name">{{no < 10 && no !== '' ? `0${no}` : no}}</span>
            </vp-button>
          </li>
        </ul>
      </div>
      <div class="vp-date-time-select-bg"></div>
    </div>
  </div>
</template>

<script>
  /* import css */;
  import { vpButton } from '../common';

  export default {
    components: {
      vpButton,
    },
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
    mounted() {
      const { base } = this;
      this.$emit('init', {
        year: base.year.selected,
        month: base.month.selected,
        day: base.day.selected,
      });
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
