function type() {
  const deviceInfo = navigator.userAgent;
  if (/ios|iphone|ipod|ipad/gi.test(deviceInfo)) return 'IOS';
  if (/mac/gi.test(deviceInfo)) return 'MAC';
  if (/android/gi.test(deviceInfo)) return 'Android';
  if (/windows/gi.test(deviceInfo)) return 'Windows';
}

export default {
  ios(cb) {
    const deviceType = type();
    if (deviceType === 'IOS') {
      if (typeof cb === 'function') cb();
    }
  },
  mac(cb) {
    const deviceType = type();
    if (deviceType === 'MAC') {
      if (typeof cb === 'function') cb();
    }
  },
  android(cb) {
    const deviceType = type();
    if (deviceType === 'Android') {
      if (typeof cb === 'function') cb();
    }
  },
  windows(cb) {
    const deviceType = type();
    if (deviceType === 'Windows') {
      if (typeof cb === 'function') cb();
    }
  },
};
