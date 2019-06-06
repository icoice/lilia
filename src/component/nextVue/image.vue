<template lang='pug'>
  div.lilia-image.lilia
    lilia-loading(:isEnd='isReadOrigin || file64 !== null' :loadType='5')
      div(slot='loadEnd')
        img.image-body.animated.fadeIn(v-if='webp && isSupportWebp'
          :src='webp' @error='isSupportWebp = false')
        // 如果压缩值为1， 且原数据不为文件对象时，则直接读取
        img.image-body.animated.fadeIn(v-else
          :src='isReadOrigin ? originFile : file64')
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
