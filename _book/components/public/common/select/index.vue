<template>
  <div class="vp-select" :class="{ 'vp-select-disabled': hasDisabled }" @mouseover="hasMoveOnSelect" @mouseleave="hasMouseLeave">
    <div :class="`vp-select-default ${selectDefaultChange()}`" @click="openMenus">
      <div :class="`psm-icon ${iconChange()}`" v-if="!hasDisabled"></div>
      <span>{{selected.name}}</span>
    </div>
    <div class="vp-select-pull-down" v-if="menusOpen && list.length > 0 && !hasDisabled">
      <div class="vp-select-default"></div>
      <div class="vp-select-option vp-select-clear-option" @click="selectOption(emptySelected)">
        无选择
      </div>
      <div class="vp-select-option" v-for="item in list" @click="selectOption(item)">
        {{item.name}}
      </div>
    </div>
    <div class="vp-select-mask" v-if="hasDisabled"></div>
  </div>
</template>

<script>
  import "./theme.css";

  export default {
    props: {
      open: {
        type: Boolean,
        default: false,
      },
      menus: {
        type: Array,
        default: [],
      },
      defValue: {
        type: [String, Number],
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      const emptySelected = { name: '请选择', key: '' };
      let selected = emptySelected;
      this.menus.map((item) => {
        if (this.defValue === item.key) {
          selected = item;
        }
        return item;
      });
      return {
        selected,
        menusOpen: this.open,
        list: this.menus,
        hasDisabled: this.disabled,
        emptySelected,
        isMoveOver: 0,
        isBindMouseListen: false,
      };
    },
    watch: {
      defValue(key) {
        if (key === '') {
          this.selected = this.emptySelected;
        } else {
          this.list.map((item) => {
            if (key === item.key) this.selected = item;
            return item;
          });
        }
      },
      menus(list) {
        this.list = list;
      },
      disabled(status) {
        this.hasDisabled = status;
      },
    },
    mounted() {
      this.bindMouseListen();
    },
    methods: {
      iconChange() {
        return this.menusOpen ? 'psm-arrow-up' : 'psm-arrow-down';
      },
      selectDefaultChange() {
        return this.menusOpen ? 'menus-open' : 'menus-close';
      },
      hasMoveOnSelect() {
        this.isMoveOver = 1;
      },
      hasMouseLeave() {
        this.isMoveOver = 0;
      },
      bindMouseListen() {
        if (!this.isBindMouseListen) {
          document.body.addEventListener('click', () => {
            if (!this.isMoveOver) this.menusOpen = false;
          }, true);
          this.isBindMouseListen = true;
        }
      },
      openMenus() {
        this.menusOpen = !this.menusOpen;
        this.$emit('menusOperate', this.openMenus);
      },
      selectOption(item) {
        this.selected = item;
        this.menusOpen = !this.menusOpen;
        this.$emit('selected', this.selected);
      },
    },
  };
</script>
