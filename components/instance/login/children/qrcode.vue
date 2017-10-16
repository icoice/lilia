<template>
  <div class="vp-login-qrcode">
    <div class="vp-login-content animated flipInX">
      <img class="vp-login-qrcode-img" :src="qrcodeImage"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      qrcodeImage: {
        type: String,
        default: '',
      },
    },
  };
</script>
