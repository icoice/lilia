<template lang="pug">
div.lilia-pulldown.lilia(
  @mousedown.stop='checkHere'
  @touchstart.stop='checkHere')
  div.pulldown-mask(v-if='beDis')
  div.pulldown-content
    div.pulldown-block.pulldown-title(v-show='name')
      lilia-button(@pressEnd='gotoOpen')
        span(slot='button') {{ name }}
    div.pulldown-block
      lilia-button(@pressEnd='gotoOpen')
        div(v-if='selectedNoEmpty' slot='button') {{ chooseList }}
        div.pulldown-placeholder(v-else slot='button') {{ placeholder }}
    div.pulldown-block.pulldown-control.pulldown-expand(v-if='noDis')
      lilia-button(@pressEnd='gotoOpen')
        span.iconfont.icon-expandless(slot='button' v-if='beOpen')
        span.iconfont.icon-expandmore(slot='button' v-else)
    div.pulldown-block.pulldown-control.pulldown-remove(
      v-if='noDis && selectedNoEmpty')
      lilia-button(@pressEnd='clear')
        span.iconfont.input-clear(slot='button')
    div.pulldown-clear
  mixin pulldonwList
    div.pulldown-to-search
      lilia-input(
        :value='searchVal'
        placeholder='请输入关键字'
        @change='setSearchKeyword')
    ul
      li(v-for='(item, code) in listFilter'
        :class='{"pulldown-checked": choosed(item) }')
          lilia-button(
            :stateId='`pulldown_${stateId}_${item.value}`'
            @pressEnd='e => gotoSelected(item.key)')
            div(slot='button' :key='code')
              span {{ item.value }}
  div.pulldown-list.pulldown-search(v-if='beSearching')
    +pulldonwList
  div.pulldown-list(v-if='beOpen')
    +pulldonwList
</template>

<script>
import { arrayFilter, contain, eq, JUDGE } from '../../common';
import createState from './mixins/createState';
import disabled from './mixins/disabled';
import pulldown from './mixins/pulldown';

export default {
  mixins: [
    createState('pulldown'),
    disabled,
    pulldown,
  ],
  props: {
    name: {
      type: [String],
      default: null,
    },
    value: {
      type: [Number, String, Object, Array],
      default: null,
    },
    searchValue: {
      type: [Number, String],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '未选择',
    },
  },
  deactivated() {
    const { state, status } = this;

    if (['open', 'change'].indexOf(status) >= 0) {
      state.wheelFlowAction('drop');
    }
  },
  data() {
    const {
      value,
      isMultiple,
      searchValue,
      list,
    } = this;
    let selected = value;

    if (isMultiple) {
      selected = JUDGE.IS_ARR(value) ? value : [];
    }

    return {
      selected,
      searchVal: searchValue,
      pulldonwList: this.checkList(list || []),
    };
  },
  computed: {
    beSearching() {
      return eq(this.status, 'searching');
    },
    beOpen() {
      return eq(this.status, 'open');
    },
    beDis() {
      return eq(this.status, 'disabled');
    },
    noDis() {
      return !eq(this.status, 'disabled');
    },
    selectedNoEmpty() {
      const { selected, isMultiple } = this;

      if (isMultiple && JUDGE.IS_ARR(selected)) {
        return selected.length > 0;
      }

      return !eq(selected, null) && !eq(selected, '');
    },
    chooseList() {
      const { selected, isMultiple } = this;

      if (isMultiple) {
        return selected.map((key) => {
          const item = this.getSelectItem(key);

          return item.value;
        }).join(',');
      }

      return this.getSelectItem(selected).value;
    },
    listFilter() {
      const { pulldonwList, searchVal } = this;

      return arrayFilter(pulldonwList, (item) => {
        const { key, value } = item;
        const inKey = key.indexOf(searchVal) >= 0;
        const inVal = value.indexOf(searchVal) >= 0;

        return item && item.value && (inKey || inVal);
      });
    },
  },
  watch: {
    value(val) {
      this.selected = val;
    },
    searchValue(val) {
      this.searchVal = this.searchValue;
    },
    list(data) {
      this.pulldonwList = this.checkList(data || []);
    },
  },
  methods: {
    eq,

    clear() {
      this.state.wheelFlowAction('clear');
    },
    choosed(item) {
      const { selected, isMultiple } = this;

      if (!isMultiple) {
        return selected && eq(item.key, selected);
      }

      return contain(selected, item.key);
    },
    gotoOpen() {
      this.state.wheelFlowAction('drop');
    },
    gotoSearch() {
      this.state.wheelFlowAction('searching');
    },
    gotoSelected(key) {
      const { selected, isMultiple } = this;

      if (isMultiple) {
        if (contain(selected, key)) {
          this.selected = arrayFilter(selected, v => !eq(key, v));
        } else {
          selected.push(key);
        }
      } else {
        this.selected = eq(selected, key) ? null : key;
      }

      this.state.wheelFlowAction('change', !isMultiple ?
        this.getSelectItem(key) :
        selected.map(k => this.getSelectItem(k)));
      this.state.wheelFlowAction('drop');
    },
    setSearchKeyword(val) {
      this.searchVal = val;
    },
  },
}
</script>
