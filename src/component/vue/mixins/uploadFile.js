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
    const { state } = this;

    state.setFlowAction('change', (status, files) => {
      console.log(files);
      this.inputFiles = files;
      this.eventHappen(status, this.inputFiles);
    });

    state.setFlowAction('verifyFail', (status, errorFile) => {
      this.eventHappen(status, errorFile);
    });
  },
  methods: {
    MB: size => (size / 1024 / 1024).toFixed(2),
    getFiles({ target }) {
      const { state } = this;
      const files = [];

      for (let i = 0; i < target.files.length; i += 1) {
        const file = target.files[i];

        files.push(file);

        if (!this.limitFile(file.name)) {
          state.wheelFlowAction('verifyFail', file);
        }
      }

      state.wheelFlowAction('change', files);
    },
    limitFile(fileName) {
      const { limit } = this;
      let rules;

      if (!limit) return true;

      rules = new RegExp(`^.*?\\.(${limit.replace(/,/g, '|')})`);

      return rules.test(fileName.toLowerCase());
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
