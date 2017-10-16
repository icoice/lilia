# vp-loading

加载组件, 加载组件用于在展示上切换加载挂件或加载内容，组件可以独立使用，不需要加载内容。

## 示例代码

    <template>
      <vp-loading :isComplete="hasComplete" :description="description">
        <div slot="load-content">
          显示被加载加载内容。
        </div>
      </vp-loading>
    </template>
    <script>
      export default {
        data: {
          hasComplete: true,  // isComplete表示是否完成加载，所以默认状态是true
          desciption: '正在加载中...', // 加载时的描述文案
        },
      };
    </script>

    <style lang="postcss">
      /* 可复写的css属性 */
      .vp-loading {...}
      .vp-loading-mask {...}
      .vp-loading-description {...}
      .psm-icon {...}
    </style>
