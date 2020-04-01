export default {
  props: {
    isEnd: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    status: '',
    before: null,
  }),
  mounted() {
    const { state } = this;

    state.setFlowAction('loadStart', (status, e) => {
      this.status = status;

      this.eventHappen(this.status, e);
    });

    state.setFlowAction('loadEnd', (status, e) => {
      this.status = status;

      this.eventHappen(this.status, e);
    });

    this.changeStatus(this.isEnd);
  },
  watch: {
    isEnd(is) {
      this.changeStatus(is);
    },
  },
  methods: {
    changeStatus(is) {
      const { state, before, lazy } = this;

      clearTimeout(before);

      if (is) {
        return state.wheelFlowAction('loadEnd');
      }

      this.before = setTimeout(() => {
        state.wheelFlowAction('loadStart');
      }, lazy);

      return before;
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
