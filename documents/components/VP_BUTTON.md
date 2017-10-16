# vp-button

按钮组件。

## 示例代码

    <template>
      <vp-button :name="btnName"  :disabled="btnDisabled" @tap="onTap">
        <span slot="button-name">按钮</span>
      </vp-button>
    </template>

    <script>
      import { vpButton } from '@VUID_COMPONENTS_PUBLIC';

      export default {
        components: {
          vpButton,
        },
        data: {
          btnName: 'btn1', // vpButton的name属性用于区别不同的vpButton。
          btnDisabled: false,
        },
        methods: {
          onTap({ name, event }) {
            // name属性来自vpButton的name定义。
            // event属性为DOM的事件对象。
          },
        },
      };
    </script>

    <style lang="postcss">
      /* 可复写的css属性 */
      .vp-button {...}
      .vp-button-touch {...}
      .vp-button-disabled {...}
      .vp-button-hover {...}
      .vp-button-has-tapped {...}
    </style>
