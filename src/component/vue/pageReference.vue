<template lang='pug'>
  div.lilia-page-reference(class='lilia' v-if='pageTotal > 0')
    table
      tr
        td.page-operate
          lilia-button(@pressEnd='firstPageNo')
            span(slot='button') first
          lilia-button(@pressEnd='e => tapPageNo(currentNo - 1)')
            span(slot='button') prev
        td.page-no.animated.fadeIn(v-for='pageNo in pageNoList' v-if='!maxPage(pageNo)')
          lilia-button(@pressEnd='e => tapPageNo(pageNo)')
            span(slot='button' :class='selected(pageNo)') {{ format(pageNo) }}
        td.page-operate
          lilia-button(@pressEnd='e => tapPageNo(currentNo + 1)')
            span(slot='button') next
          lilia-button(@pressEnd='e => tapPageNo(getTotalPage())')
            span(slot='button') last
        td.page-no-input
          lilia-input(placeholder='页码' :value='String(currentNo)' :filter='/[^0-9]/' @keyup='inputPageNo')
        td.page-info
          span.page-info-value {{ currentNo }}
          span.page-info-value /
          span.page-info-value {{ Math.ceil(total / pageSize) }}
        td.page-info
          span.page-info-value total {{ total }}
</template>

<script>
import createState from './mixins/createState';
import pageReference from './mixins/pageReference';

export default {
  mixins: [
    createState('pageReference'),
    pageReference,
  ],
};
</script>
