# drives/vuex

vuex的二次封装。

## 示例代码

step.1、定义Store

    import { vxStore } from 'vue-ui-drives/modules/vuex-drives';

    // 假设menus的数据需应用于home。
    function menus(store) {
      // 设置全套行为，state, action, mutation, getter等所有行为。
      // 只要不需要转换数据内容，输出单纯是提取state的场合，可以用setMeal。
      // store还支持其他方法，setAction、setMutation、setState、setGetter。
      // 当setState已设置state内容时，默认会设置getter内容，无特殊修改的情况下可以不定义setGetter。
      // 当setState已设置state内容时，默认会设置mutation内容，无特殊修改的情况下可以不定义setMutation。
      store.setMeal('list', [
        {
          key: 0,
          name: 'item-0',
        },
        {
          key: 1,
          name: 'item-1',
        }
      ]);
    }

    export default vxStore((Processor) => {
      menus(new Processor('home'));
    });

step.2、装载Getters，Actions

    <template>
      <div class="home">
        <ul>
          <li v-for="item in homeMenus" @click="onMenusClick(item.key)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </template>

    <script>
      import { vxActions, vxGetters } from 'vue-ui-drives/modules/vuex-drives';

      export default {
        computed: {
          // 会把home下面定义的getter全部获得，不需要逐个声明
          ...vxGetters('home'),
        },
        methods: {
          // 通过setMeal定义的一组store行为，注意actions的命名是会多一个set前缀，比如Getter为'homeList'、那么Action则为'setHomeList'。
          ...vxActions('home'),
          onMenusClick(id) {
            // ...
          },
        },
      };
    </script>

    <style :lang="postcss">
    </style>
