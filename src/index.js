import Router from 'vue-router';
import underscore from './_';
import _stateMachine from './stateMachine';
import _createState from './component/nextVue/mixins/createState';
import _drive from './drive';
import _util from './util';
import _vue from './component/vue';

export const component = _vue;
export const drive = _drive;
export const util = _util;
export const StateMachine = _stateMachine;
export const vueStateMachine = _createState;
export const _ = underscore;

// 简写
export const $vue = {
  state: (n, d) => drive.Vue.state(n, d),
  store: (v, c) => drive.Vue.store.create(v, c),
  getters: (n) => drive.Vue.store.getterAll(n),
  actions: (n) => drive.Vue.store.actions(n),
}

export const start = (Vue, state) => {
  const program = (App, router) => {
    Vue.use(Router);
    util.Storage.memory('lilia_vue_components', component.register(Vue));
    program.router = new Router(router);

    return new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router: program.router,
      store: program.store,
    });
  };

  program.store = $vue.store(Vue, (Store) => {
    program.setStoreUse = Store.use;
    Object.entries(state).map(([name, build]) => build(new Store(name)));
  });

  return program;
}

export default {
  _,
  start,
  component,
  StateMachine,
  vueStateMachine,
  drive,
  util,
  $vue,
};
