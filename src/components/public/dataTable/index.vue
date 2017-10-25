<template>
  <div class="vp-data-table animated fadeIn">
    <table class="vp-table" v-if="tbData && tbData.length > 0">
      <thead>
        <td v-for="item in tbThread" @click="onThreadClick(item.key)">
          <strong>{{item.name}}</strong>
          <strong  class="sub-title" v-if="tbSubTitle && item.subTitle">{{item.subTitle}}</strong>
        </td>
        <td v-if="tbOperator.length > 0"></td>
      </thead>
      <tr v-for="(item, code) in tbData">
        <td v-for="th in tbThread"
            @click="onGridClick(th.key, item[th.key], item)"
            @mouseover="onGridOver(th.key, item[th.key], item)">
            {{filterData(th.key, item[th.key])}}
        </td>
        <td class="vp-table-operate" v-if="tbOperator.length > 0">
          <ul>
            <li v-for="opt in tbOperator" v-if="hiddeOperate(item, opt)">
              <vp-button @click="onRecordClick(opt.key, item)">
                <div slot="button-name">
                    <span :class="['psm-icon', !opt.icon ? '' : opt.icon]"></span>
                    <span class="vp-button-name">{{opt.name}}</span>
                </div>
              </vp-button>
            </li>
          </ul>
        </td>
      </tr>
    </table>
    <div class="vp-tips" v-else>
      <slot name="no-data-mess"/>
    </div>
  </div>
</template>

<script>
  /* import css */;
  import { vpButton } from '../common';

  export default {
    props: {
      thread: {
        type: Array,
        default: () => [],
      },
      operator: {
        type: Array,
        default: () => [],
      },
      data: {
        type: Array,
        default: () => [],
      },
      onGridOver: {
        type: Function,
        default: () => {},
      },
      filter: {
        type: Function,
        default: (field, val) => val,
      },
      hiddeOperate: {
        type: Function,
        default: () => true,
      },
      showSubTitle: {
        type: Boolean,
        default: true,
      },
      noDataMess: {
        type: String,
        default: 'NOT DATA.',
      },
    },
    watch: {
      data(data) {
        this.tbData = data;
      },
    },
    data() {
      return {
        tbSubTitle: this.showSubTitle,
        tbThread: this.thread,
        tbOperator: this.operator,
        tbData: this.data,
      };
    },
    methods: {
      filterData(field, val) {
        return this.filter(field, val);
      },
      onThreadClick(field) {
        this.$emit('threadClick', field);
      },
      onRecordClick(action, data) {
        this.$emit('recordClick', { action, data });
      },
      onGridClick(field, value, record) {
        this.$emit('gridClick', { field, value, record });
      },
    },
    components: {
      vpButton,
    },
  };
</script>
