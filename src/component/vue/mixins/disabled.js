import state from '../state';
import { eq, JUDGE } from '../../../common';

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

      this.eventHappen(this.status, e);
    });

    state.setFlowAction('disabled', (status, e) => {
      this.status = status;

      this.eventHappen(this.status, e);
    });

    state.wheelFlowAction(isDisabled ? 'disabled' : 'useable');
  },
  methods: {
    noDisabled(cb) {
      const { status } = this;

      if (!eq(status, 'disabled')) {
        JUDGE.DO_FUN(cb);
      }
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
