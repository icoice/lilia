<template>
  <div class="moo moo-table">
    <table v-if='tbData && tbData.length > 0'>
      <tr v-for="th in tbHead" class='tb-head'>
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
        <tr v-for="item in tbData">
          <td v-for="m in keyMap">
            <btn @tap="e => tap({ key: m.key, value: item[m.key], data: item })">
              <span slot="btn">{{ item[m.key] }}</span>
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
    headTap(data) {
      this.$emit('headTap', data);
    },
    tap(data) {
      this.$emit('tap', data);
    },
  }
}
</script>
