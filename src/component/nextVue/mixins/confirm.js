import _ from '../../../_';
import state from '../state';

const { JUDGE } = _.decideType;

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(is) {
      this.liliaState.wheelFlowAction('open', is);
    },
  },
  data() {
    return {
      isOpened: this.show,
    };
  },
  mounted() {
    const { liliaState } = this;

    liliaState.setFlowAction('open', (status, is) => {
      this.isOpened = is;
      this.eventHappen(status, is);
    });

    liliaState.setFlowAction('sure', (status, is) => {
      this.isOpened = false;
      this.eventHappen(status, is);
    });

    liliaState.setFlowAction('cancel', (status, is) => {
      this.isOpened = false;
      this.eventHappen(status, is);
    });

    liliaState.wheelFlowAction('open', this.isOpened);
  },
  methods: {
    ..._,
    sure() {
      this.liliaState.wheelFlowAction('sure');
    },
    cancel() {
      this.liliaState.wheelFlowAction('cancel');
    },
    eventHappen(evtName, val) {
      this.$emit(evtName, val);
    },
  },
};
