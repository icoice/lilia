export default {
  data() {
    return {
      point: null,
      status: '',
    };
  },
  mounted() {
    const { state } = this;

    // 按下动作流程
    state.setFlowAction('press', (status, e) => {
      if (this.$eq(status, 'pressStart')) {
        this.point = this.getPoint(e);
      }

      this.noDisabled(() => {
        if (!this.$eq(this.status, 'cancel')) {
          this.eventHappen(status, e);
        }

        this.status = status;
      });
    });

    // 动作取消流程
    state.setFlowAction('pressCancel', (status, e) => {
      this.noDisabled(() => {
        this.status = status;

        this.eventHappen(this.status, e);
      });
    });

    state.setFlowAction('pressUseabled', (status, e) => {
      this.noDisabled(() => {
        this.status = status;

        this.eventHappen(this.status, e);
      });
    });

    state.setFlowAction('pressDisabled', (status, e) => {
      this.noDisabled(() => {
        this.status = status;

        this.eventHappen(this.status, e);
      });
    });
  },
  methods: {
    onTapMove(e) {
      const { state } = this;

      if (!this.isCanTap(this.getPoint(e))) {
        state.wheelFlowAction('pressCancel', e);
      }
    },
    onTapStart(e) {
      const { state } = this;

      state.wheelFlowAction('press', e);
    },
    onTapEnd(e) {
      const { state } = this;

      state.wheelFlowAction('press', e);
    },
    // 确认是否完成点击动作
    isCanTap({ x, y }) {
      const { point } = this;

      if (!point) return true;

      const disX = point.x - x;
      const disY = point.y - y;
      const bs = 15;
      const be = -15;

      if (disX > bs || disX < be) return false;
      if (disY > bs || disY < be) return false;

      return true;
    },
    // 获得点击或触击的点
    getPoint(e = { pageX: 1, pageY: 1 }) {
      const point = e.touches || e.changedTouches || e;
      let touchPoint = { x: 1, y: 1 };

      this.$IN(point, {
        IS_OBJ() {
          // chrome浏览器把changedTouches变为JSON数组，因此此处判断是否存在length属性
          touchPoint = point.length !== undefined ? {
            x: !point[0] ? 1 : point[0].pageX,
            y: !point[0] ? 1 : point[0].pageY,
          } : {
            x: point.pageX,
            y: point.pageY,
          };
        },
        IS_ARR() {
          console.log(point[0]);
          touchPoint = {
            x: point[0].pageX,
            y: point[0].pageY,
          };
        },
      });

      return touchPoint;
    },
    eventHappen(evtName, e = { x: 0, y: 0 }) {
      this.$emit(evtName, e);
    },
  },
};
