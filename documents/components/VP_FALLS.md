# vp-falls

流组件。

## 示例代码

    <template>
      <vp-falls :lines="groups">
        <!-- item -->
        <div slot="group-content-1">item1</div>
        <!-- item -->
        <div slot="group-content-2">item2</div>
        <!-- item -->
        <div slot="group-content-3">item3</div>
        <!-- item -->
        <div slot="group-content-4">item4</div>
      </vp-falls>
    </template>
    <script>
      // 按组进行排列，没有被写入的slot组件是不会被显示出来的。
      export default {
        data: {
          // line
          groups: [
            // line 1
            [
              'group-content-1',
              'group-content-2',
            ],
            // line 2
            [
              'group-content-3',
            ],
          ],
        },
      };
    </script>

    <style lang="postcss">
      /* 可复写的css属性 */
      .vp-falls {...}
      .vp-falls-lines {...}
      .vp-falls-item {...}
    </style>
