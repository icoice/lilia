import _ from '../../../_';
import state from '../state';

const { JUDGE } = _.decideType;

export default {
  props: {
    name: {
      type: String,
      default: 'POP NAME',
    },
    componentStatus: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    componentStatus(name) {
      this.liliaState.wheelFlowAction(name);
    },
  },
  data() {
    return {
      status: '',
      isMoveComponent: false,
    };
  },
  mounted() {
    const { liliaState } = this;

    liliaState.setFlowAction('open', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;
      this.eventHappen(this.status, e);
    });

    liliaState.setFlowAction('close', (status, e) => {
      if (this.status === 'disabled') return status;

      this.status = status;
      this.eventHappen(this.status, e);
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
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
