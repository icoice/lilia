<template>
  <div class="vm">
    <div class="table animated fadeIn">
      <table class="container" v-if="tbData && tbData.length > 0">
        <thead v-for="thread in otherThreads" v-if="otherThreads && otherThreads.length > 0">
          <td v-for="item in thread" :colspan="!item.cols ? 1 : item.cols" @click="onThreadClick(item.key)">
            <strong>{{item.name}}</strong>
            <strong  class="sub-title" v-if="tbSubTitle && item.subTitle">{{item.subTitle}}</strong>
          </td>
          <td v-if="tbOperator.length > 0"></td>
        </thead>
        <thead v-if="tbThreads && tbThreads.length > 0">
          <td v-for="item in tbThreads" :colspan="!item.cols ? 1 : item.cols" @click="onThreadClick(item.key)">
            <strong>{{item.name}}</strong>
            <strong  class="sub-title" v-if="tbSubTitle && item.subTitle">{{item.subTitle}}</strong>
          </td>
          <td v-if="tbOperator.length > 0"></td>
        </thead>
        <tr v-for="(item, code) in tbData">
          <td v-for="th in tbThreads"
              :cols="!th.cols ? 1 : th.cols"
              @click="onGridClick(th.key, item[th.key], item)"
              @mouseover="onGridOver(th.key, item[th.key], item)">
              {{filterData(th.key, item[th.key])}}
          </td>
          <td class="table-operate" v-if="tbOperator.length > 0">
            <ul>
              <li v-for="opt in tbOperator" v-if="hiddeOperate(item, opt)">
                <vm-button @tap="onRecordClick(opt.key, item)">
                  <div slot="button-content">
                      <span :class="['psm-icon', !opt.icon ? '' : opt.icon]"></span>
                      <span>{{opt.name}}</span>
                  </div>
                </vm-button>
              </li>
            </ul>
          </td>
        </tr>
      </table>
      <div class="tips" v-else>
        <slot name="no-data-mess"/>
      </div>
    </div>
  </div>
</template>

<script>
  import vmButton from '../../common/button';

  export default {
    props: {
      threads: {
        type: Array,
        default: () => [],
      },
      otherThreads: {
        type: Array,
        default: () => [],
      },
      operators: {
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
    },
    watch: {
      data(data) {
        this.tbData = data;
      },
    },
    data() {
      return {
        tbSubTitle: this.showSubTitle,
        tbThreads: this.threads,
        tbOperator: this.operators,
        tbData: this.data,
      };
    },
    methods: {
      filterData(field, val) {
        return this.filter(field, val);
      },
      onThreadClick(field) {
        this.$emit('thread', field);
      },
      onRecordClick(action, data) {
        this.$emit('record', { action, data });
      },
      onGridClick(field, value, record) {
        this.$emit('grid', { field, value, record });
      },
    },
    components: {
      vmButton,
    },
  };
</script>
