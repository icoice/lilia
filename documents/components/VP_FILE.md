# vp-file

文件上传组件, 配合FromData使用更佳。目前仅支持上传单个文件。

## 示例代码
    <template>
        <vp-file
          :name="请选择上传文件"
          limit="xls,txt,js"
          :files="files"
          :disabled="disabled"
          @selected="onSelected"/>
    </template>

    <script>
      export default {
        data: {
          // name属性变更按钮名称，limit用于提示上传文件格式，以及上传文件是否合法。
          files: [], // 默认的上传文件内容， 当然不包括实体。
          disabled: false, // 禁止上传时，上传按钮是不可见的。
        },
        method: {
          // 返回一个包含File对象的数组
          onSelected(files) {
            files.map({...});
          },
        },  
      }
    </script>

    <style lang="postcss">
      /*  可复写的样式 */
      .vp-file {...}
      .vp-file-button-name {...}
      .vp-file-limits {...}
      .vp-files {...}
    </style>
