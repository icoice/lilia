import _ from '../../../_';
import state from '../state';

const { JUDGE } = _.decideType;

export default {
  props: {
    value: {
      type: [Object, Number, String],
      default: 0,
    },
  },
  data() {
    return {
      selected: this.format(this.value),
    };
  },
  watch: {
    value(value) {
      this.selected = this.format(value);
    },
  },
  mounted() {
    const { liliaState } = this;

    liliaState.setFlowAction('change', (status, item) => {
      this.selected = item;
      this.eventHappen(status, item);
    });
  },
  methods: {
    ..._,
    format(value) {
      if (JUDGE.IS_STR(value) || JUDGE.IS_NUM(value)) {
        return {
          key: value,
        };
      }

      return value;
    },
    change(item) {
      this.liliaState.wheelFlowAction('change', item);
    },
    eventHappen(evtName, val) {
      this.$emit(evtName, val);
    },
  },
};
