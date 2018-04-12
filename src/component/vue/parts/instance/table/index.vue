<template>
  <div class="moo moo-table">
    <table v-if='tbData && tbData.length > 0'>
      <tr v-for="th in tbHead" class='tb-head'>
        <td class="tb-head-select" v-if='hasMulti'>
          <div v-if='tbSel.length === 0'>
            <btn @tap="allCheck">
              <span slot="btn">全选</span>
            </btn>
          </div>
          <div v-else>
            <btn @tap="backCheck">
              <span slot="btn">反选</span>
            </btn>
          </div>
        </td>
        <td v-for="item in th"
          :colspan="!item.cols ? 1 : item.cols"
          :rowspan="!item.rows ? 1 : item.rows"
          v-if='!item.hasHidden'>
          <btn @tap="e => headTap(item)">
            <span slot="btn">{{ item.name }}</span>
          </btn>
        </td>
        <td v-if='tbOpts && tbOpts.length > 0' :colspan='tbOpts.length'></td>
      </tr>
        <tr v-for="(item, code) in tbData">
          <td class="tb-select" v-if='hasMulti'>
            <btn @tap="e => multiSelect(code)">
              <span slot="btn" :class="{ 'tb-selected': tbSel.indexOf(code) >= 0 }">
              </span>
            </btn>
          </td>
          <td v-for="m in keyMap">
            <btn @tap="e => tap({
              key: m.key,
              value: item[m.key],
              data: item,
              filter: filter(item[m.key]),
            })">
              <span slot="btn">{{ filter(item[m.key]) }}</span>
            </btn>
          </td>
          <td class='tb-opt' v-if='tbOpts && tbOpts.length > 0' v-for="(opt, code) in tbOpts">
            <btn @tap='e => tap({ key: opt.key, name: opt.name, data: item, code })'>
              <span slot="btn">{{ opt.name }}</span>
            </btn>
          </td>
        </tr>
    </table>
    <div class="no-table-data" v-else>
      <slot name='no-data'></slot>
    </div>
  </div>
</template>

<script>
import btn from '../../common/button';

export default {
  props: {
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
    filter: {
      type: Function,
      default: params => params,
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
      const { tbData } = this;
      const tbSel = Object.assign([], this.tbSel);
      const newSel = [];
      tbData.map((v, code) => {
        if (tbSel.indexOf(code) < 0) {
          newSel.push(code);
        }
      });
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
