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
