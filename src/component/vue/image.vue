<template lang='pug'>
  div.lilia-image.lilia(ref='image')
    div.image-exception(
      v-if='isLoadImageFail && timeout >= 120000')
      span.fa.fa-picture-o
      p 图片载入超时
    div.image-exception(
      v-else-if='isLoadImageFail')
      span.fa.fa-picture-o
      p 图片载入失败
    div.image-exception(
      v-else-if='file === null')
      span.fa.fa-picture-o
      p(v-if='placeholder') {{ placeholder }}
    lilia-loading(
      v-else
      :isEnd='isReadOrigin || file64 !== null'
      :loadType='5')
      div(slot='loadEnd')
        img.image-body.animated.fadeIn(
          ref='imageBody'
          :src='isReadOrigin ? originFile : file64'
          @load='loadImageSuccess'
          @onerror='loadImageFail')
</template>

<script>
import createState from './mixins/createState';
import image from './mixins/image';

export default {
  mixins: [
    createState('image'),
    image,
  ],
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    // 宽度
    width: {
      type: Number,
      default: 100,
    },
    // 高度
    height: {
      type: Number,
      default: 100,
    },
    // 使用Rem
    useRem: {
      type: Boolean,
      default: true,
    },
    // 限制展示面积
    showArea: {
      type: Number,
      default: 500 * 500,
    },
    // 自动设置
    fitImage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoadImageFail: false, // 是否载入图片失败
    };
  },
  mounted() {
    this.fitImageSize();

    window.addEventListener('resize', () => {
      this.fitImageSize();
    }, false);
  },
  activated() { 
    this.fitImageSize();
  },
  methods: {
    measure(width, height, scale = 1) {
      const { showArea } = this;
      const nextWidth = width * scale;
      const nextHeight = height * scale;
      const imageArea = nextWidth * nextHeight; 

      if (showArea < imageArea && scale > 0) {
        return this.measure(width, height, scale - 0.1);
      } else {
        return {
          width: nextWidth,
          height: nextHeight,
        };
      }
    },
    setSize(num) {
      const { useRem } = this;

      return useRem ? `${num / 20}rem` : `${num}px`;
    },
    fitImageSize() {
      const { fitImage, $refs, width, height } = this;
      const { imageBody, image } = $refs;

      if (!image || !imageBody) {
        return fitImage;
      }

      if (!fitImage) {
        image.style.width = this.setSize(width);
        image.style.height = this.setSize(height);
        imageBody.style.width = '100%';
        imageBody.style.height = 'auto';

        return fitImage;
      }

      const size = this.measure(imageBody.naturalWidth, imageBody.naturalHeight);

      image.style.width = this.setSize(size.width);
      image.style.height = this.setSize(size.height);
      imageBody.style.width = this.setSize(size.width);
      imageBody.style.height = this.setSize(size.height);

      return fitImage;
    }, 
    loadImageSuccess() {
      this.isLoadImageFail = false;
      this.fitImageSize();
    },
    // 加载图片失败时
    loadImageFail() {
      this.isLoadImageFail = true;
    },
  },
};
</script>
