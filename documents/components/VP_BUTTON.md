# vp-button

按钮组件，该组件目前仅支持tap事件，PC端的点击事件暂未支持。

## 示例代码

template

      <vp-button name="btn1"  :disabled="false" @tap="onTap">
        <span slot="button-name">按钮</span>
      </vp-button>

script

      <script>
        export default {
          methods: {
            onTap({ name, event }) {},
          },
        };
      </script>

style

    <style lang="postcss">
      /* 可复写的css属性, 基本单位为em */
      .vp-button {...}
      .vp-button-touch {...}
      .vp-button-disabled {...}
      .vp-button-hover {...}
      .vp-button-has-tapped {...}
    </style>
