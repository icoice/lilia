<template lang="pug">
div.lilia-lattice-cell
  div.lattice-net
    div.lattice-row(v-for='items in grids' :key='items.$$KEY')
      div.lattice-grid(v-for='grid in items' :style='{ width: `${100 / cols}%` }')
        slot(:grid='grid')
</template>

<script>
const util = window.$lilia_util;

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    column: {
      type: Number,
      default: 3,
    },
  },
  data() {
    const { column, list } = this;
    return {
      id: null,
      cols: column,
      grids: util.Array.pile(column, this.buildKey(list)),
      origin: list,
    };
  },
  watch: {
    cols(data) {
      const { origin } = this.buildKey(this.origin);
      this.column = data;
      this.grids = util.Array.pile(data, origin);
    },
    list(data) {
      const { column } = this;
      this.grids = util.Array.pile(column, data);
    },
  },
  methods: {
    buildKey(list) {
      if (!this.id) this.id = Date.now();
      return list.map((item, code) => {
        return !item.key ? {
          ...item,
          $$KEY: `${this.id}z${code}`,
        } : item;
      });
    },
  },
}
</script>
