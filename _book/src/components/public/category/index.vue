<template>
  <div class="vp-category">
    <ul class="vp-category-list">
        <li v-for="item in categoryGroup" :class="{'vp-category-selected': item.id === categorySelected}">
          <vp-button @click="onOperate(item)">
            <span slot="button-name">
              {{item.name}}
            </span>
          </vp-button>
        </li>
    </ul>
  </div>
</template>

<script>
  /* import css */;
  import { vpButton } from '../common';

  export default {
    props: {
      group: {
        type: Array,
        default: [],
      },
      defaultSelect: {
        type: [String, Number, null],
        default: null,
      },
    },
    components: {
      vpButton,
    },
    data() {
      return {
        categoryGroup: this.group,
        categorySelected: this.defaultSelect,
      };
    },
    watch: {
      defaultSelect(id) {
        this.categorySelected = id;
      },
    },
    methods: {
      onOperate(data) {
        this.categorySelected = data.id;
        this.$emit('selected', data);
      },
    },
  };
</script>
