<template lang="pug">
div.lilia-button.lilia(
  :class='{"lilia-pressed": status === "pressStart", "lilia-disabled": status === "disabled"}')
  div.tap-area(v-if='isMobile' @touchstart='onTapStart' @touchmove='onTapMove' @touchend='onTapEnd')
    slot(name='button')
  div.tap-area(v-else @mousedown='onTapStart' @mousemove='onTapMove' @mouseup='onTapEnd')
    slot(name='button')
</template>

<script>
import createState from './mixins/createState';
import disabled from './mixins/disabled';
import tap from './mixins/tap';

export default {
  mixins: [
    createState('tap'),
    disabled,
    tap,
  ],
  mounted() {
    this.checkEnv();
  },
  data: () => ({
    isMobile: false,
    bindReisze: false,
  }),
  methods: {
    checkEnv() {
      this.isMobile = this.isMob();

      if (!this.bindReisze) {
        this.bindReisze = true;

        window.addEventListener('resize', () => {
          this.isMobile = this.isMob();
        });
      }
    },
  },
};
</script>
