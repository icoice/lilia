export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    timeout: {
      type: Number,
      default: 5000,
    },
  },
  data() {
    return {
      status: '',
      timeoutID: null,
    };
  },
  mounted() {
    const { state } = this;

    state.setFlowAction('open', (status, e) => {
      this.status = status;

      this.$emit('onoff', this.status);
    });

    state.setFlowAction('close', (status, e) => {
      this.status = status;

      this.$emit('onoff', this.status);
    });

    state.runFlow('open');
    this.runSandClock();
  },
  activated() {
    this.runSandClock();
  },
  methods: {
    runSandClock() {
      const { state, timeoutID, timeout } = this;

      clearTimeout(this.timeoutID);

      this.timeoutID = setTimeout(() => {
        state.runFlow('close');
      }, timeout);
    },
  },
};
