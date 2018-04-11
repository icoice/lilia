<template>
<div class="moo-memo moo" v-if="memoShow">
  <div class="memo-header">
    <div class="memo-title">
      {{memoTitle}}
    </div>
  </div>
  <div class="memo-content">
    <ul>
      <li v-for="description in memoMesage">
        {{description}}
      </li>
    </ul>
  </div>
</div>
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
