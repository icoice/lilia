<template>
  <div class="moo moo-input" :class="{'moo-input-error': hasVerifyFail || hasEmptry, 'moo-input-disabled': hasDisabled, }">
    <div class="input-container">
      <input
        ref="input"
        :value="myVal"
        :type="category"
        :maxlength="maxLimit"
        :placeholder="tips"
        @input = "onInput"
        @change = "onChange"
        @focus = "onFocus"
        @blur ="onBlur"
        @keyup="verifyVal"/>
      <div class="input-clear" v-if="showClear(myVal)">
        <span class="psm-icon psm-clear" @click.stop="clear" @touchend.stop="clear">
        </span>
      </div>
      <div class="input-mask" v-if="hasDisabled"></div>
    </div>
    <div class="input-verify-fail-tips animated fadeInDown" v-if="hasEmptry">
      该项内容必填
    </div>
    <div class="input-verify-fail-tips animated fadeInDown" v-if="hasVerifyFail">
      {{verifyInput.message}}
    </div>
  </div>
</template>

<script>
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
      val: {
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
      val(val) {
        this.myVal = val;
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
        myVal: this.val,
        valFilter: this.filter,
        maxLimit: this.maxLength,
        verifyInput: this.verify,
        checkEmptry: this.isNoEmpty,
        hasDisabled: this.disabled,
        hasClearNow: false,
        hasEmptry: false,
        hasVerifyFail: false,
      };
    },
    updated() {
      // 注意，input重渲染的时候也会被触发，会让值被置空
      this.$emit('updated', this.getVal());
    },
    methods: {
      getVal() {
        const { inputKey, myVal } = this;
        return !inputKey ? myVal : { [inputKey]: myVal };
      },
      verifyVal(e = {}) {
        const { verifyInput, valFilter, myVal } = this;
        const { regExp } = verifyInput;

        if (e.target) this.myVal = e.target.value;
        if (valFilter !== null) {
          this.myVal = this.myVal.replace(valFilter, '');
        }

        if (this.checkEmptry && this.value === '') {
          this.$emit('verify', false);
          this.hasEmptry = true;
        } else if (regExp instanceof RegExp && this.myVal !== '') {
          const verifyRes = !regExp.test(this.myVal);
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
      onInput() {
        this.$emit('input', this.getVal());
      },
      onChange() {
        this.$emit('change', this.getVal());
      },
      onFocus() {
        this.$emit('focus', this.getVal());
        this.hasClearNow = false;
      },
      onBlur(e) {
        if (!this.hasClearNow) {
          this.$emit('blur', this.getVal());
        } else {
          this.hasClearNow = false;
          if(e.target) e.target.focus();
        }
      },
      showClear(val) {
        return this.hasClear && val && val !== '' && !this.hasDisabled;
      },
      clear() {
        this.hasClearNow = true;
        this.myVal = '';
        this.verifyVal();
        this.$emit('clear', this.getVal());
      },
    },
  };
</script>
