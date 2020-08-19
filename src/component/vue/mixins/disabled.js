export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDisabled: this.disabled,
    };
  },
  watch: {
    disabled(is) {
      const { state } = this;

      this.isDisabled = is;

      state.wheelFlowAction(is ? 'disabled' : 'useable');
    },
  },
  mounted() {
    const { state, isDisabled } = this;

    state.setFlowAction('useable', (status, e) => {
      this.status = status;

      this.$emit(status, e);
    });

    state.setFlowAction('disabled', (status, e) => {
      this.status = status;

      this.$emit(status, e);
    });

    state.wheelFlowAction(isDisabled ? 'disabled' : 'useable');
  },
  methods: {
    noDisabled(cb) {
      const { status } = this;

      if (!this.$eq(status, 'disabled')) {
        this.$DO_FUN(cb);
      }
    },
  },
};
