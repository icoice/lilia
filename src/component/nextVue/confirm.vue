<template lang="pug">
div.lilia-confirm.lilia(v-if='isOpened')
  div.lilia-confirm-body
    div.lilia-confirm-content
      slot(name='confirm-content' v-if='content === ""')
      p.lilia-normal-text(v-else) {{ content }}
    div.lilia-confirm-operator
      lilia-button(@pressEnd='cancel')
        span(slot='button') 取消
      lilia-button(@pressEnd='sure')
        span(slot='button') 确认
</template>

<script>
import createState from './mixins/createState';
import confirm from './mixins/confirm';

export default {
  mixins: [
    createState('confirm'),
    confirm,
  ],
  props: {
    content: {
      type: String,
      default: '',
    },
  },
};
</script>
