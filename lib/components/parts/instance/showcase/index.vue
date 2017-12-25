<template>
  <div class="vp-showcase animated zoomIn" v-if="isShowcaseClose">
    <slot name="showcase-content"/>
  </div>
</template>

<script>
  export default {
    props: {
      isClose: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isShowcaseClose: this.isClose,
      };
    },
    watch: {
      isClose(status) {
        this.isShowcaseClose = status;
      },
    },
  };
</script>
