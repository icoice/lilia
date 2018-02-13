<template>
  <div class="vm">
    <div :class="['btn', disabledHappen]">
      <div :class="['btn-touch', hasTapped]"
        @touchstart.stop="onTouchStart"
        @touchmove.stop= "onTouchMove"
        @touchend.stop="onTouchEnd" v-if="hasMobile">
        <slot name="btn"/>
      </div>
      <div :class="['btn-touch', hasTapped]"
        @mousedown.stop="onMouseStart"
        @mousemove.stop= "onMouseMove"
        @mouseup.stop="onMouseEnd" v-else>
        <slot name="btn"/>
      </div>
    </div>
  </div>
</template>

<script>
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
        return this.btnDisabled ? 'btn-disabled' : 'btn-normal';
      },
      hasTapped() {
        return this.isTouched ? 'btn-has-tapped' : '';
      },
      hasMobile() {
        return /ios|ipod|ipad|iphone|android/i.test(navigator.userAgent);
      },
    },
    methods: {
      hasCanTap({x, y}) {
        const { tapStartX, tapStartY } = this;
        const spaceX = tapStartX - x;
        const spaceY = tapStartY - y;

        if  (!this.isCanTap) return false;
        if  (spaceX  > 10 || spaceX < -10) return false;
        if  (spaceY > 10 || spaceY < -10) return false;
        return true;
      },
      initTap({x, y}) {
        this.tapStartX = x;
        this.tapStartY = y;
        this.isCanTap = true;
      },
      doTap(point, e) {
        if  (!this.hasCanTap(point) || this.btnDisabled) return;
        this.$emit('tap', {
          name: this.btnName,
          event: e,
        });
      },
      onMouseStart(e) {
        this.isTouched = true;
        this.initTap({
          x: e.pageX,
          y: e.pageY,
        });
      },
      onMouseMove() {
        this.isTouched = false;
      },
      onMouseEnd(e) {
        e.preventDefault();
        if (this.isTouched) {
          this.isTouched = false;
          // 限单指
          this.doTap({
            x: e.pageX,
            y: e.pageY,
          }, e);
        }
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
        this.isTouched = false;
      },
      onTouchEnd(e) {
        const fingers = e.changedTouches;
        if (this.isTouched) {
          this.isTouched = false;
          // 限单指
          this.doTap({
            x: fingers[0].pageX,
            y: fingers[0].pageY,
          }, e);
        }
      },
    },
  };
</script>
