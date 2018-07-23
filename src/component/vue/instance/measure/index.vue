<template lang='pug'>
  div.lilia-measure(class='lilia' ref='measure')
    div.measure-content(ref='measureContent')
      slot(name='measure')
    div.measure
      btn(@tap='hasMeasure')
        span(slot='btn') {{ !measure ? '开启标尺' : '关闭标尺' }}
      btn(@tap='hasAllMeasure')
        span(slot='btn') {{ !measureAll ? '开启全屏标尺' : '关闭全屏标尺' }}
</template>

<script>
import btn from '../../base/button';
import actions from './actions';

export default {
  components: {
    btn,
  },
  data: () => ({
    measure: false,
    measureAll: false,
  }),
  ...actions,
};
</script>
