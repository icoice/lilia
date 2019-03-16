import _ from  '../../../_';
import state from  '../state';

const { decideType } = _;

// 私有：保存已创建的状态机
const STATE_LIBRARY = {};
let stateNo = 0;

window.queryLiliaState = (id) => (!id ? STATE_LIBRARY : STATE_LIBRARY[id]);

export default (stateName) => ({
  props: {
    stateID: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    stateNo += 1;

    return {
      STATE_CONF: {
        id: !this.stateID ? `${Date.now()}_${stateNo}` : this.stateID,
      },
    };
  },
  // 组件第一次完成渲染时执行创建
  mounted() {
    this.initState();
  },
  unmounted() {
    delete STATE_LIBRARY[STATE_CONF.id];
  },
  computed: {
    liliaState() {
      const { STATE_CONF } = this;

      return !STATE_CONF ? null : STATE_LIBRARY[STATE_CONF.id];
    },
  },
  methods: {
    isSelf(id) {
      const { STATE_CONF } = this;

      return STATE_CONF.id === id;
    },
    getOtherState(id) {
      return STATE_LIBRARY[id];
    },
    // 创建状态机
    initState() {
      const { STATE_CONF } = this;

      return decideType([
        () => ({
          IS_OBJ: STATE_CONF,
        }),
      ],{
        clear() {
          const { id } = STATE_CONF;

          STATE_LIBRARY[id] = STATE_LIBRARY[id] || state[stateName](id);

          return STATE_LIBRARY[id];
        },
      });
    },
    // 获得状态机
    queryState() {
      const { STATE_CONF } = this;

      return decideType([
        () => ({
          IS_OBJ: STATE_CONF,
        }),
      ],{
        clear() {
          const { id, name } = STATE_CONF;

          this.initState();

          return STATE_LIBRARY[id];
        },
      });
    },
  },
});
