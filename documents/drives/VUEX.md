# drives/vuex

vuex的二次封装。

## 示例代码

step.1、定义Store

    import { vxStore } from 'vue-ui-drives/modules/vuex-drives';

    // 假设menus的数据需应用于home。
    function menus(store) {
      store.setMeal('title', null);
      store.setMeal('list', [
        { key: 0, name: 'item-0' },
        { key: 1, name: 'item-1' },
      ]);
    }

    export default vxStore((Processor) => {
      menus(new Processor('home'));
    });

step.2、装载Getters，Actions

    <template>
      <div class="home">
        <h4>{{ home.title }}</h4>
        <ul>
          <li v-for="item in home.list" @click="onMenusClick(item.key)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </template>

    <script>
      import { vxActions, vxGetters } from 'vue-ui-drives/modules/vuex-drives';

      export default {
        computed: {
          ...vxGetters('home'),
        },
        methods: {
          ...vxActions('home'),
          onMenusClick(id) {
            this.home.setTitle();
          },
        },
      };
    </script>

    <style :lang="postcss">
    </style>
