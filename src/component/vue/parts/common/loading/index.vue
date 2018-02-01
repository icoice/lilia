<template >
  <div class="vm">
    <div class="loading">
      <div class="loading-mark" v-if="!isLoadComplete">
        <div class="psm-icon psm-police-mark animated infinite flip"></div>
        <p class="load-descrption" v-if="description !== ''">{{description}}</p>
      </div>
      <slot name="load-content" v-else/>
    </div>
  </div>
</template>

<script>
  /* import css */;

  export default {
    props: {
      hasComplete: {
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
        isLoadComplete: this.hasComplete,
      };
    },
    watch: {
      hasComplete(status) {
        this.isLoadComplete = status;
      },
    },
  };
</script>
