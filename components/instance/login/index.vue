<template>
  <div class="vp-login">
    <div class="vp-login-usr-data">
      <div class="vp-login-title">
        <span>{{title}}</span>
      </div>
      <div class="vp-login-all-part">
        <div class="vp-login-part">
          <div class="vp-login-logo"></div>
        </div>
        <div class="vp-login-part">
          <h4>{{loginPatternTitle[loginPattern]}}</h4>
          <account :inputs="inputLoginInfos" :onInput="onInput" @push="onUserLogin" v-if="loginPattern==='account'" />
          <qrcode :img="qrcodeImage" v-else />
          <div class="vp-login-change-pattern" @click="onChangPattern()">
            <span class="psm-icon psm-change"></span>
            <span>{{loginPatternTxt[loginPattern]}}</span>
          </div>
        </div>
      </div>
      <div class="compact-tips">
        Chrome.51版本以上将有更好的用户体验（<a @click="onDownloadChrome">下载Chrome</a>）
      </div>
    </div>
  </div>
</template>

<script>
  import 'planes/base.css';
  /* import css */;
  import { account, qrcode } from './children';

  export default {
    props: {
      option: {
        type: Object,
        default: () => ({}),
      },
      qrcodeImage: {
        type: String,
        default: '#',
      },
      onUserInput: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      const { option } = this;
      const { title } = option;

      return {
        inputLoginInfos: [
          {
            key: 'account',
            type: 'text',
            verify: /[a-zA-Z0-9]{0,}/g,
            value: '',
            tips: '请输入您的账号',
          },
          {
            key: 'password',
            verify: /.{0,}/g,
            type: 'password',
            value: '',
            tips: '请输入您的密码',
          },
        ],
        loginInfo: {},
        loginPattern: 'qrcode',
        chromeDownloadAddress: 'http://10.42.0.222/download/chrome56.zip',
        title: !title ? 'Welcome to login system' : title,
        loginPatternTitle: {
          account: '请使用本平台账号登录',
          qrcode: '请使用应用内的“扫一扫”功能',
        },
        loginPatternTxt: {
          qrcode: '切换至账密登录',
          account: '切换至二维码登录',
        },
      };
    },
    components: {
      account,
      qrcode,
    },
    methods: {
      // 账密登录
      onInput(key, value) {
        const { inputLoginInfos, loginInfo } = this;

        inputLoginInfos.map((item) => {
          const i = item;
          i.value = key === i.key ? value : i.value;
          loginInfo[i.key] = i.value;
          return i;
        });
        this.onUserInput(loginInfo);
      },
      // 切换登录模式
      onChangPattern() {
        this.loginPattern = this.loginPattern === 'qrcode' ? 'account' : 'qrcode';
      },
      // 下载chrome浏览器
      onDownloadChrome() {
        location.href = this.chromeDownloadAddress;
      },
      // 触发事件
      onUserLogin(values) {
        this.$emit('push', values);
      },
    },
  };
</script>
