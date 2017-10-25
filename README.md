# VUE-MOO
以Vue框架为基础堆砌的库。

## 兼容问题
由于使用了slot-space, 且不引用template, 部分组件仅支持2.5.0版本以上的Vue。

## 库的开发备忘
1、请使用npm run encode进行初步编译。  
2、修改webpack.base.js的include属性，添加resolve('node_modules/vue-moo')，让Vue的webpack环境中编译模块。  
3、项目请安装“babel-plugin-transform-object-entries”插件，并在babel的配置中设置。

## How to use ?
npm install --save vue-moo
