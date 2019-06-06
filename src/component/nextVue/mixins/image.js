import _ from '../../../_';

const { JUDGE } = _.decideType;
let lazyCounter = 0;

export default {
  props: {
    name: {
      type: String,
      default: String(Date.now()),
    },
    webp: {
      type: [File, String],
      default: null,
    },
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
      isSupportWebp: false,
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
  created() {
    this.checkWebp('lossy').then((is) => {
      this.isSupportWebp = is;
    });
  },
  computed: {
    isReadOrigin() {
      const { express, originFile } = this;

      return express === 1 && !(originFile instanceof File);
    },
  },
  mounted() {
    const { liliaState } = this;

    lazyCounter = lazyCounter > 10 ? 0 : lazyCounter + 1;

    // 压缩图片文件
    liliaState.setFlowAction('load', (status) => {
      setTimeout(() => {
        this.checkWebp('lossy').then((isSupportWebp) => {
          const {
            name,
            express,
            originFile,
            webp,
            isReadOrigin,
            status,
          } = this;
          const file = isSupportWebp ? webp : originFile;

          if (!isReadOrigin) {
            this.zoom64(file, express).then((file64) => {
              this.file64 = file64;
              this.status = status;

              this.eventHappen(status, {
                file64,
                file: this.base64ToFile(file64, name),
              });
            });
          } else {
            this.eventHappen(status, file);
          }
        });
      }, lazyCounter * 500);
    });
  },
  methods: {
    ..._,
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
