<template>
  <div class="moo-louver moo">
    <ul v-for="item in items">
      <li class="louver-lines">
        <div class="louver-item" v-for="slotName in item">
          <slot :name="slotName"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    watch: {
      list(list) {
        this.items = list;
      },
    },
    data() {
      return {
        items: this.list,
      };
    },
  };
</script>
