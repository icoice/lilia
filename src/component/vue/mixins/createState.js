import { decideType, JUDGE, eq } from  '../../../common';
import state from '../state';

// 私有：保存已创建的状态机
const stateLibrary = {};
let primaryId = 0;

window.liliaComputmentState = id => (!id ? stateLibrary : stateLibrary[id]);

const props = {
  stateId: {
    type: [Number, String],
    default: null,
  },
};

const computed = {
  state() {
    const { stateInfo } = this;

    if (!stateInfo) {
      return null;
    }

    return stateLibrary[stateInfo.id];
  },
};

function data() {
  const { stateId } = this;

  primaryId += 1;

  return {
    stateInfo: {
      id: !stateId ? `${Date.now()}_${primaryId}` : stateId,
    },
  };
}

function isMyState(id) {
  const { stateInfo } = this;

  return eq(stateInfo.id, id);
}

// 创建状态机
function initState() {
  const { stateInfo } = this;

  return decideType([
    () => ({
      IS_OBJ: stateInfo,
    }),
  ],{
    clear() {
      const { id } = stateInfo;

      if (stateLibrary[id]) {
        return stateLibrary[id];
      }

      if (JUDGE.IS_FUN(stateName)) {
        stateLibrary[id] = stateName(id);
      } else {
        stateLibrary[id] = state[stateName]();
      }

      return stateLibrary[id];
    },
  });
}

// 获得状态机
function queryState() {
  const { stateInfo } = this;

  return decideType([
    () => ({
      IS_OBJ: stateInfo,
    }),
  ],{
    clear() {
      const { id, name } = stateInfo;

      this.initState();

      return stateLibrary[id];
    },
  });
}

function otherState(id) {
  return stateLibrary[id];
}

export default stateName => ({
  mounted() {
    this.initState();
  },
  unmounted() {
    const { stateInfo } = this;
    const { id } = stateInfo;

    delete stateLibrary[id];
  },
  props,
  data,
  computed,
  methods: {
    initState,
    isMyState,
    otherState,
    queryState,
  },
});
