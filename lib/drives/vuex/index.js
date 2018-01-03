'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vxActions = exports.vxGettersNS = exports.vxGetters = exports.vxStore = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeGetters = {};
var storeActions = {};
var storeMutations = {};
var storeStates = {};
var stateNamespaces = [];

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
      return '' + namespace + _utils2.default.firstUppercase(name);
    };

    this.mealActionName = function mealActionName(name) {
      return 'set' + _utils2.default.firstUppercase(namespace) + _utils2.default.firstUppercase(name);
    };

    this.getState = function getState(state, name) {
      return state[this.namespace(name)];
    };

    this.meal = function setMeal(name, params) {
      var storeName = this.namespace(name);
      var actionName = 'set' + _utils2.default.firstUppercase(storeName);
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

    this.mutation = function setMutation(name, callback) {
      var storeName = this.namespace(name);
      store.mutations[storeName] = callback;
      storeMutations[namespace].push(storeName);
    };

    this.getter = function setGetter(name) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var storeName = this.namespace(name);
      store.getters[storeName] = callback !== null ? callback : function (state) {
        return state[storeName];
      };
      storeGetters[namespace].push(storeName);
    };

    this.action = function setAction(name, callback) {
      var _this = this;

      var storeName = this.namespace(name);
      store.actions[storeName] = function (item, params) {
        callback((0, _extends3.default)({}, item, {
          dispatch: function dispatch(nameList) {
            (0, _entries2.default)(nameList).map(function (kv) {
              var _kv = (0, _slicedToArray3.default)(kv, 2),
                  name = _kv[0],
                  val = _kv[1];

              item.commit(_this.namespace(name), val);
              return kv;
            });
          }
        }), params);
      };
      storeActions[namespace].push(storeName);
    };

    this.state = function setState(maps) {
      var _this2 = this;

      if (stateNamespaces.indexOf(namespace) < 0) {
        stateNamespaces.push(namespace);
        store.state[namespace] = {};
        store.getters[namespace] = function (state) {
          return state[namespace];
        };
      }
      (0, _entries2.default)(maps).map(function (kv) {
        var _kv2 = (0, _slicedToArray3.default)(kv, 2),
            name = _kv2[0],
            params = _kv2[1];

        var stateSpace = store.state[namespace];
        var storeName = _this2.namespace(name);
        stateSpace[name] = params;
        store.state[storeName] = params;
        store.getters[storeName] = function (state) {
          return state[storeName];
        };
        store.mutations[storeName] = function (state, payload) {
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

  Processor.use = function use(key, target) {
    Processor.prototype[key] = target;
  };

  if (typeof process === 'function') process(Processor);

  Vue.use(_vuex2.default);
  return new _vuex.Store(store);
};

var maps = function maps(namespace, nameList, category) {
  return nameList !== null ? nameList.map(function (name) {
    return '' + namespace + _utils2.default.firstUppercase(name);
  }) : category[namespace];
};

var vxGetters = exports.vxGetters = function vxGetters(namespace) {
  var nameList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!storeGetters[namespace]) return {};
  return (0, _vuex.mapGetters)(maps(namespace, nameList, storeGetters));
};

var vxGettersNS = exports.vxGettersNS = function vxGetters(namespace) {
  if (stateNamespaces.indexOf(namespace) < 0) return {};
  return (0, _vuex.mapGetters)(stateNamespaces);
};

var vxActions = exports.vxActions = function vxActions(namespace) {
  var nameList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!storeActions[namespace]) return {};
  return (0, _vuex.mapActions)(maps(namespace, nameList, storeActions));
};

exports.default = {
  vxStore: vxStore,
  vxGettersNS: vxGettersNS,
  vxGetters: vxGetters,
  vxActions: vxActions
};