<template>
  <div :class="['vp-button', disabledHappen]">
      <div :class="['vp-button-touch', mouseOverShow, hasTapped]"
        @touchstart="onTouchStart"
        @touchmove = "onTouchMove"
        @touchend="onTouchEnd"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove="onMouseOver"
        @mouseleave="onMouseLeave">
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
        // 假设在移动端触发行为时，移动端禁用mouse的所有事件触发。（mouseover确实有可能被触发）
        banMouseEvt: false,
        isCanTap: true,
        isMouseOver: false,
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
      mouseOverShow() {
        return this.isMouseOver ? 'vp-button-hover' : '';
      },
      hasTapped() {
        return this.isTouched ? 'vp-button-has-tapped' : '';
      },
    },
    methods: {
      hasCanTap({x, y}) {
        const { tapStartX, tapStartY } = this;
        const spaceX = tapStartX - x;
        const spaceY = tapStartY - y;

        if  (!this.isCanTap) return false;
        if  (spaceX  > 3 || spaceX < -3) return false;
        if  (spaceY > 3 || spaceY < -3) return false;
        return true;
      },
      initTap({x, y}) {
        clearTimeout(this.timeOutId);
        this.tapStartX = x;
        this.tapStartY = y;
        this.isCanTap = true;
        this.timeOutId = setTimeout(() => this.isCanTap = false, 1000);
      },
      doTap(point, e) {
        if  (!this.hasCanTap(point) || this.btnDisabled) return;
        this.$emit('tap', {
          name: this.btnName,
          event: e,
        });
      },
      onMouseOver(e) {
        if (this.banMouseEvt) return;
        this.isMouseOver = true;
      },
      onMouseLeave() {
        if (this.banMouseEvt) return;
        this.isTouched = false;
        this.isMouseOver = false;
      },
      onMouseDown(e) {
        if (this.banMouseEvt) return;
        this.isTouched = true;
        this.initTap({
          x: e.pageX,
          y: e.pageY,
        });
      },
      onMouseUp(e) {
        if (this.banMouseEvt) return;
        this.isTouched = false;
        this.doTap({
          x: e.pageX,
          y: e.pageY,
        }, e);
      },
      onTouchStart(e) {
        const fingers = e.touches;
        this.banMouseEvt = true;
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
        this.isTouched = false;
        // 限单指
        this.doTap({
          x: fingers[0].pageX,
          y: fingers[0].pageY,
        }, e);
      },
    },
  };
</script>
