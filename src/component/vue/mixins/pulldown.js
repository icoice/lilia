export default {
  data() {
    return {
      status: '',
      here: false,
    };
  },
  mounted() {
    const { state, STATE_CONF } = this;

    window.addEventListener('mouseup', e => this.outsideScopeClose(e));
    window.addEventListener('touchend', e => this.outsideScopeClose(e));

    state.setFlowAction('clear', (status, e) => {
      this.noDisabled(() => {
        const { isMultiple } = this;

        this.status = status;
        this.selected = isMultiple ? [] : null;
        this.here = false;

        return this.eventHappen(this.status, e);
      });
    });

    state.setFlowAction('change', (status, key) => {
      this.noDisabled(() => {
        this.status = status;

        return this.eventHappen(this.status, this.getSelectItem(key));
      });
    });

    state.setFlowAction('drop', (status, e) => {
      this.noDisabled(() => {
        this.status = status;

        return this.eventHappen(this.status, e);
      });
    });
  },
  methods: {
    checkHere() {
      this.here = true;
    },
    outsideScopeClose() {
      const { status, here } = this;

      if (!here && this.$IS_CON(status, ['open', 'change'])) {
        this.state.wheelFlowAction('drop');
      } else {
        this.here = false;
      }
    },
    getSelectItem(item) {
      const list = this.pulldonwList || this.checkList(this.list || []);
      let key = this.$IS_OBJ(item) ? item.key : item;
      let selected = null;

      list.map((item) => {
        if (this.$eq(item.key, key)) {
          selected = item;
        }

        return item;
      });

      return selected;
    },
    checkItem(item) {
      if (this.$IS_STR(item)) {
        return {
          key: item,
          value: item,
        };
      }

      if (this.$IS_OBJ(item) &&
          this.$NO_NUL(item) &&
          this.$IS_UND(item.key)) {
        item.key = item.value;

        return item;
      }

      return item;
    },
    checkList(list) {
      return list.map(item => this.checkItem(item));
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
