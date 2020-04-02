export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(is) {
      const { state } = this;

      state.wheelFlowAction('open', is);
    },
  },
  data() {
    return {
      isOpened: this.show,
    };
  },
  mounted() {
    const { state } = this;

    state.setFlowAction('open', (status, is) => {
      this.isOpened = is;
      this.eventHappen(status, is);
    });

    state.setFlowAction('sure', (status, is) => {
      this.eventHappen(status, is);
    });

    state.setFlowAction('cancel', (status, is) => {
      this.isOpened = false;
      this.eventHappen(status, is);
    });

    state.wheelFlowAction('open', this.isOpened);
  },
  methods: {
    sure() {
      const { state } = this;

      state.wheelFlowAction('sure');
    },
    cancel() {
      const { state } = this;

      state.wheelFlowAction('cancel');
    },
    eventHappen(evtName, val) {
      this.$emit(evtName, val);
    },
  },
};
