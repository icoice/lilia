<template>
  <div class="moo moo-track">
    <div class="track-line" v-for='item in list'>
      <div class="track-head"></div>
      <div class="track-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
};
</script>
