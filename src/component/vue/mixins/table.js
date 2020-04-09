import { replaceHump } from '../../../common';

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    list() {
      const { state } = this;

      state.wheelFlowAction('narrowScreen');
    },
    fields() {
      const { state } = this;

      state.wheelFlowAction('narrowScreen');
    },
  },
  data() {
    return {
      offset: { top: 0 },
      isBindResize: false,
      status: '',
    };
  },
  mounted() {
    const { state } = this;

    state.setFlowAction('narrowScreen', (status) => {
      this.statusChange(replaceHump(status, '-'));
      this.eventHappen(status);
    });

    this.autoNarrowScreen();
    this.setScroll();
  },
  activated() {
    const { state } = this;

    state.wheelFlowAction('narrowScreen');
  },
  updated() {
    const { state } = this;

    state.wheelFlowAction('narrowScreen');
  },
  methods: {
    setScroll() {
      const me = this;
      const { table } = this.$refs;
      const { parentNode } = table;

      parentNode.addEventListener('scroll', function scroll() {
        const { scrollTop } = this;
        const { offsetTop } = table;
        const top = `${scrollTop - offsetTop}px`;

        me.offset = {
          ...me.offset,

          top: scrollTop > offsetTop ? top : 0,
        };
      });

      window.addEventListener('scroll', function scroll() {
        const { scrollY } = this;
        const { offsetTop } = table;
        const top = `${scrollY - offsetTop}px`;

        me.offset = {
          ...me.offset,

          top: scrollY > offsetTop ? top : 0,
        };
      });
    },
    autoNarrowScreen() {
      if (this.isBindResize) {
        return this.isBindResize;
      }

      window.addEventListener('resize', () => {
        const { state } = this;

        state.wheelFlowAction('narrowScreen');
      }, false);

      this.isBindResize = true;
    },
    statusChange(status = '') {
      const { table, container } = this.$refs;
      const { parentNode } = table;

      // 自身节点出现滚动条
      if (container.scrollWidth > container.clientWidth) {
        this.status = status;
      }

      // 父节点出现滚动条
      if (!parentNode) {
        return status;
      }

      if (parentNode.scrollWidth > parentNode.clientWidth) {
        this.status = status;
      }

      return status;
    },
    eventHappen(evtName) {
      this.$emit(evtName);
    },
  },
}
