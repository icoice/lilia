<template lang="pug">
div.lilia-table(ref='table')
  div(ref='container')
    table(:class='status')
      thead.table-head
        td(v-for='field in fields' :style='offset')
          span(v-if='field') {{ field.name }}
          span(v-else) -
      tbody
        tr(v-for='record in list')
          td(v-for='(field, key) in fields')
            slot(name='td' :record='{ field, value: record[key] }')
</template>

<script>
import createState from './mixins/createState';
import table from './mixins/table';

export default {
  mixins: [
    createState('table'),
    table,
  ],
};
</script>
