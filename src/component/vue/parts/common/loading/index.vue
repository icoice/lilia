<template >
  <div class="moo moo-loading">
    <div class="load-mark" v-if="!isLoadComplete">
      <div class="moo-icon">
        <p>Now Loading</p>
        <p class="load-descrption" v-if="description !== ''">
          {{description}}
        </p>
      </div>
    </div>
    <slot name="load" v-else/>
  </div>
</template>

<script>
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
