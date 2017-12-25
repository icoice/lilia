'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vxActions = exports.vxGetters = exports.vxStore = undefined;

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeGetters = {};
var storeActions = {};
var storeMutations = {};
var storeStates = {};

// vxStore的构造函数
var vxStore = exports.vxStore = function vxStore(Vue, process) {
  var store = {
    state: {},
    getters: {},
    actions: {},
    mutations: {}
  };

  var Processor = function Processor() {
    var processName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var namespace = processName;
    storeGetters[namespace] = [];
    storeActions[namespace] = [];
    storeMutations[namespace] = [];
    storeStates[namespace] = [];

    this.setStoreScope = function setStoreScope(name) {
      namespace = namespace === '' ? name : namespace;
    };

    this.namespace = function setNamespace(name) {
      return '' + namespace + (0, _utils.firstLetterUppercase)(name);
    };

    this.mealActionName = function mealActionName(name) {
      return 'set' + (0, _utils.firstLetterUppercase)(namespace) + (0, _utils.firstLetterUppercase)(name);
    };

    this.getState = function getState(state, name) {
      return state[this.namespace(name)];
    };

    this.setMeal = function setMeal(name, params) {
      var storeName = this.namespace(name);
      var actionName = 'set' + (0, _utils.firstLetterUppercase)(storeName);
      store.state[storeName] = params;
      store.actions[actionName] = function (_ref, params) {
        var state = _ref.state;

        state[storeName] = params;
      };
      store.mutations[storeName] = function (state, payload) {
        state[storeName] = payload;
      };
      store.getters[storeName] = function (state) {
        return state[storeName];
      };
      storeStates[namespace].push(storeName);
      storeActions[namespace].push(actionName);
      storeMutations[namespace].push(storeName);
      storeGetters[namespace].push(storeName);
    };

    this.setMutation = function setMutation(name, callback) {
      var storeName = this.namespace(name);
      store.mutations[storeName] = callback;
      storeMutations[namespace].push(storeName);
    };

    this.setGetter = function setGetter(name) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var storeName = this.namespace(name);
      store.getters[storeName] = callback !== null ? callback : function (state) {
        return state[storeName];
      };
      storeGetters[namespace].push(storeName);
    };

    this.setAction = function setAction(name, callback) {
      var storeName = this.namespace(name);
      store.actions[storeName] = callback;
      storeActions[namespace].push(storeName);
    };

    this.setState = function setState(name, params) {
      var storeName = this.namespace(name);
      store.state[storeName] = params;
      store.getters[storeName] = function (state) {
        return state[storeName];
      };
      store.mutations[storeName] = function (state, payload) {
        state[storeName] = payload;
      };
      storeMutations[namespace].push(storeName);
      storeStates[namespace].push(storeName);
      storeGetters[namespace].push(storeName);
    };
  };

  Processor.use = function use(key, target) {
    Processor.prototype[key] = target;
  };

  if (typeof process === 'function') process(Processor);

  Vue.use(_vuex2.default);
  return new _vuex.Store(store);
};

var maps = function maps(namespace, nameList, category) {
  return nameList !== null ? nameList.map(function (name) {
    return '' + namespace + (0, _utils.firstLetterUppercase)(name);
  }) : category[namespace];
};

var vxGetters = exports.vxGetters = function vxGetters(namespace) {
  var nameList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!storeGetters[namespace]) return {};
  return (0, _vuex.mapGetters)(maps(namespace, nameList, storeGetters));
};

var vxActions = exports.vxActions = function vxActions(namespace) {
  var nameList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!storeActions[namespace]) return {};
  return (0, _vuex.mapActions)(maps(namespace, nameList, storeActions));
};

exports.default = {
  vxStore: vxStore,
  vxGetters: vxGetters,
  vxActions: vxActions
};