<template lang="pug">
div.lilia-type(class='lilia')
  div.lilia-type-half
    lilia-input(
      v-if="m$Input"
      :val='m$Input.value'
      :placeholder='m$Input.tips'
      @updated='val => change(val, m$Input)')
  div.lilia-type-half
    lilia-select(
      v-if='m$Select'
      :val='typeof m$Select.value !== "object" ? null : m$Select.value.key'
      :list='m$Select.list'
      :placeholder='m$Select.tips'
      @change='val => change(val, m$Select)')
</template>

<script>
import liliaInput from '../../base/input';
import liliaSelect from '../../base/select';

const drive = window.$lilia_drive;

export default {
  ...drive.Vue.state('m$', {
    input: [Object, {}],
    select: [Object, {}],
  }),
  components: {
    liliaInput,
    liliaSelect,
  },
  methods: {
    change(value, item) {
      this.$emit('change', { value, item });
    },
  },
};
</script>
