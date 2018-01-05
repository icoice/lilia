# 工具箱

常用方法的集合

    import { vmUtils } from 'vue-moo';

    vmUtils.arrayGroup(...);

数组元素分组

    arrayGroup(2, [1, 2, 3, 4, 5, 6]) // result: [ [1, 2], [3,4], [5, 6] ]

空元素默认值

    def({}, null); // result: null

字符首字母大写

    firstUppercase('wanne'); // result: Wanne

是否为空值，含空对象

    hasEmptry({}); // result: true

是否为一个Promise的实例

    hasPromise(new Promise()); // result: true

对象首层元素字符化

    objectValueStr({ a: 1, b: 2 }); // result: { a: '1', b: '1' }
