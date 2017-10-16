<template>
  <div class="vp-login-account">
    <div class="vp-login-login-content animated flipInX">
      <ul>
        <li v-for="item in inputs">
          <label>
            <span :class="`psm-icon psm-${item.key}`"></span>
            <vp-input :hasKey="item.key" :type="item.type" :defValue="item.value" :placeholder="item.tips" @update="onInputChange"/>
          </label>
        </li>
        <li>
          <button class="vp-login-button" @click.stop="onLogin" @keyup.13="onLogin">
            <span class="psm-icon psm-login"></span>
            <span>登 录</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { animate } from '../../../../utils';
  import { vpInput } from '../../../public/common';

  export default {
    props: {
      inputs: {
        type: Array,
        default: () => {},
      },
      onInput: {
        type: Function,
        default: () => {},
      },
    },
    components: {
      vpInput,
    },
    data: () => ({
      info: {
        account: '',
        password: '',
      },
    }),
    methods: {
      onInputChange(data) {
        const { info } = this;
        this.info = Object.assign(info, {
          ...data,
        });
        this.$emit('onChange', info);
      },
      onLogin(e) {
        animate('pulse', e.target, 'quickly');
        this.$emit('push', this.info);
      },
    },
  };
</script>
