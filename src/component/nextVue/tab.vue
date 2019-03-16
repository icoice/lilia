<template lang="pug">
div.lilia-tab.lilia
  div.lilia-tab-buttons
    div.lilia-tab-item(v-for='(item, code) in list'
      :class='selected.key === item.key || selected.key === code ? "lilia-tab-selected" : ""')
      lilia-button(@pressEnd='e => change(item)')
        div(slot="button")
          span.iconfont(:class="item.icon" v-if='item.icon')
          span {{ item.name }}
  div.lilia-tab-content
    slot(name="tab" :item='selected')
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
  mounted() {
    const { list } = this;
    this.selected = JUDGE.IS_ARR(list) ? list[0] : this.selected;
  },
}
</script>
