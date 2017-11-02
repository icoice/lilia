<template>
  <div class="vp-image">
    <img :src="readFileReslut" @load="loadComplete" v-show="isLoad" class="animated fadeIn"/>
    <div class="vp-image-load animated rotateIn infinite" v-show="!isLoad">
      <span class="psm-icon psm-loading"></span>
    </div>
  </div>
</template>

<script>
  import vpButton from '.'

  export default {
    props: {
      width: {
        type: String,
        default: 'auto',
      },
      height: {
        type: String,
        default: 'auto',
      },
      link: {
        type: String,
        default: '',
      },
      file: {
        type: File,
        default: null,
      }
    },
    mounted() {
      this.readFile(this.imageFile);
    },
    watch: {
      file(data) {
        this.imageFile = data;
        this.readFileReslut = '#';
        this.isLoad = false;
        this.readFile(data);
      },
    },
    data() {
      return {
        isLoad: false,
        imageLink: this.link,
        imageFile: this.file,
        imageWidth: this.width,
        imageHeight: this.height,
        readFileReslut: this.file ? '#' : this.link,
      };
    },
    methods: {
      readFile(file) {
        if (!(file instanceof File) || (!file instanceof Blob)) return;

        const reader = new FileReader();

        reader.addEventListener('load', () => {
          this.isLoad = true;
          this.readFileReslut = reader.result;
          this.$emit('onload', reader.result);
        }, false);

        reader.readAsDataURL(file);
      },
      loadComplete() {
        this.isLoad = true;
      },
    },
  };
</script>
