import Vuex, {
  Store,
  mapActions,
  mapGetters,
} from 'vuex';

import {
  eq,
  firstUppercase,
  loop,
} from '../../common';

const $actions = {};
const $getters = {};
const $mutations = {};
const $states = {};
const namespaces = [];

function buildStore(namespace = '') {
  const store = {
    actions: {},
    getters: {},
    mutations: {},
    state: {},
  };
  let ns = namespace;

  $actions[ns] = [];
  $getters[ns] = [];
  $mutations[ns] = [];
  $states[ns] = [];

  this.readState = (state, n) => state[this.namespace(n)];
  this.mealName = n => `set${firstUppercase(ns)}${firstUppercase(n)}`;
  this.namespace = n => `${ns}${firstUppercase(n)}`;
  this.setScope = (name) => { ns = eq(ns, '') ? name : ns; };
  this.struct = store;

  // Meal
  this.meal = (n, params) => {
    const name = this.namespace(n);
    const actionName = `set${firstUppercase(name)}`;

    store.state[name] = params;
    store.getters[name] = state => state[name];

    store.actions[actionName] = ({ state }, payload) => {
      state[name] = payload;
      state[ns][n] = payload;
    };

    store.mutations[name] = (state, payload) => {
      state[name] = payload;
      state[ns][n] = payload;
    };

    $actions[ns].push(actionName);
    $getters[ns].push(storeName);
    $mutations[ns].push(storeName);
    $states[ns].push(storeName);
  };

  // Mutation
  this.mutation = (n, callback) => {
    const name = this.namespace(n);

    store.mutations[name] = callback;

    $mutations[ns].push(name);
  };

  // Getter
  this.getter = (n, callback = null) => {
    const name = this.namespace(n);

    store.getters[name] = !eq(callback, null) ? callback : state => state[name];

    $getters[ns].push(name);
  };

  // Action
  this.action = (n, callback) => {
    const name = this.namespace(n);

    store.actions[name] = (item, params) => {
      const actionPack = {
        ...item,

        push: (mn, v) => {
          item.commit(this.namespace(mn), v);
        },
        publish: (names) => {
          loop(names,
            (v, sn) => item.commit(this.namespace(sn), v));
        },
        doth: (mn, params) => {
          item.dispatch(this.namespace(mn), params);
        },
      };

      return JUDGE.DO_FUN(callback, [
        actionPack,
        params,
      ]);
    };

    $actions[ns].push(name);
  };

  // State
  this.state = (maps) => {
    if (JUDGE.NO_CON(ns, namespaces)) {
      namespaces.push(ns);

      store.state[ns] = {};
      store.getters[ns] = state => state[ns];
    }

    loop(maps, (params, n) => {
      const stateSpace = store.state[ns];
      const name = this.namespace(n);

      this.meal(n, params);

      stateSpace[n] = params;
      store.getters[name] = state => state[name];
      store.state[name] = params;

      store.mutations[name] = (state, payload) => {
        state[name] = payload;
        stateSpace[n] = payload;
      };

      $getters[ns].push(name);
      $mutations[ns].push(name);
      $states[ns].push(name);
    });
  };
};

export const create = function create(Vue, process) {
  const store = buildStore();

  store.use = (key, target) => {
    state.prototype[key] = target;
  }

  JUDGE.DO_FUN(process, [state]);
  Vue.use(Vuex);

  return new Store(store.struct);
};

const maps = function maps(ns, nameList, category) {
  return !eq(nameList, null) ? nameList.map((name) => {
    return `${ns}${firstUppercase(name)}`;
  }) : category[ns];
}

export const getters = function getters(ns, nameList = null) {
  if (!$getters[ns]) {
    return {};
  }

  return mapGetters(maps(ns, nameList, $getters));
}

export const getterNS = function getterNS(ns) {
  if (JUDGE.NO_CON(ns, namespaces)) {
    return {};
  }

  return mapGetters(namespaces);
}

export const getterAll = function getterAll(ns, nameList = null) {
  if (JUDGE.NO_CON(ns, namespaces) && !$getters[ns]) {
    return {};
  }

  return mapGetters([
    ...maps(ns, nameList, $getters),
    ...namespaces,
  ]);
}

export const actions = function actions(ns, nameList = null) {
  if (!$actions[ns]) {
    return {};
  }

  return mapActions(maps(ns, nameList, $actions));
}

export default {
  actions,
  create,
  getterAll,
  getterNS,
  getters,
};
