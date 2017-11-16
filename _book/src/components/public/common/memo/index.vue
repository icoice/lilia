<template>
  <div class="vp-memo" v-if="memoShow">
    <div class="vp-memo-header">
      <div class="vp-memo-title">
        {{memoTitle}}
      </div>
    </div>
    <div class="vp-memo-content">
      <ul>
        <li v-for="description in memoMesage">
          {{description}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /* import css */;
  
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
