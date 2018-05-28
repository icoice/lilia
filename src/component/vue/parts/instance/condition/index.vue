<template>
<div class="moo moo-condition">
  <div class="condition-container" v-for="(line, code) in items" v-if="hasNoEmptry(items)">
    <div class="condition-item" v-for="(item, no) in line" :style="width(cols)">
      <div class="condition-name">{{ item.name }}</div>
      <div class="condition-container" v-if="item.component === 'input'">
        <moo-input :val="item.value" :placeholder="item.tips" @updated="val => change(item, val)"/>
      </div>
      <div class="condition-container" v-if="item.component === 'select'">
        <moo-select
        :val="typeof item.value !== 'object' ? null : item.value.key"
        :list="item.list"
        :placeholder="item.tips"
        @change="val => change(item, val)"/>
      </div>
      <div class="condition-container" v-if="item.component === 'typeInput'">
        <div class="condition-type-input">
          <div class="condition-container-half">
            <moo-input
              v-if="item.items.input"
              :val="item.items.input.value"
              :placeholder="item.items.input.tips"
              @updated="val => change(item.items.input, val)"/>
          </div>
          <div class="condition-container-half">
            <moo-select
              v-if="item.items.select"
              :val="typeof item.items.select.value !== 'object' ? null : item.items.select.value.key"
              :list="item.items.select.list"
              :placeholder="item.items.select.tips"
              @change="val => change(item.items.select, val)"/>
          </div>
        </div>
      </div>
      <div class="condition-container" v-if="item.component === 'date'">
        <div class="condition-date-input" @click="e => changeDateStatus(item)">
          <span class="iconfont icon-activity"></span>
          <moo-input
          :disabled="true"
          :val="formatDate(item.value)"
          :placeholder="item.tips"/>
        </div>
      </div>
      <div class="condition-container" v-if="item.component === 'dateScope'">
        <div class="condition-date-scope" @click="e => changeDateStatus(item.items.start)">
          <span class="iconfont icon-activity"></span>
          <moo-input
          :disabled="true"
          :val="formatDate(item.items.start.value)"
          :placeholder="item.items.start.tips"/>
        </div>
        <div class="condition-date-split">-</div>
        <div class="condition-date-scope" @click="e => changeDateStatus(item.items.end)">
          <span class="iconfont icon-activity"></span>
          <moo-input
          :disabled="true"
          :val="formatDate(item.items.end.value)"
          :placeholder="item.items.end.tips"/>
        </div>
      </div>
      <div class="condition-container" v-if="item.component === 'checkbox'">
        <div class="condition-checkbox-result" v-if="!item.show">
          <btn @tap="changeSearchCheckbox(true, item)">
            <div slot="btn">
              {{ checkBoxSelected(item) }}
            </div>
          </btn>
        </div>
        <div class="condition-checkbox-search" v-else>
          <moo-input
          :val="!checkboxSearchKey[code * cols + no] ? '' : checkboxSearchKey[code * cols + no]"
          placeholder="请输入关键词搜索"
          @updated="val => updateSearchCheckbox(code * cols + no, val)"/>
          <div class="condition-checkbox-operator">
            <btn @tap="changeSearchCheckbox(false, item)">
              <span class="iconfont icon-close" slot="btn"></span>
            </btn>
            <btn @tap="e => reverse(item)">
              <span slot="btn">反选</span>
            </btn>
            <btn @tap="e => allSelect(item)">
              <span slot="btn">全选</span>
            </btn>
          </div>
        </div>
        <div class="condition-checkbox-list" v-if="item.show">
          <div class="condition-checkbox-con">
            <moo-checkbox
              :items="searchCheckbox(code * cols + no, item)"
              :selected="item.value"
              @tap="val => change(item, val)"/>
          </div>
        </div>
      </div>
      <div class="condition-container" v-if="item.component === 'radio'">
        <div class="condition-checkbox-result" v-if="!item.show">
          <btn @tap="changeSearchCheckbox(true, item)">
            <div slot="btn">
              {{ checkBoxSelected(item) }}
            </div>
          </btn>
        </div>
        <div class="condition-radio-search" v-else>
          <moo-input
            :val="!checkboxSearchKey[code * cols + no] ? '' : checkboxSearchKey[code * cols + no]"
            placeholder="请输入关键词搜索"
            @updated="val => updateSearchCheckbox(code * cols + no, val)"/>
          <div class="condition-radio-operator">
            <btn @tap="changeSearchCheckbox(false, item)">
              <span slot="btn">关闭</span>
            </btn>
            <btn @tap="change(item, {})">
              <span slot="btn">清除</span>
            </btn>
          </div>
        </div>
        <div class="condition-radio-list" v-if="item.show">
          <moo-radio
          :items="searchCheckbox(code * cols + no, item)"
          :selected="item.value.code"
          @tap="val => change(item, val)" />
        </div>
      </div>
    </div>
  </div>
  <div class="condition-tips" v-else>未设置查询条件内容</div>
  <moo-datepicker :show="hasDateOpen" :hasClear="true" @close="closeDate" @change="val => changeDate(val)" @clear="val => clearDate()"/>
