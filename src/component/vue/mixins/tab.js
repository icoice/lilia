export default {
  props: {
    value: {
      type: [Object, Number, String],
      default: null,
    },
  },
  data() {
    const { value } = this;

    return {
      selected: !value ? value : this.format(value),
    };
  },
  watch: {
    value(value) {
      this.selected = this.format(value);
    },
  },
  mounted() {
    const { state } = this;

    state.setFlowAction('change', (status, item) => {
      this.selected = item;

      this.eventHappen(status, item);
    });
  },
  methods: {
    format(value) {
      if (this.$IS_STR(value) || this.$IS_NUM(value)) {
        return {
          key: value,
        };
      }

      return value;
    },
    change(item) {
      this.state.wheelFlowAction('change', item);
    },
    eventHappen(evtName, val) {
      this.$emit(evtName, val);
    },
  },
};
