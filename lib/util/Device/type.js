'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function type() {
  var deviceInfo = navigator.userAgent;
  if (/ios|iphone|ipod|ipad/gi.test(deviceInfo)) return 'IOS';
  if (/mac/gi.test(deviceInfo)) return 'MAC';
  if (/android/gi.test(deviceInfo)) return 'Android';
  if (/windows/gi.test(deviceInfo)) return 'Windows';
}

exports.default = {
  ios: function ios(cb) {
    var deviceType = type();
    if (deviceType === 'IOS') {
      if (typeof cb === 'function') cb();
    }
  },
  mac: function mac(cb) {
    var deviceType = type();
    if (deviceType === 'MAC') {
      if (typeof cb === 'function') cb();
    }
  },
  android: function android(cb) {
    var deviceType = type();
    if (deviceType === 'Android') {
      if (typeof cb === 'function') cb();
    }
  },
  windows: function windows(cb) {
    var deviceType = type();
    if (deviceType === 'Windows') {
      if (typeof cb === 'function') cb();
    }
  }
};