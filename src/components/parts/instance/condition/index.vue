<template>
  <div class="vm">
    <div class="condition">
      <vm-date :open="hasDateOpen" @change="val => changeDate(val)"/>
      <div class="condition-container" v-for="(line, code) in items" v-if="hasNoEmptry(items)">
        <div class="condition-item" v-for="item in line" :style="width(cols)">
          <!-- 标题 -->
          <div class="condition-name">{{ item.name }}</div>
          <!-- 输入组件 -->
          <div class="condition-container" v-if="item.component === 'input'">
            <vm-input :val="item.value" :placeholder="item.tips" @updated="val => change(item, val)"/>
          </div>
          <div class="condition-container" v-if="item.component === 'select'">
            <vm-select :val="item.value.key" :list="item.list" :placeholder="item.tips" @change="val => change(item, val)"/>
          </div>
          <div class="condition-container" v-if="item.component === 'date'">
            <div class="condition-date-input" @click="e => changeDateStatus(item)">
              <vm-input :disabled="true" :val="formatDate(item.value)" :placeholder="item.tips" @updated="val => change(item, val)"/>
              <span class="psm-icon psm-close" @click="clearDate" v-if="hasDateOpen && item.key === dateTarget.key"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="condition-tips" v-else>
        未设置查询条件内容
      </div>
    </div>
  </div>
</template>

<script>
  import vmDate from '../date';
  import vmInput from '../../common/input';
  import vmSelect from '../../common/select';
  import vueState from '../../../../utils/vueState';
  import formatTime from '../../../../utils/formatTime';
  import arrayGroups from '../../../../utils/arrayGroups';


  export default {
    ...vueState('cond', {
      list: [Array, []],
      cols: [Number, 4],
    }, {
      data: {
        hasDateOpen: false,
        dateTarget: null,
      },
    }),
    components: {
      vmInput,
      vmSelect,
      vmDate,
    },
    computed: {
      items() {
        const { condCols, condList } = this;
        return arrayGroups(condCols, condList);
      },
    },
    methods: {
      hasNoEmptry: items => items && items.length > 0,
      width: cols => ({ width: `${100 / cols}%` }),
      formatDate(time) {
        return !time ? '' : formatTime('YYYY-MM-DD', time);
      },
      dateSelected() {
        return
      },
      change(item, val) {
        const { condList } = this;
        const newItem = item;
        newItem.value = val;
        this.$emit('change', Object.assign([], condList));
      },
      clearDate() {
        const { condList, dateTarget } = this;
        if (dateTarget) dateTarget.value = '';
        this.$emit('change', Object.assign([], condList));
      },
      changeDate(val) {
        const { condList, dateTarget } = this;
        if (dateTarget) dateTarget.value = val;
        this.$emit('change', Object.assign([], condList));
      },
      changeDateStatus(item) {
        this.dateTarget = item;
        this.hasDateOpen = !this.hasDateOpen;
      },
    },
  };
</script>
