# String

## util.String.firstUppercase

字符字母大写。

    // result: Milk
    util.String.firstUppercase('milk');

## util.String.replaceHump

替换驼峰格式。

    // result: feature-box
    util.String.replaceHump('featureBox', '-');
    // result: feature.box
    util.String.replaceHump('featureBox', '.');
