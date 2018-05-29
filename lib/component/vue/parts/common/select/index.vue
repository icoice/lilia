<template>
<div class="moo moo-select"
  :class="{ 'select-disabled': hasDisabled }"
  @mouseover="hasMoveOnSelect" @mouseleave="hasMouseLeave">
  <!-- 所选 -->
  <div :class="['select-default' , selectDefaultChange()]" @click="openlist">
    <div :class="['iconfont', iconChange()]" v-if="!hasDisabled"></div>
    <span>{{selected.name}}</span>
  </div>
  <!-- 下拉菜单 -->
  <div class="select-pull-down" v-if="listOpen && menus.length > 0 && !hasDisabled">
    <div class="select-option select-clear-option" @click="selectOption(emptySelected)">清除</div>
    <div class="select-option" v-for="item in menus" @click="selectOption(item)">
      {{ item.name }}
    </div>
  </div>
  <div class="select-mask" v-if="hasDisabled"></div>
</div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
    val: {
      type: [String, Number],
      default: () => '',
    },
    placeholder: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const { list, disabled, open, placeholder } = this;
    const emptySelected = { name: !placeholder ? '请选择' : placeholder, key: '' };
    let selected = emptySelected;
    list.map((item) => {
      if (this.val === item.key) {
        selected = item;
      }
      return item;
    });
    return {
      selected,
      emptySelected,
      hasDisabled: disabled,
      isMoveOver: 0,
      isBindMouseMenus: false,
      menus: list,
      listOpen: open,
    };
  },
  watch: {
    placeholder(str) {
      this.emptySelected = { name: !str ? '请选择' : str, key: '' };
    },
    val(key) {
      if (key === '') {
        this.selected = this.emptySelected;
      } else {
        this.menus.map((item) => {
          if (key === item.key) this.selected = item;
          return item;
        });
      }
    },
    list(menus) {
      this.menus = menus;
    },
    disabled(status) {
      this.hasDisabled = status;
    },
  },
  mounted() {
    this.bindMouseMenus();
  },
  methods: {
    iconChange() {
      return this.listOpen ? 'icon-packup' : 'icon-unfold';
    },
    selectDefaultChange() {
      return this.listOpen ? 'list-open' : 'list-close';
    },
    hasMoveOnSelect() {
      this.isMoveOver = 1;
    },
    hasMouseLeave() {
      this.isMoveOver = 0;
    },
    bindMouseMenus() {
      if (!this.isBindMouseMenus) {
        window.addEventListener('click', () => {
          if (!this.isMoveOver) this.listOpen = false;
        }, true);
        this.isBindMouseMenus = true;
      }
    },
    openlist() {
      this.listOpen = !this.listOpen;
      this.$emit('open', this.openlist);
    },
    selectOption(item) {
      this.selected = item;
      this.listOpen = !this.listOpen;
      this.$emit('change', this.selected);
    },
  },
};
</script>
