<template>
  <div class="vm">
    <div class="power" v-if="hasLimit(info)">
      <slot name="power-content"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      limit: {
        type: Array,
        default: () => [],
      },
      target: {
        type: Object,
        default: () => {},
      },
    },
    watch: {
      limit(limit) {
        this.powers = limit;
      },
      target(target) {
        this.info = target;
      },
    },
    data() {
      const { limit, target } = this;
      return {
        powers: limit,
        info: target,
      };
    },
    methods: {
      hasLimit({ powerCode }) {
        const { powers } = this;
        return powers.indexOf(powerCode) >= 0;
      },
    }
  }
</script>
