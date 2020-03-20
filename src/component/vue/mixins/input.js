import { JUDGE, eq } from '../../../common';

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
      val: this.filter(this.value),
      status: '',
      inputRecords: [],
    };
  },
  watch: {
    value(value) {
      this.val = this.filter(value);
    },
  },
  mounted() {
    const { state, isDisabled } = this;

    state.setFlowAction('input', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;
      this.val = this.filter(e.target.value);

      this.eventHappen(this.status, this.val);
    });

    state.setFlowAction('change', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;
      this.val = this.filter(e.target.value);

      this.eventHappen(this.status, this.val);
    });

    state.setFlowAction('keyup', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;
      this.val = this.filter(e.target.value);

      this.eventHappen(this.status, this.val);
    });

    state.setFlowAction('keydown', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;
      this.val = this.filter(e.target.value);

      this.eventHappen(this.status, e.target.value);
    });

    state.setFlowAction('focus', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;

      this.focus();
      this.eventHappen(this.status, this.val);
    });

    state.setFlowAction('blur', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;

      this.inputRecords.push(this.val);
      this.blur();
      this.eventHappen(this.status, this.val);
    });

    state.setFlowAction('clear', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;
      this.val = '';

      this.eventHappen(this.status, this.val);
      this.focus();
    });

    state.setFlowAction('usable', (status, e) => {
      this.status = status;
      this.eventHappen(this.status, e);
    });

    state.setFlowAction('disabled', (status, e) => {
      this.status = status;
      this.eventHappen(this.status, e);
    });

    state.wheelFlowAction(isDisabled ? 'disabled' : 'useabled');
  },
  methods: {
    eventAction(eventName, e) {
      const { state } = this;

      state.wheelFlowAction(eventName, e);
    },
    filter(value) {
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
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
