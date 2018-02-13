<template>
  <div class="vm" ref="measure">
    <div class="measure-content" ref="measureContent">
      <slot name="measure-content"/>
    </div>
    <div class="measure">
      <vm-button @tap="hasMeasure">
        <span slot="button-content">
          {{ !measure ? '开启标尺' : '关闭标尺' }}
        </span>
      </vm-button>
      <vm-button @tap="hasAllMeasure">
        <span slot="button-content">
          {{ !measureAll ? '开启全屏标尺' : '关闭全屏标尺' }}
        </span>
      </vm-button>
    </div>
  </div>
</template>

<script>
  import vmButton from '../../common/button';
  import util from '../../../../../util';

  export default {
    components: {
      vmButton,
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
