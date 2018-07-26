<template lang="pug">
div.lilia-condition(class='lilia')
  // 组件内容
  div.condition-container(v-for='(line, code) in items' v-if='hasNoEmptry(items)')
    div.condition-item(v-for='(item, no) in line' :style='width(cols)')
      div.condition-name {{ item.name }}
      div.condition-container(v-if='item.component === "input"')
        lilia-input(:val='item.value' :placeholder='item.tips' @updated='val => change(item, val)')
      div.condition-container(v-if='item.component === "select"')
        lilia-select(
          :val='typeof item.value !== "object" ? null : item.value.key'
          :list='item.list'
          :placeholder='item.tips'
          @change='val => change(item, val)')
      div.condition-container(v-if="item.component === 'type'")
        lilia-type(
          :input='item.items.input'
          :select='item.items.select'
          @change='data => change(data.item, data.value)')
      div.condition-container(v-if='item.component === "time"')
        lilia-time(
          :val='item'
          :showTime='item.showTime'
          @change='val => changeTime(item, val)')
      div.condition-container(v-if='item.component === "time-zones"')
        lilia-time-zones(
          :start='item.items.start'
          :end='item.items.end'
          :showTime='item.showTime'
          @tap='val => change(item, val)')
      div.condition-container(v-if='item.component === "checkbox"')
        lilia-pop-checkbox(
          :val='item.value'
          :items='item.items'
          :placeholder='item.tips'
          @tap='val => change(item, val)')
      div.condition-container(v-if='item.component === "radio"')
        lilia-pop-radio(
          :val='item.value'
          :items='item.items'
          :placeholder='item.tips'
          @tap='val => change(item, val)')
  // 配置未设置时
  div.condition-tips(v-else) 未设置查询条件内容
</template>

<script>
import liliaInput from '../../base/input';
import liliaSelect from '../../base/select';
import liliaTime from '../time';
import liliaTimeZones from '../timeZones';
import liliaType from '../type';
import liliaPopCheckbox from '../popCheckbox';
import liliaPopRadio from '../popRadio';
import actions from './actions';

const util = window.$lilia_util;

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    cols: {
      type: Number,
      default: () => 4,
    },
  },
  data() {
    return {
      dateTarget: null,
      values: {},
      checkboxSearchKey: {},
      condList: this.list,
      condCols: this.cols,
    };
  },
  components: {
    liliaInput,
    liliaSelect,
    liliaPopCheckbox,
    liliaPopRadio,
    liliaType,
    liliaTime,
    liliaTimeZones,
  },
  computed: {
    items() {
      const { condCols, condList } = this;
      return util.Array.pile(condCols, condList);
    },
  },
  watch: {
    cols(cols) {
      this.condCols = cols;
    },
    list(list) {
      this.condList = list;
    },
  },
  ...actions,
};
</script>
