import _ from '../../../_';
import state from '../state';

const { JUDGE } = _.decideType;

export default {
  data() {
    return {
      status: '',
      here: false,
    };
  },
  mounted() {
    const { liliaState, STATE_CONF } = this;

    window.addEventListener('mouseup', e => this.outsideScopeClose(e));
    window.addEventListener('touchend', e => this.outsideScopeClose(e));

    liliaState.setFlowAction('clear', (status, e) => {
      this.noDisabled(() => {
        this.status = status;
        this.selected = null;
        this.here = false;
        return this.eventHappen(this.status, e);
      });
    });

    liliaState.setFlowAction('change', (status, key) => {
      this.noDisabled(() => {
        this.status = status;
        return this.eventHappen(this.status, this.getSelectItem(key));
      });
    });

    liliaState.setFlowAction('drop', (status, e) => {
      this.noDisabled(() => {
        this.status = status;
        return this.eventHappen(this.status, e);
      });
    });
  },
  methods: {
    ..._,
    checkHere() {
      this.here = true;
    },
    outsideScopeClose() {
      if (!this.here && ['open', 'change'].indexOf(this.status) >= 0) {
        this.liliaState.wheelFlowAction('drop');
      } else {
        this.here = false;
      }
    },
    getSelectItem(item) {
      const list = this.pulldonwList || this.checkList(this.list || []);
      let key = JUDGE.IS_OBJ(item) ? item.key : item;
      let selected = null;

      list.map((item) => {
        if (item.key === key) {
          selected = item;
        }

        return item;
      });

      return selected;
    },
    checkItem(item) {
      if (JUDGE.IS_STR(item)) {
        return {
          key: item,
          value: item,
        };
      } else if (JUDGE.IS_OBJ(item) && JUDGE.NO_NUL(item) && JUDGE.IS_UND(item.key)) {
        item.key = item.value;
        return item;
      }

      return item;
    },
    checkList(list) {
      return list.map((item) => {
        return this.checkItem(item);
      });
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
