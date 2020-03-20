import { JUDGE, webpSupport, eq, imageCompress } from '../../../common';

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
      file64: null,
      isSupportWebp: false,
      originFile: this.file,
      status: '',
    };
  },
  watch: {
    file(file) {
      const { state } = this;

      this.originFile = file;
      this.file64 = null;

      state.wheelFlowAction('load');
    },
  },
  created() {
    webpSupport('lossy').then((is) => {
      this.isSupportWebp = is;
    });
  },
  computed: {
    isReadOrigin() {
      const { express, originFile } = this;

      return eq(express, 1) && !JUDGE.BELONG(originFile, File);
    },
  },
  mounted() {
    const { state } = this;

    lazyCounter = lazyCounter > 10 ? 0 : lazyCounter + 1;

    state.setFlowAction('load', (status) => {
      setTimeout(() => this.compress(status), lazyCounter * 200);
    });
  },
  methods: {
    compress(status) {
      webpSupport('lossy').then((is) => {
        const { express, isReadOrigin, name, originFile, webp } = this;
        const file = is && webp ? webp : originFile;

        if (isReadOrigin) {
          return this.eventHappen(status, file);
        }

        return imageCompress(file, express).then((file64) => {
          this.file64 = file64;
          this.status = status;

          this.eventHappen(status, {
            file64,
          });
        });
      });
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
