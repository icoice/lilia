<template>
  <div class="vp-falls">
    <ul v-for="item in groups">
      <li class="vp-falls-lines">
        <div class="vp-falls-item" v-for="slotName in item">
          <slot :name="slotName"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  /* import css */;

  export default {
    props: {
      lines: {
        type: Array,
        default: () => [],
      },
    },
    watch: {
      lines(groups) {
        this.groups = groups;
      },
    },
    data() {
      return {
        groups: this.lines,
      };
    },
  };
</script>
