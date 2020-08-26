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
      p 未设置图片或图片链接
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
    fitImageSize() {
      const { fitImage, $refs } = this;
      const { imageBody, image } = $refs;

      if (!image || !imageBody) {
        return fitImage;
      }

      if (!fitImage) {
        image.style.width = 'auto';
        image.style.height = 'auto';
        imageBody.style.width = '100%';
        imageBody.style.height = 'auto';
        image.style.minWidth = `${100 * 0.2}rem`;
        image.style.minHeight = `${100 * 0.2}rem`;

        return fitImage;
      }

      const size = this.measure(imageBody.naturalWidth, imageBody.naturalHeight);

      image.style.width = `${size.width}px`;
      image.style.height = `${size.height}px`;
      imageBody.style.width = `${size.width}px`;
      imageBody.style.height = `${size.height}px`;
      image.style.minWidth = 'auto';
      image.style.minHeight = 'auto';

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
