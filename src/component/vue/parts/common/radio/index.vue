<template>
  <div class="moo-radio" :class="{ 'moo-radio-disabled': radioDisabled, }">
    <div class="radio-item" v-for="(item, itemCode) in radioItems" @click="selectRadio(itemCode, item)" v-if="item">
      <div :class="{'radio-check': true, 'radio-checked': hasSelected(itemCode)}">
        <div class="radio-checked-box iconfont icon-right"></div>
      </div>
      <div class="radio-name">{{item.name}}</div>
    </div>
    <div class="radio-mask" v-if="radioDisabled"></div>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: () => [],
      },
      selected: {
        type: Number,
        default: null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        radioItems: this.items,
        radioSelected: this.selected,
        radioDisabled: this.disabled,
      };
    },
    watch: {
      items(items) {
        this.radioItems = items;
      },
      selected(no) {
        this.radioSelected = no;
      },
    },
    mounted() {
      this.setSelect();
    },
    activated() {
      this.setSelect();
    },
    updated() {
      this.setSelect();
    },
    methods: {
      hasSelected(code) {
        return this.radioSelected === code;
      },
      setSelect() {
        const { radioSelected, radioItems } = this;
        if (radioSelected !== null) {
          this.$emit('updated', { code: radioSelected, data: radioItems[radioSelected] });
        }
      },
      selectRadio(code, data) {
        this.radioSelected = code;
        this.$emit('tap', { code, data });
      },
    },
  };
</script>
