<template lang="pug">
div.lilia-drift.lilia(v-if='status === "on"')
  div.lilia-drift-menus
    div.drift-title {{ title }}
    lilia-button.drift-close(@pressEnd='close')
      span.fa.fa-times(slot='button')
  slot(name='drift-content')
</template>

<script>
import createState from './mixins/createState';
import drift from './mixins/drift';

export default {
  mixins: [
    createState('drift'),
    drift,
  ],
};
</script>
