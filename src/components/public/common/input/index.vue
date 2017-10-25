<template>
  <div class="vp-input" :class="{'vp-input-error': hasVerifyFail || hasEmptry, 'vp-input-disabled': hasDisabled, }">
    <div class="vp-input-container">
      <input v-if="category === 'text'"
        type="text"
        v-model="value"
        :value="value"
        :maxlength="maxLimit"
        :placeholder="tips"
        @keyup="verifyVal"/>
      <input v-if="category === 'password'"
        type="password"
        v-model="value"
        :value="value"
        :maxlength="maxLimit"
        :placeholder="tips"
        @keyup="verifyVal"/>
      <div class="vp-input-clear" v-if="hasClear && value && value !== '' && !hasDisabled">
        <span class="psm-icon psm-clear" @click="clear"></span>
      </div>
      <div class="vp-input-mask" v-if="hasDisabled"></div>
    </div>
    <div class="vp-input-verify-fail-tips animated fadeInDown" v-if="hasEmptry">
      该项内容必填
    </div>
    <div class="vp-input-verify-fail-tips animated fadeInDown" v-if="hasVerifyFail">
      {{verifyInput.message}}
    </div>
  </div>
</template>

<script>
  /* import css */;

  export default {
    props: {
      hasClear: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      hasKey: {
        type: [String, Number],
        defalut: null,
      },
      verify: {
        type: Object,
        default: () => ({
          regExp: null,
          message: '',
        }),
      },
      filter: {
        type: RegExp,
        default: null,
      },
      toVerify: {
        type: Boolean,
        default: false,
      },
      maxLength: {
        type: Number,
        default: 100,
      },
      placeholder: {
        type: String,
        default: '',
      },
      defValue: {
        type: [String, Number],
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      isNoEmpty: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      toVerify(status) {
        if (status) this.verifyVal();
      },
      hasKey(key) {
        this.inputKey = key;
      },
      type(type) {
        this.category = type;
      },
      placeholder(tips) {
        this.tips = tips;
      },
      defValue(val) {
        this.value = val;
      },
      filter(reg) {
        this.valFilter = reg;
      }
    },
    data() {
      return {
        inputKey: this.hasKey,
        tips: this.placeholder,
        category: this.type,
        value: this.defValue,
        valFilter: this.filter,
        maxLimit: this.maxLength,
        verifyInput: this.verify,
        checkEmptry: this.isNoEmpty,
        hasDisabled: this.disabled,
        hasEmptry: false,
        hasVerifyFail: false,
      };
    },
    updated() {
      // 注意，input重渲染的时候也会被触发，会让值被置空
      this.$emit('update', this.getVal());
    },
    methods: {
      getVal() {
        const { inputKey, value } = this;
        return !inputKey ? value : { [inputKey]: value };
      },
      verifyVal() {
        const { verifyInput, valFilter, value } = this;
        const { regExp } = verifyInput;

        if (valFilter !== null)  this.value = value.replace(valFilter, '');
        if (this.checkEmptry && this.value === '') {
          this.$emit('verify', false);
          this.hasEmptry = true;
        } else if (regExp instanceof RegExp && this.value !== '') {
          const verifyRes = !regExp.test(this.value);
          this.$emit('verify', !verifyRes);
          this.hasVerifyFail = verifyRes;
          this.hasEmptry = false;
        } else {
          this.hasVerifyFail = false;
          this.hasEmptry = false;
          this.$emit('verify', true);
        }

        this.$emit('keyup', this.getVal());
      },
      clear() {
        this.value = '';
        this.verifyVal();
        this.$emit('clear', this.getVal());
      },
    },
  };
</script>
