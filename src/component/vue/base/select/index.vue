<template lang="pug">
div.lilia-select(
  class='lilia'
  :class="{ 'select-disabled': hasDisabled }"
  @mouseover="hasMoveOnSelect"
  @mouseleave="hasMouseLeave")
  div(:class="['select-default', selectDefaultChange()]" @click="openlist")
    div(:class="['liliafont', iconChange()]" v-if="!hasDisabled")
    span {{ selected.name }}
  div.select-pull-down(v-if='listOpen && menus.length > 0 && !hasDisabled')
    div.select-option(class='select-clear-option' @click='selectOption(emptySelected)') 重置
    div.select-option(v-for='item in menus' @click='selectOption(item)') {{ item.name }}
  div.select-mask(v-if='hasDisabled')
</template>

<script>
import actions from './actions';

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
      if (this.val == item.key) {
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
          if (key == item.key) this.selected = item;
          return item;
        });
      }
    },
    list(menus) {
      this.menus = menus;
      this.menus.map((item) => {
        if (this.selected && this.selected.key !== '') {
          if (this.selected.key === item.key) this.selected = item;
        } else if (this.val !== '') {
          this.menus.map((item) => {
            if (this.val === item.key) this.selected = item;
            return item;
          });
        }
        return item;
      });
    },
    disabled(status) {
      this.hasDisabled = status;
    },
  },
  mounted() {
    this.bindMouseMenus();
  },
  ...actions,
};
</script>
