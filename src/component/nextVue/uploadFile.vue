<template lang='pug'>
  div.lilia-upload-file.lilia(:class='this.status === "disabled" ? "upload-file-disabled" : ""')
    div.upload-disabled-mask(v-if='this.status === "disabled"')
    div.upload-button
      div.upload-button-content
        span.iconfont.icon-insertdrivefile
        span.upload-button-name {{ name }}
        span.upload-button-limit {{ limit !== '' ? `  / 支持文件类型：${limit}` : '' }}
      input(type='file' :name='name' :multiple='isMultiple' @change='getFiles')
    div.file-list
      ul
        li.file-item(v-for='file in files' :class='{"file-extend-error": !verifyFileExtend(file.name)}')
          div.file-item-preview(v-if='isShowImage')
            lilia-image(:file='file')
          div.file-item-content
            p.file-error(v-if='!verifyFileExtend(file.name)') 文件格式错误，请更换上传文件。
            div.file-item-line
              span.name 文件名称：
              span.value {{ file.name }}
            div.file-item-line
              span.name 文件大小：
              span.value {{ MB(file.size) }}MB
            div.file-item-line
              span.name 修改日期：
              span.value {{ file.lastModifiedDate }}
</template>

<script>
import createState from './mixins/createState';
import disabled from './mixins/disabled';
import uploadFile from './mixins/uploadFile';

export default {
  mixins: [
    createState('uploadFile'),
    disabled,
    uploadFile,
  ],
  props: {
    name: {
      type: String,
      default: '选择上传文件',
    },
    isShowImage: {
      type: Boolean,
      default: false,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
