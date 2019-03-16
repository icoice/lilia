import _ from '../../../_';
import state from '../state';

const { JUDGE } = _.decideType;

export default {
  data() {
    return {
      isDisabled: this.disabled,
    };
  },
  watch: {
    disabled(is) {
      const { liliaState } = this;

      this.isDisabled = is;

      liliaState.wheelFlowAction(this.isDisabled ? 'disabled' : 'useabled');
    },
  },
  mounted() {
    const { liliaState } = this;

    liliaState.setFlowAction('useabled', (status, e) => {
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
    noDisabled(cb) {
      if (this.status !== 'disabled') {
        if (JUDGE.IS_FUN(cb)) cb();
      }
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
