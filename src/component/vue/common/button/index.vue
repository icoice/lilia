<template lang='pug'>
div.moo-btn(:class="['moo', hasDisabled]")
  // 支持移动设备
  div(:class="['btn-touch', hasTapped]"
    v-if='m$HasMobile'
    @touchstart="touchStart"
    @touchmove= "touchMove"
    @touchend="touchEnd")
    slot(name="btn")

  // 支持台式电脑
  div(:class="['btn-touch', hasTapped]"
    v-else
    @mousedown="mouseStart"
    @mouseleave= "mouseMove"
    @mouseup="mouseEnd")
    slot(name="btn")
</template>

<script>
import actions from './actions';

const drive = window.$drive;

export default {
  ...drive.Vue.state('m$', {
    name: [String, ''], // 组件名称
    tapStartX: [Number, 0], // 敲击位置参数X
    tapStartY: [Number, 0], // 敲击位置参数Y
    disabled: [Boolean, false], // 是否禁止使用
    hasTouched: [Boolean, false], // 是否正在触摸
    hasMobile: [Boolean, false], // 是否为移动设备
    isCanTap: [Boolean, true], // 是否可以敲击
  }),
  mounted() {
    this.checkEnvironment(); // 验证环境
  },
  ...actions,
};
</script>
