<template lang='pug'>
div.moo(class='moo-table')
  div.no-table-data(v-if='!tbData || tbData.length === 0' )
    slot(name='no-data')
  table(v-else)
    tr(v-for='th in tbHead' class='tb-head')
      td(class='tb-head-select' v-if='hasMulti')
        div(v-if='tbSel.length === 0')
          btn(@tap='allCheck')
            span.iconfont(class='icon-blank' slot='btn')
        div(v-else)
          btn(@tap='backCheck')
            span.iconfont(class='icon-check' slot='btn')
      td(v-for='item in th' v-if='!item.hasHidden'
        :colspan='!item.cols ? 1 : item.cols'
        :rowspan='!item.rows ? 1 : item.rows')
        btn(@tap='e => headTap(item)')
          span(slot='btn') {{ item.name }}
      td(v-if='tbOpts && tbOpts.length > 0' :colspan='tbOpts.length')
    tr(v-for='(item, code) in tbData')
      td.tb-select(v-if='hasMulti')
        btn(@tap='e => multiSelect(code)')
          span.iconfont(class='icon-check' slot='btn' v-if='tbSel.indexOf(code) >= 0')
          span.iconfont(class='icon-blank' slot='btn' v-else)
      td(v-for='m in keyMap')
        btn(@tap='e => tap({ key: m.key, value: item[m.key], data: item, filter: filter(m.key, item[m.key]) })')
          span(slot='btn' v-html='filter(m.key, item[m.key])')
      td.tb-opt(v-if='tbOpts && tbOpts.length > 0' v-for='(opt, code) in tbOpts')
        btn(@tap='e => tap({ key: opt.key, name: opt.name, data: item, code })')
          div(slot='btn')
            span.iconfont(class='icon-3dcube')
            span(v-html='opt.name')
</template>

<script>
import btn from '../../common/button';

export default {
  props: {
    filter: {
      type: Function,
      default: (key, value) => value,
    },
    head: {
      type: Array,
      default: [],
    },
    list: {
      type: Array,
      default: [],
    },
    hasMulti: {
      type: Boolean,
      default: false,
    },
    operate: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tbHead: this.autoRows(this.head),
      tbData: this.list,
      tbOpts: this.operate,
      tbSel: [],
    };
  },
  computed: {
    keyMap() {
      const { tbHead } = this;
      return this.tbHead[tbHead.length - 1];
    },
  },
  watch: {
    head(head) {
      this.tbHead = this.autoRows(head);
    },
    list(data) {
      this.tbData = data;
      this.tbSel = [];
    },
    operate(data) {
      this.tbOpts = data;
    },
  },
  components: {
    btn,
  },
  methods: {
    autoRows(head) {
      let auto = null;
      head.map((tr, row) => {
        tr.map((item, col) => {
          if (item.rows > 0 && !auto) auto = { row, effNum: item.rows, col };
          if (auto && auto.row < row && auto.effNum > row && auto.col === col) {
            item.hasHidden = true;
          }
          return item;
        });
        return tr;
      });
      return head;
    },
    allCheck() {
      const { tbData } = this;
      const newSel = [];
      tbData.map((v, c) => {
        newSel.push(c);
      });
      this.tbSel = newSel;
      this.$emit('check', Object.assign([], this.tbSel));
    },
    backCheck() {
      const newSel = [];
      this.tbSel = newSel;
      this.$emit('check', Object.assign([], this.tbSel));
    },
    multiSelect(code) {
      const { tbSel } = this;
      const newSel = [];
      if (tbSel.indexOf(code) >= 0) {
        tbSel.map((c) => {
          if (c !== code) newSel.push(c);
        });
        this.tbSel = newSel;
      } else {
        tbSel.push(code);
        this.tbSel = newSel.concat(tbSel);
      }
      this.$emit('check', Object.assign([], this.tbSel));
    },
    headTap(data) {
      this.$emit('headTap', data);
    },
    tap(data) {
      this.$emit('tap', data);
    },
  }
}
</script>
