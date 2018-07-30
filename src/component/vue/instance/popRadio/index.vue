<template lang="pug">
div.lilia-pop-radio
  lilia-pop(:show='hasShow' @change='init')
    div(slot='pop-btn')
      span.pop-radio-selected {{ getSelect }}
      span.liliafont(class='icon-arrowdown')
      span.liliafont(class='icon-arrowup')
    div(slot='pop')
      div.pop-radio-search
        lilia-input(
          :val='m$Search'
          placeholder='请输入搜索关键词'
          @updated='val => searchList(val)')
        div.pop-radio-operator
          btn(@tap='clearSelect')
            span(slot='btn') 清空
      div.pop-radio-list(v-if='getItems.length > 0')
        lilia-radio(
          :items='getItems'
          :selected='getVal'
          @tap='change')
      div.pop-radio-tips(v-else)
        span 无结果
</template>

<script>
import liliaInput from '../../base/input';
import liliaRadio from '../../base/radio';
import btn from '../../base/button';

const drive = window.$lilia_drive;
const util = window.$lilia_util;

export default {
  ...drive.Vue.state('m$', {
    val: [[Object, Array, Number], null],
    placeholder: [String, '请选择'],
    search: [String, ''],
    items: [Array, []],
  }, {
    data: {
      searchItems: null,
      hasShow: false,
    },
  }),
  computed: {
    getVal() {
      const { m$Val } = this;
      if (m$Val) return Number(m$Val.code);
      if (util.Assert.hasNum(m$Val)) return m$Val;
    },
    getItems() {
      const { searchItems, m$Items } = this;
      return !searchItems ? m$Items : searchItems;
    },
    getSelect() {
      const { m$Val, m$Placeholder } = this;
      return !m$Val || !m$Val.data ? m$Placeholder : m$Val.data.name;
    },
  },
  components: {
    liliaInput,
    liliaRadio,
    btn,
  },
  methods: {
    init(has) {
      this.searchItems = null;
      this.hasShow = has;
    },
    clearSelect() {
      this.m$Val = null;
    },
    searchList(val) {
      const { m$Items } = this;
      const list = {length: 0};

      if (val === '') {
        this.init(true);
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
      this.hasShow = false;
      this.$emit('tap', this.m$Val);
    },
  },
}
</script>
