import Router from 'vue-router';
import common, { JUDGE, loop, memory, importScripts } from './common';
import createState from './component/vue/mixins/createState';
import drive, { requestPack, Request } from './drive';
import mixins from './component/vue/mixins';
import stateMachine from './stateMachine';
import component from './component/vue';

const originalPush = Router.prototype.push;

// vue-router 3.7.1版本的NavigationDuplicated问题处理
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush
      .call(this, location, onResolve, onReject);
  }

  const res = originalPush.call(this, location);

  if (!res || !res.catch) {
    return res;
  }

  return res.catch(err => err);
}

export const REQ = requestPack;
export const StateMachine = stateMachine;
export const _ = common;
export const store = {
  actions: (n) => drive.Vue.store.actions(n),
  getters: (n) => drive.Vue.store.getters(n),
  state: (n, d) => drive.Vue.state(n, d),
  store: (v, c) => drive.Vue.store.create(v, c),
};
export const vueComponentStore = drive.Vue.state;

// Vue运行的封装，在项目内用于凸显项目主要业务内容，无需过多关注Vue的方法
export const vueRun = (Vue, stores, middleware = []) => {
  const store = drive.Vue.store.create(Vue, (Store) => {
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
  JUDGE,
  Request,
  common,
  component,
  createState,
  drive,
  importScripts,
  mixins,
  requestPack,
};

export default {
  JUDGE,
  REQ: requestPack,
  Request,
  StateMachine,
  common,
  component,
  createState,
  drive,
  importScripts,
  mixins,
  requestPack,
  store,
  vueComponentStore,
  vueRun,
};