</div>
</template>

<script>
  import mooDatepicker from '../datepicker';
  import mooInput from '../../common/input';
  import mooSelect from '../../common/select';
  import mooRadio from '../../common/radio';
  import mooCheckbox from '../../common/checkbox';
  import btn from '../../common/button';
  import drive from '../../../../../drive';
  import util from '../../../../../util';


  export default {
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      cols: {
        type: Number,
        default: () => 4,
      },
    },
    data() {
      return {
        hasDateOpen: false,
        dateTarget: null,
        checkboxSearchKey: {},
        condList: this.list,
        condCols: this.cols,
      };
    },
    components: {
      mooInput,
      mooSelect,
      mooDatepicker,
      mooCheckbox,
      mooRadio,
      btn,
    },
    computed: {
      items() {
        const { condCols, condList } = this;
        return util.Array.pile(condCols, condList);
      },
    },
    watch: {
      cols(cols) {
        this.condCols = cols;
      },
      list(list) {
        this.condList = list;
      },
      condShow() {
        this.hasDateOpen = false;
      },
    },
    methods: {
      hasNoEmptry: items => items && items.length > 0,
      width: cols => ({ width: `${100 / cols}%` }),
      updateSearchCheckbox(no, val) {
        this.checkboxSearchKey = Object.assign({},
          this.checkboxSearchKey,
          { [no]: val });
      },
      searchCheckbox(no, item) {
        let newItems = [];
        if(this.checkboxSearchKey[no]) {
          item.items.map((data) => {
            if (data.name.indexOf(this.checkboxSearchKey[no]) >= 0) {
              newItems.push(data);
            } else {
              newItems.push(null);
            }
          });
          return newItems;
        } else {
          return item.items;
        }
      },
      changeSearchCheckbox(show, item) {
        item.show = !item.show;
        if (show) this.checkboxSearchKey = '';
        this.$forceUpdate();
      },
      checkBoxSelected(item) {
        if (util.Assert.hasArr(item.value) && item.value.length > 0) {
          return item.value.map((code) => {
            return item.items[code].name;
          }).join(',');
        } else {
          return item.tips || '请点击选择';
        }
      },
      allSelect(item) {
        item.value = [];
        item.items.map((v, code) => {
          item.value.push(code);
        });
        this.condList = util.Array.clone(this.condList);
      },
      reverse(item) {
        const selected = util.Array.clone(item.value);
        item.value = [];
        item.items.map((v, code) => {
          if (selected.indexOf(code) < 0) {
            item.value.push(code);
          }
        });
        this.condList = util.Array.clone(this.condList);
      },
      formatDate(time) {
        return !time ? '' : util.Date.format('YYYY-MM-DD', time);
      },
      change(item, val) {
        const { condList } = this;
        const newItem = item;
        newItem.value = val;
        this.$emit('change', Object.assign([], condList));
      },
      closeDate(has) {
        this.hasDateOpen = has;
      },
      clearDate() {
        const { condList, dateTarget } = this;
        if (dateTarget) dateTarget.value = '';
        this.$emit('change', Object.assign([], condList));
      },
      changeDate(val) {
        const { condList, dateTarget } = this;
        const date = util.Date.toJSON(val);
        if (dateTarget) dateTarget.value = date;
        this.$emit('change', Object.assign([], condList));
      },
      changeDateStatus(item) {
        this.dateTarget = item;
        this.hasDateOpen = !this.hasDateOpen;
      },
    },
  };
</script>
