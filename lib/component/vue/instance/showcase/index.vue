<template>
  <div class="moo moo-showcase animated zoomIn" v-if="isShowcaseClose">
    <slot name="showcase"/>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isShowcaseClose: this.show,
      };
    },
    watch: {
      show(status) {
        this.isShowcaseClose = status;
      },
    },
  };
</script>
