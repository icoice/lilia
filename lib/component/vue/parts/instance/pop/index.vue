<template>
<div class="moo-pop moo" v-if="memoShow">
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'MEMO',
    },
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      memoTitle: this.title,
      memoShow: this.show,
      memoMesage: this.message,
    };
  },
  watch: {
    title(title) {
      this.memoTitle = title;
    },
    show(status) {
      this.memoShow = status;
    },
    message(data) {
      this.memoMesage = data;
    },
  },
};
</script>
