<template>
  <div class="moo-menuse moo" ref="measure">
    <div class="measure-content" ref="measureContent">
      <slot name="measure-content"/>
    </div>
    <div class="measure">
      <btn @tap="hasMeasure">
        <span slot="button-content">
          {{ !measure ? '开启标尺' : '关闭标尺' }}
        </span>
      </btn>
      <btn @tap="hasAllMeasure">
        <span slot="button-content">
          {{ !measureAll ? '开启全屏标尺' : '关闭全屏标尺' }}
        </span>
      </btn>
    </div>
  </div>
</template>

<script>
  import btn from '../../common/button';
  import util from '../../../../../util';

  export default {
    components: {
      btn,
    },
    data: () => ({
      measure: false,
      measureAll: false,
    }),
    methods: {
      hasMeasure() {
        this.measure = !this.measure;
        this.measureAll = false;

        if (!this.measure) {
          util.Dom.rule.closeMeasure();
        } else {
          util.Dom.rule.measureByClick(this.$refs.measureContent);
        }
      },
      hasAllMeasure() {
        this.measureAll = !this.measureAll;
        this.measure = false;

        if (!this.measureAll) {
          util.Dom.rule.closeMeasure();
        } else {
          util.Dom.rule.measureAll(this.$refs.measureContent);
        }
      },
    },
  }
</script>
