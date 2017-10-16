import Vuex, { Store, mapGetters, mapActions } from 'vuex';
import { firstLetterUppercase } from '../../utils';

const storeGetters = {};
const storeActions = {};
const storeMutations = {};
const storeStates = {};

export const vxStore = function vxStore(Vue, process) {
  const store = {
    state: {},
    getters: {},
    actions: {},
    mutations: {},
  };

  const Processor = function(processName = '') {
    let nameSpace = processName;
    storeGetters[nameSpace] = [];
    storeActions[nameSpace] = [];
    storeMutations[nameSpace] = [];
    storeStates[nameSpace] = [];

    this.setStoreScope = function setStoreScope(name) {
      nameSpace = nameSpace === '' ? name : nameSpace;
    };

    this.nameSpace = function setNameSpace(name) {
      return `${nameSpace}${firstLetterUppercase(name)}`;
    };

    this.getState = function getState(state, name) {
     return state[this.nameSpace(name)];
    };

    this.setMeal = function setMeal(name, params) {
      const storeName = this.nameSpace(name);
      const actionName = `set${firstLetterUppercase(storeName)}`;
      store.state[storeName]  = params;
      store.actions[actionName]  =  ({ state }, params) => {
        state[storeName] = params;
      };
      store.mutations[storeName]  =  (state,  payload) => {
        state[storeName] = payload;
      };
      store.getters[storeName]  =  state => state[storeName];
      storeStates[nameSpace].push(storeName);
      storeActions[nameSpace].push(actionName);
      storeMutations[nameSpace].push(storeName);
      storeGetters[nameSpace].push(storeName);
    };

    this.setMutation = function setMutation(name, callback) {
     const storeName = this.nameSpace(name);
     store.mutations[storeName] = callback;
     storeMutations[nameSpace].push(storeName);
    };

   this.setGetter = function setGetter(name, callback = null) {
     const storeName = this.nameSpace(name);
     store.getters[storeName] = callback !== null ? callback : state =>  state[storeName];
     storeGetters[nameSpace].push(storeName);
    };

    this.setAction = function setAction(name, callback) {
      const storeName = this.nameSpace(name);
      store.actions[storeName] = callback;
      storeActions[nameSpace].push(storeName);
    };

   this.setState = function setState(name, params) {
     const storeName = this.nameSpace(name);
     store.state[storeName] = params;
     store.getters[storeName] = state =>  state[storeName];
     storeStates[nameSpace].push(storeName);
     storeGetters[nameSpace].push(storeName);
   };
  };

  if (typeof process === 'function')  process(Processor);
  Vue.use(Vuex);
  return new Store(store);
};

const maps = function(nameSpace, nameList, category) {
  return nameList !== null ? nameList.map((name) => {
    return  `${nameSpace}${firstLetterUppercase(name)}`;
  }) : category[nameSpace];
}

export const vxGetters = function vxGetters(nameSpace, nameList = null) {
  console.log(nameSpace, storeGetters);
  if (!storeGetters[nameSpace]) return {};
  return mapGetters(maps(nameSpace, nameList, storeGetters));
}

export const vxActions = function vxActions(nameSpace, nameList = null) {
  if (!storeActions[nameSpace]) return {};
  return mapActions(maps(nameSpace, nameList, storeActions));
}

export default {
  vxStore,
  vxGetters,
  vxActions,
};
