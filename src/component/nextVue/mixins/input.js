import _ from '../../../_';
import state from '../state';

const { JUDGE } = _.decideType;

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
      val: this.doFilter(this.value),
      status: '',
      inputRecords: [],
    };
  },
  watch: {
    value(value) {
      this.val = this.doFilter(value);
    },
  },
  mounted() {
    const { liliaState } = this;

    liliaState.setFlowAction('input', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;
      this.val = this.doFilter(e.target.value);

      this.eventHappen(this.status, this.val);
    });

    liliaState.setFlowAction('change', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;
      this.val = this.doFilter(e.target.value);

      this.eventHappen(this.status, this.val);
    });

    liliaState.setFlowAction('keyup', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;
      this.val = this.doFilter(e.target.value);

      this.eventHappen(this.status, this.val);
    });

    liliaState.setFlowAction('keydown', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;
      this.val = this.doFilter(e.target.value);

      this.eventHappen(this.status, e.target.value);
    });

    liliaState.setFlowAction('focus', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;
      this.toFocus();

      this.eventHappen(this.status, this.val);
    });

    liliaState.setFlowAction('blur', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;

      this.inputRecords.push(this.val);
      this.toBlur();
      this.eventHappen(this.status, this.val);
    });

    liliaState.setFlowAction('clear', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;
      this.val = '';

      this.eventHappen(this.status, this.val);
      this.toFocus();
    });

    liliaState.setFlowAction('usable', (status, e) => {
      this.status = status;
      this.eventHappen(this.status, e);
    });

    liliaState.setFlowAction('disabled', (status, e) => {
      this.status = status;
      this.eventHappen(this.status, e);
    });

    liliaState.wheelFlowAction(this.isDisabled ? 'disabled' : 'useabled');
  },
  methods: {
    ..._,
    eventAction(eventName, e) {
      this.liliaState.wheelFlowAction(eventName, e);
    },
    doFilter(value) {
      const { filter } = this;

      if (filter) {
        return String(value).replace(filter, '');
      }

      return value;
    },
    toFocus() {
      if (this.$refs) {
        const { input } = this.$refs;

        input.focus();
      }
    },
    toBlur() {
      if (this.$refs) {
        const { input } = this.$refs;

        input.blur();
      }
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
