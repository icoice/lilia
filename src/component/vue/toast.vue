<template lang='pug'>
div.lilia-toast.lilia(v-if='status === "on"')
  div.toast-showcase(ref='showcase')
    p.toast-content {{ message }}
    div.toast-bg
</template>

<script>
import createState from './mixins/createState';
import toast from './mixins/toast';

export default {
  mixins: [
    createState('toast'),
    toast,
  ],
};
</script>
