export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      dfault: '-',
    },
  },
  watch: {
    show() {
      this.change();
    },
  },
  data() {
    return {
      status: '',
    };
  },
  mounted() {
    const { state } = this;

    state.setFlowAction('open', (status, e) => {
      this.status = status;

      this.$emit('change', this.status);
    });

    state.setFlowAction('close', (status, e) => {
      this.status = status;

      this.$emit('change', this.status);
    });

    this.change();
  },
  methods: {
    change() {
      if (this.show) {
        this.open();
      } else {
        this.close();
      }
    },
    open() {
      const { state } = this;

      state.runFlow('open');
    },
    close() {
      const { state } = this;

      state.runFlow('close');
    },
  },
};
