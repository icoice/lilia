# drives/vueState

vue组件的数据关联一键生成。

    export default {
      ...vueComponentState('demo', {
        list: [Array, []],
      }),
      mounted() {
        console.log(this.demoList, this.list);
      },
    };
