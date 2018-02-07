import Vuex, { Store, mapGetters, mapActions } from 'vuex';
import util from '../../util';

const storeGetters = {};
const storeActions = {};
const storeMutations = {};
const storeStates = {};
const stateNamespaces = [];

// create的构造函数
export const create = function create(Vue, process) {
  const store = {
    state: {},
    getters: {},
    actions: {},
    mutations: {},
  };

  const state = function(processName = '') {
    let namespace = processName;
    storeGetters[namespace] = [];
    storeActions[namespace] = [];
    storeMutations[namespace] = [];
    storeStates[namespace] = [];

    this.setStoreScope = function setStoreScope(name) {
      namespace = namespace === '' ? name : namespace;
    };

    this.namespace = function setNamespace(name) {
      return `${namespace}${util.String.firstUppercase(name)}`;
    };

    this.mealActionName = function mealActionName(name) {
      return `set${util.String.firstUppercase(namespace)}${util.String.firstUppercase(name)}`;
    };

    this.getState = function getState(state, name) {
     return state[this.namespace(name)];
    };

    this.meal = function setMeal(name, params) {
      const storeName = this.namespace(name);
      const actionName = `set${util.String.firstUppercase(storeName)}`;
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

    this.mutation = function setMutation(name, callback) {
     const storeName = this.namespace(name);
     store.mutations[storeName] = callback;
     storeMutations[namespace].push(storeName);
    };

   this.getter = function setGetter(name, callback = null) {
     const storeName = this.namespace(name);
     store.getters[storeName] = callback !== null ? callback : state =>  state[storeName];
     storeGetters[namespace].push(storeName);
    };

    this.action = function setAction(name, callback) {
      const storeName = this.namespace(name);
      store.actions[storeName] = (item, params) => {
        callback({
         ...item,
         dispatch: (nameList) => {
           Object.entries(nameList).map((kv) => {
             const [name, val] = kv;
             item.commit(this.namespace(name), val);
             return kv;
           });
         },
        }, params);
      };
      storeActions[namespace].push(storeName);
    };

   this.state = function setState(maps) {
     if (stateNamespaces.indexOf(namespace) < 0) {
      stateNamespaces.push(namespace);
      store.state[namespace] = {};
      store.getters[namespace] = state => state[namespace];
     }
     Object.entries(maps).map((kv) => {
      const [name, params] = kv;
      const stateSpace = store.state[namespace];
      const storeName = this.namespace(name);
      stateSpace[name] = params;
      store.state[storeName] = params;
      store.getters[storeName] = state => state[storeName];
      store.mutations[storeName]  = (state,  payload) => {
        state[storeName] = payload;
        stateSpace[name] = payload;
      };
      storeMutations[namespace].push(storeName);
      storeStates[namespace].push(storeName);
      storeGetters[namespace].push(storeName);
      return kv;
     });
   };
  };

  state.use = function use(key, target) {
    state.prototype[key] = target;
  }

  if (typeof process === 'function')  process(state);

  Vue.use(Vuex);
  return new Store(store);
};

const maps = function(namespace, nameList, category) {
  return nameList !== null ? nameList.map((name) => {
    return  `${namespace}${util.String.firstUppercase(name)}`;
  }) : category[namespace];
}

export const getters = function getters(namespace, nameList = null) {
  if (!storeGetters[namespace]) return {};
  return mapGetters(maps(namespace, nameList, storeGetters));
}

export const getterNS = function getters(namespace) {
  if (stateNamespaces.indexOf(namespace) < 0) return {};
  return mapGetters(stateNamespaces);
}

export const actions = function actions(namespace, nameList = null) {
  if (!storeActions[namespace]) return {};
  return mapActions(maps(namespace, nameList, storeActions));
}

export default {
  create,
  getterNS,
  getters,
  actions,
};
