# Assert

## util.Assert.def

值为空值时， 返回默认值。

    // result: 0
    util.Assert.def('', 0);

## util.Assert.hasEmtpy

是否为空值。

    // result: true
    util.Assert.hasEmtpy({});

    // result: true
    util.Assert.hasEmtpy([]);

    // result: true
    util.Assert.hasEmtpy('');

    // result: true
    util.Assert.hasEmtpy(null);

    // result: true
    util.Assert.hasEmtpy(undefined);

## util.Assert.hasPromise

是否为一个Promise对象, 有些较老的安卓系统不支持instanceof Promise。

    // result: true
    util.Assert.hasPromise(new Promise());
