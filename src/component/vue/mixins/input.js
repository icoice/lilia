export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    filter: {
      type: RegExp,
      default: null,
    },
  },
  data() {
    return {
      val: this.valueFilter(this.value),
      status: '',
      inputRecords: [],
    };
  },
  watch: {
    value(value) {
      this.val = this.valueFilter(value);
    },
  },
  mounted() {
    const { state } = this;

    state.setFlowAction('input', (status, e) => {
      this.noDisabled(() => {
        this.status = status;
        this.val = this.valueFilter(e.target.value);
  
        this.eventHappen([status, 'change'], this.val);
      });
    });

    state.setFlowAction('change', (status, e) => {
      this.noDisabled(() => {
        this.status = status;
        this.val = this.valueFilter(e.target.value);
  
        this.eventHappen([status], this.val);
      });
    });

    state.setFlowAction('keyup', (status, e) => {
      this.noDisabled(() => {
        this.status = status;
        this.val = this.valueFilter(e.target.value);
  
        this.eventHappen([status, 'change'], this.val);
      });
    });

    state.setFlowAction('keydown', (status, e) => {
      this.noDisabled(() => {
        this.status = status;
        this.val = this.valueFilter(e.target.value);
  
        this.eventHappen([status, 'change'], this.val);
      });
    });

    state.setFlowAction('focus', (status, e) => {
      this.noDisabled(() => {
        this.status = status;

        this.focus();
        this.eventHappen([status], this.val);
      });
    });

    state.setFlowAction('blur', (status, e) => {
      this.noDisabled(() => {
        this.status = status;

        this.inputRecords.push(this.val);
        this.blur();
        this.eventHappen([status], this.val);
      });
    });

    state.setFlowAction('clear', (status, e) => {
      this.noDisabled(() => {
        this.status = status;
        this.val = '';

        this.eventHappen([status, 'change'], this.val);
        this.focus();
      });
    });
  },
  methods: {
    valueFilter(value) {
      const { filter } = this;

      if (filter) {
        return String(value).replace(filter, '');
      }

      return value;
    },
    focus() {
      const { input } = this.$refs;

      input.focus();
    },
    blur() {
      const { input } = this.$refs;

      input.blur();
    },
    eventAction(eventName, e) {
      const { state } = this;

      state.wheelFlowAction(eventName, e);
    },
    eventHappen(evtNames = [], e = {}) {
      evtNames.map(evtName => this.$emit(evtName, e));
    },
  },
};
