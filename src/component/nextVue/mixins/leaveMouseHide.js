export default {
  props: {
    autoHide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const { autoHide } = this;

    return {
      isAutoHide: autoHide,
      isLeave: true,
      isSetHide: false,
    };
  },
  watch: {
    autoHide(is) {
      this.isAutoHide = is;
    },
  },
  methods: {
    // 是否移离当前组件
    isLeaveThis(is) {
      this.isLeave = is;
    },
    // 绑定移离事件
    setHideListener() {
      const { isSetHide, isAutoHide } = this;

      if (!isSetHide && isAutoHide) {
        window.addEventListener('click', () => {
          const { isLeave } = this;

          if (!isLeave && this.leaveHere) {
            this.leaveHere({ ...this.$data });
          }
        }, true);
      }

      this.isSetHide = true;
    },
  },
};
