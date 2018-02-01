<template>
  <div class="vp-file" :class="{ 'vp-file-disabled': hasDisabled }">
    <a href="javascript:void(0)" class="vp-select-file" v-if="!hasDisabled">
      <div v-if="!hasShowSlotContent">
        <span class="psm-icon psm-upload-file"></span>
        <span class="vp-file-button-name">{{componentName}}</span>
      </div>
      <slot name="file-button-content" v-else/>
      <input type="file" value="componetName" :multiple="hasMultipleUpload" ref="fileUpload" @change="getFiles"/>
    </a>
    <div v-if="hasShowDefaultFileList">
      <p class="vp-file-limit" v-if="fileExtendLimit && !hasDisabled">允许上传的文件格式：{{fileExtendLimit}}</p>
      <ul class="vp-files">
        <li class="vp-file-item" v-for="file in fileCollect" :class="verifyFileExtend(file.name) ? '' : 'vp-file-extend-error'">
          <p class="vp-file-tips" v-if="!verifyFileExtend(file.name)">文件格式错误，请更换上传文件。</tips>
          <p class="vp-file-name">文件名称：{{file.name}}</p>
          <p class="vp-file-size">文件大小：{{(file.size / 1024 / 1024).toFixed(2)}}MB</p>
          <p class="vp-file-last-modified">修改日期：{{file.lastModifiedDate}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: '选择上传文件',
      },
      limit: {
        type: String,
        default: null,
      },
      files: {
        type: Array,
        default: () => [],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      hasShowSlot: {
        type: Boolean,
        default: false,
      },
      hasMultiple: {
        type: Boolean,
        default: false,
      },
      hasShowcase: {
        type: Boolean,
        default: true,
      },
    },
    watch: {
      files(files) {
        this.fileCollect = files;
      },
      disabled(status) {
        this.hasDisabled = status;
      },
    },
    data() {
      return {
        componentName: this.name,
        fileExtendLimit: this.limit,
        fileCollect: this.files,
        hasDisabled: this.disabled,
        hasShowDefaultFileList: this.hasShowcase,
        hasShowSlotContent: this.hasShowSlot,
        hasMultipleUpload: this.hasMultiple,
      };
    },
    methods: {
      getFiles() {
        const { fileUpload } = this.$refs;
        const files = [];
        for (let i = 0; i < fileUpload.files.length; i += 1) {
          const file = fileUpload.files[i];
          if (!this.verifyFileExtend(file.name)) continue;
          files.push(file);
        }
        this.fileCollect = files;
        this.$emit('selected', files);
      },
      verifyFileExtend(name) {
        const { fileExtendLimit } = this;
        if (!fileExtendLimit) return true;
        const rules = new RegExp(`^.*?\\.(${fileExtendLimit.replace(/,/g, '|')})`);
        const result = rules.test(name);
        this.$emit('verify', result);
        return result;
      },
    },
  };
</script>
