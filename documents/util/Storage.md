# Storage

## util.Storage.local

本地存储, 刷新不会重置

    // result: null
    util.Storage.local('test');
    util.Storage.local('test', { a: 1, b: 1 });
    // result: { a: 1, b: 1 }
    util.Storage.local('test');

## util.Storage.memory

内存存储，刷新会重置

    util.Storage.memory('name', 'yui');
    // result: yui
    util.Storage.memory('name');
