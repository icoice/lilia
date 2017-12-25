<template >
  <div class="vp-loading">
    <div class="vp-loading-mark" v-if="!isLoadComplete">
      <div class="psm-icon psm-police-mark animated infinite flip"></div>
      <p class="vp-load-descrption" v-if="description !== ''">{{description}}</p>
    </div>
    <slot name="load-content" v-else/>
  </div>
</template>

<script>
  /* import css */;

  export default {
    props: {
      isComplete: {
        type: Boolean,
        default: true,
      },
      description: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isLoadComplete: this.isComplete,
      };
    },
    watch: {
      isComplete(status) {
        this.isLoadComplete = status;
      },
    },
  };
</script>
