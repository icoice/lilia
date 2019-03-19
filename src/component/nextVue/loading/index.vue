<template lang="pug">
div.lilia-loading.lilia
  div.load-mask(v-if='status === "loadStart"')
    div.load-content(v-if='loadType === 0')
      one
    div.load-content(v-if='loadType === 1')
      two
    div.load-content(v-if='loadType === 2')
      three
    div.load-content(v-if='loadType === 3')
      four
    div.load-content(v-if='loadType === 4')
      five
    div.load-content(v-if='loadType === 5')
      six
    div.load-content(v-if='loadType === 6')
      seven
    div.load-content(v-if='loadType === 7')
      eight
  slot(name='loadEnd' v-else)
</template>

<script>
import createState from '../mixins/createState';
import loading from '../mixins/loading';
import one from './type.one';
import two from './type.two';
import three from './type.three';
import four from './type.four';
import five from './type.five';
import six from './type.six';
import seven from './type.seven';
import eight from './type.eight';

export default {
  mixins: [
    createState('loading'),
    loading,
  ],
  props: {
    loadType: {
      type: Number,
      default: 0,
    },
  },
  components: {
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
  },
}
</script>
