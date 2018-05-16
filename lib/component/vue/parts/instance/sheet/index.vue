<template>
  <div class="moo moo-sheet">
    <ul>
      <li class="sh-line">
        <!-- select -->
        <div class="sh-select">
          <div class="sh-select-item" v-if="shHead && shHead.length > 0">
            <btn>
            </btn>
          </div>
          <div class="sh-select-item" v-for="item in shData">
            <btn @tap="e => onShSelect(item)">
            </btn>
          </div>
        </div>
        <!-- data -->
        <div class="sh-data">
          <table>
            <tr class="sh-data-head" v-if="shHead && shHead.length > 0" v-for="items in shHead">
              <td v-for="item in items">
                <btn>
                  <span slot="btn">{{ item.name }}</span>
                </btn>
              </td>
            </tr>
            <tr v-for="items in shData">
              <td v-for="item in items">
                <btn>
                  <span slot="btn">{{ item.name }}</span>
                </btn>
              </td>
            </tr>
          </table>
        </div>
        <!-- opt -->
        <div class="sh-opt" v-for="item in shData">
          <div class="sh-opt-item" v-if="shHead && shHead.length > 0">
            <btn>
            </btn>
          </div>
          <div class="sh-opt-item" v-for="opt in shOpt">
            <btn @tap="e => onShSelect(opt)">
            </btn>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import btn from '../../common/button';

export default {
  props: {
    head: {
      type: Array,
      default: [],
    },
    list: {
      type: Array,
      default: [],
    },
    operate: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      shData: this.list,
      shHead: this.head,
      shOpt: this.operate,
    };
  },
  watch: {
    shData(list) {
      this.list = list;
    },
  },
  components: {
    btn,
  },
  methods: {
    onShSelect(item) {
    },
    onShOpt(item) {
    },
  },
};
</script>
