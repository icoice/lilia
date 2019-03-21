<template lang='pug'>
  div.lilia-page-reference(class='lilia' v-if='pageTotal > 0')
    table
      tr
        td.page-info
          span 全
          span.page-info-value {{total}}
          span 条记录
        td.page-info
          span 共
          span.page-info-value {{Math.ceil(total / pageSize)}}
          span 页
        td.page-operate
          lilia-button(@pressEnd='firstPageNo')
            span.iconfont.icon-skipprevious(slot='button')
          lilia-button(@pressEnd='e => tapPageNo(currentNo - 1)')
            span.iconfont.icon-chevronleft(slot='button')
        td.page-no.animated.fadeIn(v-for='pageNo in pageNoList' v-if='!maxPage(pageNo)')
          lilia-button(@pressEnd='e => tapPageNo(pageNo)')
            span(slot='button' :class='selected(pageNo)') {{ format(pageNo) }}
        td.page-operate
          lilia-button(@pressEnd='e => tapPageNo(currentNo + 1)')
            span.iconfont.icon-chevronright(slot='button')
          lilia-button(@pressEnd='e => tapPageNo(getTotalPage())')
            span.iconfont.icon-skipnext(slot='button')
        td.page-no-input
          lilia-input(placeholder='页码' :value='String(currentNo)' :filter='/[^0-9]/' @keyup='inputPageNo')
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
