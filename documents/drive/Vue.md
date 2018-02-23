# Vue

用于改写Vue一些用法。

## drive.Vue.state

part 1

    <template>
      <div class="demo">
        <span v-for="item in demoList">
          {{ item }}
        </span>
      </div>
    </template>

    import { drive } from 'vue-moo';

    <script>
      export default {
        ...drive.Vue.state('demo', {
          list: [Array, []],
        }),
      }
    </script>

part 2

    <templete>
      <demo :list="[1, 2, 3]"/>
    </template>

## drive.Vue.store

step 1

    export default (store) => {
      const { plugin } = store;

      store.state({
        list: null,
        total: 0,
      });

      store.action('get', ({ publish }, params = {}) => {
        publish({
          list: [1, 2, 3, 4],
          total: 3
        });
      });
    }

step 2

    import vue from 'vue';
    import { drive } from 'vue-moo';
    import demo from './map/demo';

    export default drive.Vue.store(vue, (Store) => {
      Store.use('plugin', {});
      demo(new Store('demo'));
    });


step 3、装载Getters，Actions

    <template>
      <div :class="name">
        <h4>demo</h4>
        <vm-table :theads="theads" :data="demo.list">
          <p slot="no-data-mess">xxxxxxxx</p>
        </vm-table>
        <vm-paging :total="demo.total"/>
      </div>
    </template>

    <script>
      import { drive } from 'vue-moo';

      const name = 'demo';
      const { store } = drive.Vue;

      export default {
        computed: {
          ...store.getters(name),
        },
        methods: {
          ...store.actions(name),
        },
        mounted() {
          this.demoGet();
        },
        data: () => ({
          name,
          theads: [],
        }),
      };
    </script>
