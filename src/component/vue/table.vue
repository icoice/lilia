<template lang="pug">
div.lilia-table.lilia(ref='table')
  div(ref='container')
    table(:class='status')
      thead.table-head(v-if='fields && !empty(fields)')
        td(v-for='field in fields')
          span(v-if='field') {{ field.name }}
          span(v-else) -
        td.table-option(v-if='options && !eq(options.length, 0)'
          :colspan='options.length')
      slot(name='thead' v-else)
      tbody(v-if='list && !eq(list.length, 0)')
        tr(v-for='record in list')
          td(v-for='(field, key) in fields')
            slot(name='td' :record='{ field, key, value: record[key] }')
          td.table-option(
            v-if='options && !eq(options.length, 0)'
            v-for='opt in options')
            lilia-button(
              v-if='opt'
              @pressEnd='e => triggerOption({ option: opt, value: record })')
              div(slot='button')
                span(v-if='opt.icon' :class='opt.icon')
                span {{ opt.name }}
            span(v-else) -
      slot(name='tbody' v-else)
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
