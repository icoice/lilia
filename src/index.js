import Router from 'vue-router';
import _drive from './drive';
import _util from './util';
import _vue from './component/vue';

export const component = _vue;
export const drive = _drive;
export const util = _util;

// 简写
export const $vue = {
  state: (n, d) => drive.Vue.state(n, d),
  store: (v, c) => drive.Vue.store.create(v, c),
  getters: (n) => drive.Vue.store.getterAll(n),
  actions: (n) => drive.Vue.store.actions(n),
}

export const start = (Vue, state) => {
  const store = $vue.store(Vue, (Store) => {
    Object.entries(state).map(([name, build]) => build(new Store(name)));
  });

  return (App, router) => {
    Vue.use(Router);
    const components = component.register(Vue);
    util.Storage.memory('LILIA_VUE_COMPONENTS', components);
    return new Vue({
      el: '#app',
      router: new Router(router),
      store,
      components: { App },
      template: '<App/>',
    });
  };
}

export default {
  start,
  component,
  drive,
  util,
  $vue,
};
