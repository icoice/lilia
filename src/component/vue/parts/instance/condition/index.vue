<template>
<div class="moo moo-condition">
  <div class="condition-container" v-for="(line, code) in items" v-if="hasNoEmptry(items)">
    <div class="condition-item" v-for="item in line" :style="width(cols)">
      <!-- 标题 -->
      <div class="condition-name">{{ item.name }}</div>
      <!-- 输入组件 -->
      <div class="condition-container" v-if="item.component === 'input'">
        <moo-input :val="item.value" :placeholder="item.tips" @updated="val => change(item, val)"/>
      </div>
      <div class="condition-container" v-if="item.component === 'select'">
        <moo-select
        :val="typeof item.value !== 'object' ? null : item.value.key"
        :list="item.list"
        :placeholder="item.tips"
        @change="val => change(item, val)"/>
      </div>
      <div class="condition-container" v-if="item.component === 'typeInput'">
        <div class="condition-type-input">
          <div class="condition-container-half">
            <moo-input
              v-if="item.input"
              :val="item.input.value"
              :placeholder="item.input.tips"
              @updated="val => change(item.input, val)"/>
          </div>
          <div class="condition-container-half">
            <moo-select
              v-if="item.select"
              :val="typeof item.select.value !== 'object' ? null : item.select.value.key"
              :list="item.select.list"
              :placeholder="item.select.tips"
              @change="val => change(item.select, val)"/>
          </div>
        </div>
      </div>
      <div class="condition-container" v-if="item.component === 'date'">
        <div class="condition-date-input" @click="e => changeDateStatus(item)">
          <moo-input
          :disabled="true"
          :val="formatDate(item.value)"
          :placeholder="item.tips" @updated="val => change(item, val)"/>
          <span
          v-if="hasDateOpen && item.key === dateTarget.key"
          class="moo-icon moo-close"
          @click="clearDate"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="condition-tips" v-else>
    未设置查询条件内容
  </div>
  <moo-date :open="hasDateOpen" @change="val => changeDate(val)"/>
</div>
</template>

<script>
  import mooDate from '../date';
  import mooInput from '../../common/input';
  import mooSelect from '../../common/select';
  import drive from '../../../../../drive';
  import util from '../../../../../util';


  export default {
    ...drive.Vue.state('cond', {
      list: [Array, []],
      cols: [Number, 4],
    }, {
      data: {
        hasDateOpen: false,
        dateTarget: null,
      },
    }),
    components: {
      mooInput,
      mooSelect,
      mooDate,
    },
    computed: {
      items() {
        const { condCols, condList } = this;
        return util.Array.pile(condCols, condList);
      },
    },
    methods: {
      hasNoEmptry: items => items && items.length > 0,
      width: cols => ({ width: `${100 / cols}%` }),
      formatDate(time) {
        return !time ? '' : util.Date.format('YYYY-MM-DD', time);
      },
      dateSelected() {
        return
      },
      change(item, val) {
        const { condList } = this;
        const newItem = item;
        newItem.value = val;
        this.$emit('change', Object.assign([], condList));
      },
      clearDate() {
        const { condList, dateTarget } = this;
        if (dateTarget) dateTarget.value = '';
        this.$emit('change', Object.assign([], condList));
      },
      changeDate(val) {
        const { condList, dateTarget } = this;
        if (dateTarget) dateTarget.value = val;
        this.$emit('change', Object.assign([], condList));
      },
      changeDateStatus(item) {
        this.dateTarget = item;
        this.hasDateOpen = !this.hasDateOpen;
      },
    },
  };
</script>
