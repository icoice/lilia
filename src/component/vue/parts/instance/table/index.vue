<template>
  <div class="moo moo-table">
    <table v-if='tbData && tbData.length > 0'>
      <thead v-for="th in tbHead">
        <td v-for="item in th" :colspan="!item.cols ? 1 : item.cols">
          <btn @tap="e => headTap(item)">
            <span slot="btn">{{ item.name }}</span>
          </btn>
        </td>
      </thead>
      <tbody>
        <tr v-for="item in tbData">
          <td v-for="m in keyMap">
            <btn @tap="e => tap({ key: m.key, value: item[m.key], data: item })">
              <span slot="btn">{{ item[m.key] }}</span>
            </btn>
          </td>
        </tr>
      </tbody>
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
  },
  data() {
    return {
      tbHead: this.head,
      tbData: this.list,
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
      this.tbHead = head;
    },
    list(data) {
      this.tbData = data;
    },
  },
  components: {
    btn,
  },
  methods: {
    headTap(data) {
      this.$emit('headTap', data);
    },
    tap(data) {
      this.$emit('tap', data);
    },
  }
}
</script>
