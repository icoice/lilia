# drives/vuex

处理store内部关系。

## 示例代码

step 1、定义Store

    export default function demo(store) {
      const { http } = store;

      store.state({
        list: null,
        total: 0,
      });

      store.action('get', ({ dispatch }, params) => {
        http.getDemoData(params).then((res) => {
          dispatch({
            list: res.data.list,
            total: res.data.total,
          });
        });
      });
    }

step 2、创建Store

    import { vmDrives } from 'vue-moo';
    import Vue from 'vue';
    import demo from './demo/store';
    import http from '../adapter/http';

    const { vxStore } = vmDrives.vuex;

    export default vxStore(Vue, (Store) => {
      Store.use('http', http);
      [ demo ].map(set => set(new Store('demo')));
    });


step 3、装载Getters，Actions

    <template>
      <div :class="name">
        <h4>demo</h4>
        <vm-table :theads="vmTable.theads" :data="demo.list">
          <p slot="no-data-mess">{{ vmTable.tips }}</p>
        </vm-table>
        <vm-paging :total="demo.total"/>
      </div>
    </template>

    <script>
      import { vmDrives } from 'vue-moo';
      import vmConfig from './vm.config';

      const name = 'demo';
      const { vxGettersNS, vxActions } = vmDrives.vuex;

      export default {
        computed: {
          ...vxGettersNS(name),
        },
        methods: {
          ...vxActions(cpName),
        },
        name,
        mounted() {
          this.demoGet();
        },
        data: () => ({
          ...vmConfig,
        }),
      };
    </script>
