<template>
  <div class="vp-image">
    <img :src="readFileReslut" @load="loadComplete" v-show="isLoad" class="animated fadeIn" v-if="readFileReslut !== '' &&  readFileReslut !== null"/>
    <div v-else>NO IMAGES</div>
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
        default: '#',
      },
      file: {
        type: File,
        default: null,
      }
    },
    watch: {
      file(data) {
        if (data) {
          this.imageFile = data;
          this.readFileReslut = '#';
          this.isLoad = false;
          this.readFile(data);
        }
      },
      link(link) {
        this.imageLink = !link || link === '' ? '#' : link;
        this.readFileReslut = this.imageLink;
      },
      width(width) {
        this.imageWidth = width;
      },
      height(height) {
        this.imageHeight = height;
      },
    },
    data() {
      return {
        isLoad: false,
        imageLink: !this.link || this.link === '' ? '#' : this.link,
        imageFile: this.file,
        imageWidth: this.width,
        imageHeight: this.height,
        readFileReslut: this.file ? '#' : this.link,
      };
    },
    mounted() {
      this.readFile(this.imageFile);
    },
    activated() {
      this.readFile(this.imageFile);
    },
    methods: {
       getRealMimeType(reader) {
          const arr = (new Uint8Array(reader.result)).subarray(0, 4);
          let realMimeType;
          let header = '';

          for (var i = 0; i < arr.length; i++) {
              header += arr[i].toString(16);
          }

          // magic numbers: http://www.garykessler.net/library/file_sigs.html
          switch (header) {
              case "89504e47":
                  realMimeType = "image/png";
                  break;
              case "47494638":
                  realMimeType = "image/gif";
                  break;
              case "ffd8ffDB":
              case "ffd8ffe0":
              case "ffd8ffe1":
              case "ffd8ffe2":
              case "ffd8ffe3":
              case "ffd8ffe8":
                  realMimeType = "image/jpeg";
                  break;
              default:
                  realMimeType = "unknown"; // Or you can use the blob.type as fallback
                  break;
          }

          return realMimeType;
      },
      readFile(file) {
        if (file === null) return;
        const reader = new FileReader();
        const base64 = new FileReader();

        reader.onload = () => {
          base64.readAsDataURL(file);
          base64.onloadend =  () => {
              this.readFileReslut = base64.result;
              this.$emit('onload', base64.result);
              this.isLoad = true;
          };
        }
        reader.readAsArrayBuffer(file);
      },
      loadComplete() {
        this.isLoad = true;
      },
    },
  };
</script>
