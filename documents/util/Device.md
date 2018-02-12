# Device

## util.Device.type

设备符合相关类型才会执行。

    util.Device.type.windows(() => {
      console.log('do it');
    });

    util.Device.type.mac(() => {
      console.log('do it');
    });

    util.Device.type.android(() => {
      console.log('do it');
    });

    util.Device.type.ios(() => {
      console.log('do it');
    });

    // 回调函数返回的结果即是该方法的返回值，未执行时返回undefined。
    util.Device.type.browser(() => {
      console.log('do it');  
      return true;
    });
