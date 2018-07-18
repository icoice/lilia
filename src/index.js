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

export default {
  component,
  drive,
  util,
  $vue,
};
