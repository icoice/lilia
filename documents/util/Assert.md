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

## util.Assert.has

判断对象是否为其中一个类型

    util.Assert.has('number,string', obj);


## util.Assert.hasDate

是否为日期对象。

    // result: true
    util.Assert.hasDate(new Date());    

## util.Assert.hasStr

是否为字符串。

    // result: true
    util.Assert.hasStr('');

## util.Assert.hasFile

是否为文件。

    // result: true
    util.Assert.hasFile(new File());  

## util.Assert.hasFunc

是否为函数。

    // result: true
    util.Assert.hasFunc(new Function());   

## util.Assert.hasObj

是否为对象。

    // result: true
    util.Assert.hasObj(new Object());


## util.Assert.hasPromise

是否为一个Promise对象, 有些较老的安卓系统不支持instanceof Promise。

    // result: true
    util.Assert.hasPromise(new Promise());
