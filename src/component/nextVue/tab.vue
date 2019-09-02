<template lang="pug">
div.lilia-tab.lilia
  div.lilia-tab-buttons
    div.lilia-tab-item(v-for='(item, code) in innerList'
      :class='selected && (selected.key === item.key || selected.key === code) ? "lilia-tab-selected" : ""')
      lilia-button(@pressEnd='e => change(item)')
        div(slot="button")
          span.iconfont(:class="item.icon" v-if='item.icon')
          span(v-html='item.name')
  div.lilia-tab-container
    div.lilia-tab-content
      slot(name="tab" :item='selected || {}')
</template>

<script>
import createState from './mixins/createState';
import tab from './mixins/tab';
import _ from '../../_';

const { JUDGE } = _.decideType;

export default {
  mixins: [
    createState('tab'),
    tab,
  ],
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  watch: {
    list(list) {
      this.innerList = list;

      this.updateSelected();
    },
  },
  data() {
    return {
      innerList: this.list,
    };
  },
  mounted() {
    this.updateSelected();
  },
  methods: {
    updateSelected(list) {
      const { innerList, selected } = this;
      const item = innerList[0];

      if (!selected) {
        if (JUDGE.IS_ARR(innerList) && innerList.length > 0) {
          this.selected = item;
        }
      }
    },
  },
}
</script>
