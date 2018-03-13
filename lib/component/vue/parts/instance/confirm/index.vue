<template>
  <div class="vp-confirm animated slideInUp" v-if="display" :style="size">
    <div class="vp-confirm-view" ref="vpConfirmView">
      <slot name="confirm-content"/>
      <div class="vp-confirm-operate">
        <vp-button  @tap="operate('sure')">
          <span slot="button-name">确定</span>
        </vp-button>
        <vp-button  @tap="operate('cancel')">
          <span slot="button-name">取消</span>
        </vp-button>
      </div>
    </div>
  </div>
</template>

<script>
  import vpButton from '../../common/button';

  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        display: this.show,
        isBindResize: false,
        isResize: false,
        autoSize: false,
        size: {
          visibility: 'hidden',
        },
      };
    },
    components: {
      vpButton,
    },
    watch: {
      show(status) {
        this.display = status;
        this.resize();
      },
    },
    mounted() {
      if (!this.isBindResize) {
        window.addEventListener('resize', () => this.resize(), false);
        this.isBindResize = true;
      }
      this.resize();
    },
    methods: {
      resize() {
        const { $refs, size, autoSize } = this;
        setTimeout(() => {
          const { vpConfirmView } = $refs;
          if (!vpConfirmView) return;
          const { offsetWidth, offsetHeight } = vpConfirmView;
          this.size = Object.assign({}, size, {
            visibility: 'visible',
            width: `${!autoSize ? 'auto' : offsetWidth}px`,
            height: `${!autoSize ? 'auto' : offsetHeight}px`,
            marginLeft: `${-(offsetWidth / 2)}px`,
            marginTop: `${-(offsetHeight / 2)}px`,
          });
        }, 150);
      },
      operate(type) {
        this.$emit(type);
        this.$emit('close');
        this.display = false;
        this.size.visibility = 'hidden';
      },
    },
  };
</script>
