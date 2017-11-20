import Vuex, { Store, mapGetters, mapActions } from 'vuex';
import { firstLetterUppercase } from '../../utils';

const storeGetters = {};
const storeActions = {};
const storeMutations = {};
const storeStates = {};

// vxStore的构造函数
export const vxStore = function vxStore(Vue, process) {
  const store = {
    state: {},
    getters: {},
    actions: {},
    mutations: {},
  };

  const Processor = function(processName = '') {
    let namespace = processName;
    storeGetters[namespace] = [];
    storeActions[namespace] = [];
    storeMutations[namespace] = [];
    storeStates[namespace] = [];

    this.setStoreScope = function setStoreScope(name) {
      namespace = namespace === '' ? name : namespace;
    };

    this.namespace = function setNamespace(name) {
      return `${namespace}${firstLetterUppercase(name)}`;
    };

    this.mealActionName = function mealActionName(name) {
      return `set${firstLetterUppercase(namespace)}${firstLetterUppercase(name)}`;
    };

    this.getState = function getState(state, name) {
     return state[this.namespace(name)];
    };

    this.setMeal = function setMeal(name, params) {
      const storeName = this.namespace(name);
      const actionName = `set${firstLetterUppercase(storeName)}`;
      store.state[storeName]  = params;
      store.actions[actionName]  =  ({ state }, params) => {
        state[storeName] = params;
      };
      store.mutations[storeName]  =  (state,  payload) => {
        state[storeName] = payload;
      };
      store.getters[storeName]  =  state => state[storeName];
      storeStates[namespace].push(storeName);
      storeActions[namespace].push(actionName);
      storeMutations[namespace].push(storeName);
      storeGetters[namespace].push(storeName);
    };

    this.setMutation = function setMutation(name, callback) {
     const storeName = this.namespace(name);
     store.mutations[storeName] = callback;
     storeMutations[namespace].push(storeName);
    };

   this.setGetter = function setGetter(name, callback = null) {
     const storeName = this.namespace(name);
     store.getters[storeName] = callback !== null ? callback : state =>  state[storeName];
     storeGetters[namespace].push(storeName);
    };

    this.setAction = function setAction(name, callback) {
      const storeName = this.namespace(name);
      store.actions[storeName] = callback;
      storeActions[namespace].push(storeName);
    };

   this.setState = function setState(name, params) {
     const storeName = this.namespace(name);
     store.state[storeName] = params;
     store.getters[storeName] = state => state[storeName];
     store.mutations[storeName]  =  (state,  payload) => {
       state[storeName] = payload;
     };
     storeMutations[namespace].push(storeName);
     storeStates[namespace].push(storeName);
     storeGetters[namespace].push(storeName);
   };
  };

  Processor.use = function use(key, target) {
    Processor.prototype[key] = target;
  }

  if (typeof process === 'function')  process(Processor);

  Vue.use(Vuex);
  return new Store(store);
};

const maps = function(namespace, nameList, category) {
  return nameList !== null ? nameList.map((name) => {
    return  `${namespace}${firstLetterUppercase(name)}`;
  }) : category[namespace];
}

export const vxGetters = function vxGetters(namespace, nameList = null) {
  if (!storeGetters[namespace]) return {};
  return mapGetters(maps(namespace, nameList, storeGetters));
}

export const vxActions = function vxActions(namespace, nameList = null) {
  if (!storeActions[namespace]) return {};
  return mapActions(maps(namespace, nameList, storeActions));
}

export default {
  vxStore,
  vxGetters,
  vxActions,
};
