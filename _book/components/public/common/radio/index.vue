<template>
  <div class="vp-radio" :class="{ 'vp-radio-disabled': radioDisabled, }">
    <div v-for="(item, itemCode) in radioItems">
      <div class="vp-radio-item" @click="selectRadio(itemCode, item)">
        <div :class="{'vp-radio-check': true, 'vp-radio-checked': hasSelected(itemCode)}">
          <div class="vp-radio-checked-box"></div>
        </div>
        <div class="vp-radio-name">{{item.name}}</div>
      </div>
    </div>
    <div class="vp-radio-mask" v-if="radioDisabled"></div>
  </div>
</template>

<script>
  /* import css */;

  export default {
    props: {
      items: {
        type: Array,
        default: [],
      },
      type: {
        type: String,
        default: 'single',
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
        radioType: this.type,
        radioSelected: this.selected,
        radioDisabled: this.disabled,
      };
    },
    methods: {
      hasSelected(code) {
        return this.radioSelected === code;
      },
      selectRadio(code, data) {
        this.radioSelected = code;
        this.$emit('selected', { code, selected: data });
      },
    },
  };
</script>
