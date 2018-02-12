# Date

## util.Date.format

日期格式化，支持三种数据类型。

    // result: 2017-10-01
    util.Date.format('YYYY-MM-DD', new Date());
    // result: 2017-10-01
    util.Date.format('YYYY-MM-DD', {year: 2017, month: 10, day: 1});
    // result: 17-1-1
    util.Date.format('YY-M-D', '2017/01/01');

## util.Date.day

计算天数, 默认过去或未来距离今天多少日。

    // result: 99
    util.Date.day('2017/10/12');
    // result: 730
    util.Date.day('2017/10/12', '2019/10/12');
