export default {
  props: {
    // 需载入的图像
    file: {
      type: [Object, File, String],
      default: null,
    },
    // 压缩比例
    express: {
      type: Number,
      default: 1,
    },
    // 设置超时
    timeout: {
      type: Number,
      default: 120 * 1000,
    },
  },
  data() {
    return {
      file64: null, // 已编码为base64的图像文件
      originFile: this.file, // 源文件
      isSupportWebp: false, // 是否支持webp
      isLoadImageFail: false, // 是否载入图片失败
      timeConsuming: 0, // 载入耗时 
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
    // 如果文件是字符串且无需压缩则读取源文件
    isReadOrigin() {
      const { $IS_STR, originFile, express } = this;

      return $IS_STR(originFile) && express === 1;
    },
  },
  created() {
    this.$memory('lazyCounter', 0);
    // 校验浏览器是否支持webp
    this.$webpSupport('lossy').then((is) => {
      this.isSupportWebp = is;
    });
  },
  activated() {
    const { state } = this;

    state.wheelFlowAction('load');
  },
  mounted() {
    const { state } = this;

    // 多图像同页面延迟加载处理，减轻浏览器渲染负担
    let lazyCounter =  this.$memory('lazyCounter');

    if (lazyCounter > 10) {
      this.$memory('lazyCounter', 0);
      lazyCounter = 0;
    } else {
      lazyCounter = lazyCounter + 1;
    }

    // 预定义压缩以及编译成base64码（这里才是消耗大的地方）
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
        const { express, isReadOrigin, originFile } = this;

        if (isReadOrigin) {
          return this.eventHappen(status, originFile);
        }

        return $imageCompress(originFile, express).then((file64) => {
          this.file64 = file64;
          this.status = status;

          this.eventHappen(status, { file64 });
        });
      });
    },
    eventHappen(evtName, e = {}) {
      this.$emit(evtName, e);
    },
  },
};
