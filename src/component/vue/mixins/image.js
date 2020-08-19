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
  computed: {
    isReadOrigin() {
      return this.$IS_STR(this.originFile);
    },
  },
  created() {
    this.$memory('lazyCounter', 0);
    this.$webpSupport('lossy').then((is) => {
      this.isSupportWebp = is;
    });
  },
  activated() {
    state.wheelFlowAction('load');
  },
  mounted() {
    const { state } = this;
    let lazyCounter =  this.$memory('lazyCounter');

    if (lazyCounter > 10) {
      this.$memory('lazyCounter', 0);
      lazyCounter = 0;
    } else {
      lazyCounter = lazyCounter + 1;
    }

    state.setFlowAction('load', (status) => {
      if (!this.file64) {
        setTimeout(
          () => this.compress(status),
          lazyCounter * 200);
      }
    });
  },
  methods: {
    compress(status) {
      const { $imageCompress } = this;

      this.$webpSupport('lossy').then((is) => {
        const { express, isReadOrigin, originFile, webp } = this;
        const file = is && webp ? webp : originFile;

        if (isReadOrigin) {
          return this.eventHappen(status, file);
        }

        return $imageCompress(file, express).then((file64) => {
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
