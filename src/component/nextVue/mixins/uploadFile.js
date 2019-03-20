import _ from '../../../_';
import state from '../state';

const { JUDGE } = _.decideType;

export default {
  props: {
    files: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: String,
      default: '',
    },
    express: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      status: '',
      inputFiles: this.files,
    };
  },
  watch: {
    files(files) {
      this.inputFiles = files;
    },
  },
  mounted() {
    const { liliaState } = this;

    // 压缩图片文件
    liliaState.setFlowAction('change', (status, files) => {
      this.inputFiles = files;
      this.eventHappen(status, this.inputFiles);
    });

    // 验证失败
    liliaState.setFlowAction('verifyFail', (status, errorFile) => {
      this.eventHappen(status, errorFile);
    });
  },
  methods: {
    ..._,
    MB: size => (size / 1024 / 1024).toFixed(2),
    getFiles({ target }) {
      const { liliaState } = this;
      const files = [];

      for (let i = 0; i < target.files.length; i += 1) {
        const file = target.files[i];

        files.push(file);

        if (!this.verifyFileExtend(file.name)) {
          liliaState.wheelFlowAction('verifyFail', file);
        }
      }

      liliaState.wheelFlowAction('change', files);
    },
    verifyFileExtend(fileName) {
      const { limit } = this;

      if (!limit) return true;

      const rules = new RegExp(`^.*?\\.(${limit.replace(/,/g, '|')})`);

      return rules.test(fileName.toLowerCase());
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
