import { JUDGE, eq } from '../../../common';

export default {
  props: {
    componentStatus: {
      type: String,
      default: 'close',
    },
  },
  watch: {
    componentStatus(name) {
      const { state } = this;

      state.wheelFlowAction(name);
    },
  },
  data() {
    return {
      isMoveComponent: false,
      status: '',
    };
  },
  mounted() {
    const { state, isDisabled } = this;

    state.setFlowAction('open', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;

      this.eventHappen(this.status, e);
    });

    state.setFlowAction('close', (status, e) => {
      if (eq(this.status, 'disabled')) return status;

      this.status = status;

      this.eventHappen(this.status, e);
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
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
