<template lang='pug'>
  div.lilia-file(:class="['lilia', m$Disabled ? 'lilia-file-disabled' : '']")
    div.select-file(v-if='!m$Disabled')
      div(v-if='!m$HasShowSlot')
        span.iconfont(class='icon-upload')
        span.file-button-name {{ `${m$Name}${ m$Limit && !m$Disabled ? `（可上传类型：${ m$Limit }）` : '' }` }}
      slot(name='file-button-content' v-else)
      input(
        type='file'
        :name='m$Name'
        :multiple='m$HasMultiple'
        ref='fileUpload'
        @change='getFiles')
    div.file-list(v-if='m$HasShowcase')
      ul.files
        li.file-item(v-for='file in m$Files' :class="verifyFileExtend(file.name) ? '' : 'file-extend-error'")
          p.file-tips(v-if='!verifyFileExtend(file.name)') 文件格式错误，请更换上传文件。
          p.file-name 文件名称：{{ file.name }}
          p.file-size 文件大小：{{ mb(file.size) }}MB
          p.file-last-modified 修改日期：{{ file.lastModifiedDate }}
</template>

<script>
import btn from '../button';
import actions from './actions';

const drive = window.$lilia_drive;

export default {
  ...drive.Vue.state('m$', {
    name: [String, ''],
    limit: [String, null],
    files: [Array, () => []],
    disabled: [Boolean, false],
    hasShowSlot: [Boolean, false],
    hasMultiple: [Boolean, false],
    hasShowcase: [Boolean, true],
  }),
  ...actions,
};
</script>
