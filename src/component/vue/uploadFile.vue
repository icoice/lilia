<template lang='pug'>
  div.lilia-upload-file.lilia(
    :class='this.status === "disabled" ? "upload-file-disabled" : ""')
    div.upload-disabled-mask(v-if='this.status === "disabled"')
    div.upload-button
      div.upload-button-content
        span.fa.fa-upload
        span.upload-button-name {{ name }}
        span.upload-button-limit {{ limit !== '' ? `（仅支持${limit}）` : '' }}
      input(type='file' :name='name' :multiple='isMultiple' @change='getFiles')
    lilia-pop(v-if='inputFiles && inputFiles.length > 0')
      div(slot='pop-header') 已选择文件（{{ inputFiles.length }}）个
      div.file-list(slot='pop-body')
        ul
          li.file-item(v-for='file in inputFiles' :class='{"file-extend-error": !limitFile(file.name)}')
            div.file-item-preview(v-if='isShowImage && $IS_IMG(file)')
              lilia-image(:name='file.name' :file='file')
            div.file-item-content
              div.file-item-line
                span.name 文件名称：
                span.value {{ file.name }}
              div.file-item-line
                span.name 文件大小：
                span.value {{ MB(file.size) }}MB
              div.file-item-line
                span.name 修改日期：
                span.value {{ file.lastModifiedDate }}
              p.file-error(v-if='!limitFile(file.name)') 格式错误
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
      default: '上传文件',
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
