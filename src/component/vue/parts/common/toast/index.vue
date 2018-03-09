<template>
  <div class="moo moo-toast" v-if="this.toastShow">
    <div class="toast-showcase">
      <p class="toast-content">{{toastMessage}}</p>
      <div class="toast-bg"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      message: {
        type: String,
        default: '',
      },
      timeout: {
        type: Number,
        default: 5000,
      },
    },
    data() {
      return {
        toastTimeout: this.timeout,
        toastShow: this.show,
        toastMessage: this.message,
        toastTimeoutID: null,
      };
    },
    watch: {
      show(status) {
        this.toastShow = status;
      },
      message(txt) {
        this.toastMessage = txt;
      },
    },
    mounted() {
      this.sandClock();
    },
    updated() {
      this.sandClock();
    },
    methods: {
      open() {
        this.toastShow = true;
        this.$emit('onoff', true);
      },
      close() {
        this.toastShow = false;
        this.$emit('onoff', false);
      },
      sandClock() {
        clearTimeout(this.toastTimeoutID);
        this.toastTimeoutID = setTimeout(() => {
          if (this.toastShow) this.close();
        }, this.toastTimeout);
      },
    },
  };
</script>
