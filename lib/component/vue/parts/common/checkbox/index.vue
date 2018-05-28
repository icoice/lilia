<template>
<div class="moo moo-checkbox">
  <div class="box-item" v-for="(item, code) in boxItems">
    <div v-if='item'>
      <btn @tap="tap(code, item)">
        <div slot="btn">
          <div
          class="box-mark"
          :class="{'box-selected': boxSelected.indexOf(code) >= 0 || boxSelected.indexOf(item.key) >= 0}">
            <span class="iconfont icon-right"></span>
          </div>
          <div class="box-name">{{ item.name }}</div>
        </div>
      </btn>
    </div>
  </div>
</div>
</template>

<script>
import btn from '../button';
import drive from '../../../../../drive';

export default {
  ...drive.Vue.state('box', {
    items: [Array, []],
    selected: [Array, []],
  }),
  components: {
    btn,
  },
  methods: {
    tap(code, item) {
      let selected = this.boxSelected;
      const newSelected = [];
      if (this.boxSelected.indexOf(code) < 0) {
        this.boxSelected.push(code);
        selected = Object.assign([], this.boxSelected);
      } else {
        this.boxSelected.map((boxCode) => {
          if(boxCode !== code) newSelected.push(boxCode);
        });
        selected = newSelected;
        this.boxSelected = newSelected;
      }
      this.$emit('tap', selected);
    },
  },
};
</script>
