# vp-input

输入框组件。

## 示例代码

    <template>
      <vp-input
          :type="'text' || 'password'"
          :hasKey="key"
          :maxLength="20"
          :defValue="value"  
          :disabled="disabled"
          :placeholder="placeholder"
          @clear="onClear"
          @update="onChange"/>
    </template>

    <script>
      import { vpInput } from '@VUID_COMPONENTS_PUBLIC';

      export default {
        components: {
          vpInput,
        },
        data: {
          //  type属性表示input的类型，maxLength限制input的输入长度。
          value:  '12323',
          placeholder: '请输入内容',
          disabled: false, // 是否禁止输入
          key: null, // 当hasKey为String或Number时，会改变onChange的返回参数的类型。
        },
        methods: {
          // vp-input有输入内容时，会自动显示清除内容的按钮, 发生清除会触发clear事件。
          onClear() {},
          onChange(name) {
            // hasKey存在时，返回一个｛[hasKey]: name｝的对象，否则仅返回输入值。
          },
        },
      };
    </script>

    <style lang="postcss">
      /* 可复写的css属性 */
      .vp-input {...}
      .vp-input-container {...}
      .vp-input-disabled {...}
    </style>
