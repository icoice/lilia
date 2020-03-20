import Router from 'vue-router';
import common, { JUDGE, loop, memory } from './common';
import createState from './component/vue/mixins/createState';
import drive, { requestPack } from './drive';
import mixins from './component/vue/mixins';
import stateMachine from './stateMachine';
import vue from './component/vue';

export const StateMachine = stateMachine;

export const _ = common;

export const store = {
  actions: (n) => drive.Vue.store.actions(n),
  getters: (n) => drive.Vue.store.getterAll(n),
  state: (n, d) => drive.Vue.state(n, d),
  store: (v, c) => drive.Vue.store.create(v, c),
};

// Vue运行的封装，在项目内用于凸显项目主要业务内容，无需过多关注Vue的方法
export const vueRun = (Vue, stores, middleware = []) => {
  const store = $vue.store(Vue, (Store) => {
    middleware.map(item => Store.use(item.name, item.use));
    loop(stores, (build, name) => build(new Store(name)));
  });

  Vue.use(Router);

  return (App, routes, callback) => {
    memory('lilia_vue_components', component.register(Vue));

    const router = new Router(routes);

    JUDGE.DO_FUN(callback, [
      { store, router },
    ]);

    return new Vue({
      components: { App },
      el: '#app',
      router,
      store,
      template: '<App/>',
    });
  };
}

export {
  common,
  component,
  drive,
  mixins,
};

export default {
  StateMachine,
  common,
  component,
  drive,
  mixins,
  store,
  vueRun,
};
