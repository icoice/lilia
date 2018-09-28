<template lang="pug">
div.lilia-pop-checkbox
  lilia-pop(@change='init')
    div(slot='pop-btn')
      span.pop-checkbox-selected {{ getSelect }}
      span.liliafont(class='icon-arrowdown')
      span.liliafont(class='icon-arrowup')
    div(slot='pop')
      div.pop-checkbox-search
        lilia-input(
          :val='m$Search'
          placeholder='请输入搜索关键词'
          @updated='val => searchList(val)')
        div.pop-checkbox-operator
          btn(@tap='clearSelect')
            span(slot='btn') 清空
          btn(@tap='allSelect')
            span(slot='btn') 全选
      div.pop-checkbox-list(v-if='getItems.length > 0')
        lilia-checkbox(
          :items='getItems'
          :selected='m$Val'
          @tap='change')
      div.pop-checkbox-tips(v-else)
        span 无结果
</template>

<script>
import liliaInput from '../../base/input';
import liliaCheckbox from '../../base/checkbox';
import btn from '../../base/button';

const drive = window.$lilia_drive;
const util = window.$lilia_util;

export default {
  ...drive.Vue.state('m$', {
    val: [Array, []],
    placeholder: [String, '请选择'],
    search: [String, ''],
    items: [Array, []],
  }, {
    data: {
      searchItems: null,
    },
  }),
  computed: {
    getItems() {
      const { searchItems, m$Items } = this;
      return !searchItems ? m$Items : searchItems;
    },
    getSelect() {
      const { m$Val, m$Items, m$Placeholder } = this;
      const list = [];

      if (m$Val.length === 0) {
        return m$Placeholder;
      } else {
        m$Val.map((code) => {
          return list.push(m$Items[code].name);
        });
        return list.join('、');
      }
    },
  },
  components: {
    liliaInput,
    liliaCheckbox,
    btn,
  },
  methods: {
    init() {
      this.searchItems = null;
    },
    clearSelect() {
      this.m$Val = [];
    },
    allSelect() {
      const { m$Val, m$Items } = this;
      const list = [];
      if (m$Val.length < m$Items.length) {
        m$Items.map((item, code) => { list.push(code) });
      }
      this.m$Val = list;
    },
    searchList(val) {
      const { m$Items } = this;
      const list = {length: 0};

      if (val === '') {
        this.init();
      } else {
        m$Items.map((item, code) => {
          const { name } = item;

          if (name.indexOf(val) >= 0) {
            list[code] = item;
            list.length += 1;
          } else if (name.indexOf(val.toUpperCase()) >= 0) {
            list[code] = item;
            list.length += 1;
          } else if (name.indexOf(val.toLowerCase()) >= 0) {
            list[code] = item;
            list.length += 1;
          }
        });
        this.searchItems = list;
      }
    },
    change(val) {
      this.m$Val = val;
      this.$emit('tap', this.m$Val);
    },
  },
}
</script>
