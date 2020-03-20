export default {
  props: {
    isEnd: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    status: '',
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
      const { state } = this;

      state.wheelFlowAction(is ? 'loadEnd' : 'loadStart');
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
