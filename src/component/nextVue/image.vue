<template lang='pug'>
  div.lilia-image.lilia
    lilia-loading(:isEnd='file64 !== null' :loadType='5')
      div(slot='loadEnd')
        img.image-body.animated.fadeIn(:src='file64')
</template>

<script>
import createState from './mixins/createState';
import image from './mixins/image';

export default {
  mixins: [
    createState('image'),
    image,
  ],
  mounted() {
    this.liliaState.wheelFlowAction('load');
  },
};
</script>
