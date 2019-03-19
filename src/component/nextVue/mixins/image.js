import _ from '../../../_';
import state from '../state';

const { JUDGE } = _.decideType;

export default {
  props: {
    file: {
      type: [File, String],
      default: null,
    },
    express: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      originFile: this.file,
      file64: null,
      status: '',
    };
  },
  watch: {
    file(file) {
      this.originFile = file;
      this.file64 = null;
      this.liliaState.wheelFlowAction('load');
    },
  },
  mounted() {
    const { liliaState } = this;
    // 压缩图片文件
    liliaState.setFlowAction('load', (status) => {
      const { express, originFile } = this;

      this.zoom64(originFile, express).then((file64) => {
        this.file64 = file64;
        this.status = status;
        this.eventHappen(this.status, this.file64);
      });
    });
  },
  methods: {
    ..._,
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
