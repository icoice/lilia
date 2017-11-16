<template>
  <div :class="['vp-button', disabledHappen]">
      <div :class="['vp-button-touch', hasTapped]"
        @touchstart.stop="onTouchStart"
        @touchmove.stop= "onTouchMove"
        @touchend.stop="onTouchEnd">
        <slot name="button-name"/>
      </div>
  </div>
</template>

<script>
  /* import css */;

  export default {
    props: {
      name: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        btnName: this.name,
        btnDisabled: this.disabled,
        isCanTap: true,
        isTouched: false,
        timeOutId: null,
        tapStartX: 0,
        tapStartY: 0,
      };
    },
    watch: {
      name(btnName) {
        this.btnName = btnName;
      },
      disabled(btnDisabled) {
        this.btnDisabled = btnDisabled;
      },
    },
    computed: {
      disabledHappen() {
        return this.btnDisabled ? 'vp-button-disabled' : 'vp-button-normal';
      },
      hasTapped() {
        return this.isTouched ? 'vp-button-has-tapped' : '';
      },
    },
    activated() {
      clearTimeout(this.timeOutId);
    },
    methods: {
      hasCanTap({x, y}) {
        const { tapStartX, tapStartY } = this;
        const spaceX = tapStartX - x;
        const spaceY = tapStartY - y;

        if  (!this.isCanTap) {
          clearTimeout(this.timeOutId);
          return false;
        }
        if  (spaceX  > 10 || spaceX < -10) return false;
        if  (spaceY > 10 || spaceY < -10) return false;
        return true;
      },
      initTap({x, y}) {
        clearTimeout(this.timeOutId);
        this.tapStartX = x;
        this.tapStartY = y;
        this.isCanTap = true;
        // this.timeOutId = setTimeout(() => this.isCanTap = false, 3000);
      },
      doTap(point, e) {
        if  (!this.hasCanTap(point) || this.btnDisabled) return;
        this.$emit('tap', {
          name: this.btnName,
          event: e,
        });
      },
      onTouchStart(e) {
        const fingers = e.touches;
        this.isTouched = true;
        // 限单指
        this.initTap({
          x: fingers[0].pageX,
          y: fingers[0].pageY,
        });
      },
      onTouchMove() {
        clearTimeout(this.timeOutId);
        this.isTouched = false;
      },
      onTouchEnd(e) {
        e.preventDefault();
        const fingers = e.changedTouches;
        if (this.isTouched) {
          this.isTouched = false;
          // 限单指
          this.doTap({
            x: fingers[0].pageX,
            y: fingers[0].pageY,
          }, e);
        } else {
          clearTimeout(this.timeOutId);
        }
      },
    },
  };
</script>
