import _ from '../../../_';
import state from '../state';

export default {
  props: {
    isEnd: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    status: '',
  }),
  mounted() {
    const { liliaState } = this;

    liliaState.setFlowAction('loadStart', (status, e) => {
      this.status = status;
      this.eventHappen(this.status, e);
    });

    liliaState.setFlowAction('loadEnd', (status, e) => {
      this.status = status;
      this.eventHappen(this.status, e);
    });

    this.changeStatus(this.isEnd);
  },
  watch: {
    isEnd(is) {
      this.changeStatus(is);
    },
  },
  methods: {
    ..._,
    changeStatus(is) {
      this.liliaState.wheelFlowAction(is ? 'loadEnd' : 'loadStart');
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
