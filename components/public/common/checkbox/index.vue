<template>
  <div class="vp-checkbox" :class="{ 'vp-radio-disabled': checkboxDisabled, }">
    <div v-for="(item, itemCode) in checkboxItems">
      <div class="vp-checkbox-item" @click="selectCheckbox(itemCode, item)">
        <div class="vp-checkbox-check">
          <div class="vp-checkbox-box" :class="{'vp-checkbox-checked': hasSelected(itemCode)}">
            <span class="psm-icon psm-right" v-if="hasSelected(itemCode)"></span>
          </div>
        </div>
        <div class="vp-checkbox-name">{{ item.name }}</div>
      </div>
    </div>
    <div class="vp-checkbox-mask" v-if="checkboxDisabled"></div>
  </div>
</template>

<script>
  /* import css */;

  export default {
    props: {
      items: {
        type: Array,
        default: () => [],
      },
      selected: {
        type: Array,
        default: () => [],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        checkboxItems: this.items,
        checkboxSelected: this.selected,
        checkboxDisabled: this.disabled,
      };
    },
    watch: {
      items(items) {
        this.checkboxItems = items;
      },
      disabled(choose) {
        this.disabled = choose;
      },
      selected(no) {
        if (this.hasSelected(no)) this.checkboxSelected.push(no);
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
        return this.checkboxSelected.indexOf(code) >= 0;
      },
      setSelect() {
        const { checkboxSelected, checkboxItems } = this;
        if (checkboxSelected !== null) {
          const selected = [];
          checkboxSelected.map((no) => {
            if (checkboxItems[no]) selected.push(checkboxItems[no]);
          });
          this.$emit('selected', selected);
        }
      },
      selectCheckbox(code, data) {
        const { checkboxSelected } = this;
        if (!this.hasSelected(code)) {
          checkboxSelected.push(code);
          this.$emit('selected', { code, selected: data });
          return;
        }
        const newCheckboxSelected = [];
        checkboxSelected.map((id) => {
          if (code !== id) newCheckboxSelected.push(id);
        });
        this.checkboxSelected = newCheckboxSelected;
        this.$emit('unselected', { code, selected: data });
      },
    },
  };
</script>
