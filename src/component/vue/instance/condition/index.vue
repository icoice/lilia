<template lang="pug">
div.moo-condition(class='moo')
  // 日期组件
  moo-datepicker(
    :show='hasDateOpen'
    :hasClear='true'
    @close='closeDate'
    @change='val => changeDate(val)'
    @clear='clearDate')
  // 组件内容
  div.condition-container(v-for='(line, code) in items' v-if='hasNoEmptry(items)')
    div.condition-item(v-for='(item, no) in line' :style='width(cols)')
      div.condition-name {{ item.name }}
      // input
      div.condition-container(@click='closeComponents' v-if='item.component === "input"')
        moo-input(:val='item.value' :placeholder='item.tips' @updated='val => change(item, val)')
      // select
      div.condition-container(v-if='item.component === "select"')
        moo-select(
          :val='typeof item.value !== "object" ? null : item.value.key'
          :list='item.list'
          :placeholder='item.tips'
          @change='val => change(item, val)')
      // typeInput
      div.condition-container(v-if="item.component === 'typeInput'")
        div.condition-type-input
          div.condition-container-half
            moo-input(
              v-if="item.items.input"
              :val='item.items.input.value'
              :placeholder='item.items.input.tips'
              @updated='val => change(item.items.input, val)')
          div.condition-container-half
            moo-select(
              v-if='item.items.select'
              :val='typeof item.items.select.value !== "object" ? null : item.items.select.value.key'
              :list='item.items.select.list'
              :placeholder='item.items.select.tips'
              @change='val => change(item.items.select, val)')
      // date
      div.condition-container(v-if='item.component === "date"')
        div.condition-date-input(@click='e => changeDateStatus(item)')
          moo-input(
            :disabled='true'
            :val='formatDate(item.value)'
            :placeholder='item.tips')
      // dateScope
      div.condition-container(v-if='item.component === "dateScope"')
        div.condition-date-scope(@click='e => changeDateStatus(item.items.start)')
          moo-input(
            :disabled='true'
            :val='formatDate(item.items.start.value)'
            :placeholder='item.items.start.tips')
        div.condition-date-split -
        div.condition-date-scope(@click='e => changeDateStatus(item.items.end)')
          moo-input(
            :disabled='true'
            :val='formatDate(item.items.end.value)'
            :placeholder='item.items.end.tips')
      // checkbox
      div.condition-container(v-if='item.component === "checkbox"'
        @mouseover='hasMoveOnSelect'
        @mouseleave='hasMouseLeave')
        div.condition-checkbox-result(v-if='!item.show')
          btn(@tap='changeSearchCheckbox(true, item)')
            div(slot='btn')
              span {{ checkBoxSelected(item) }}
              span.iconfont(class='icon-arrowdown')
        div.condition-checkbox-search(v-else)
          moo-input(
            :val='!checkboxSearchKey[code * cols + no] ? "" : checkboxSearchKey[code * cols + no]'
            placeholder='请输入关键词'
            @updated='val => updateSearchCheckbox(code * cols + no, val)')
        div.condition-checkbox-list(v-if='item.show')
          div.condition-checkbox-operator
            btn(@tap='e => allSelect(item)')
              span(slot='btn') 全选
            btn(@tap='e => reverse(item)')
              span(slot='btn') 反选
            btn(@tap='e => changeSearchCheckbox(false, item)')
              span(slot='btn') 关闭
          div.condition-checkbox-con
            moo-checkbox(
              :items='searchCheckbox(code * cols + no, item)'
              :selected='item.value'
              @tap='val => change(item, val)')
      // radio
      div.condition-container(v-if='item.component === "radio"'
        @mouseover='hasMoveOnSelect'
        @mouseleave='hasMouseLeave')
        div.condition-checkbox-result(v-if='!item.show')
          btn(@tap='changeSearchCheckbox(true, item)')
            div(slot='btn') {{ checkBoxSelected(item) }}
        div.condition-radio-search(v-else)
          moo-input(
            :val='!checkboxSearchKey[code * cols + no] ? "" : checkboxSearchKey[code * cols + no]'
            placeholder='请输入关键词搜索'
            @updated='val => updateSearchCheckbox(code * cols + no, val)')
        div.condition-radio-list(v-if='item.show')
          div.condition-radio-operator
            btn(@tap='e => change(item, {})')
              span(slot='btn') 重置
            btn(@tap='e => changeSearchCheckbox(false, item)')
              span(slot='btn') 关闭
          moo-radio(
            :items='searchCheckbox(code * cols + no, item)'
            :selected='item.value.code'
            @tap='val => change(item, val)')
  // 配置未设置时
  div.condition-tips(v-else) 未设置查询条件内容
</template>

<script>
import mooInput from '../../common/input';
import mooSelect from '../../common/select';
import mooRadio from '../../common/radio';
import mooCheckbox from '../../common/checkbox';
import btn from '../../common/button';
import mooDatepicker from '../datepicker';
import actions from './actions';

const util = window.$util;

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
      hasDateOpen: false,
      isBindMouseMenus: false,
      isMoveOver: 0,
      dateTarget: null,
      checkboxSearchKey: {},
      condList: this.list,
      condCols: this.cols,
    };
  },
  components: {
    mooInput,
    mooSelect,
    mooDatepicker,
    mooCheckbox,
    mooRadio,
    btn,
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
    condShow() {
      this.hasDateOpen = false;
    },
  },
  mounted() {
    this.bindMouseMenus();
  },
  ...actions,
};
</script>
