import animate from './animate';
import stroage from './storage';
import formatTime from './formatTime';
import hasEmpty from './hasEmpty';
import humpChange from './humpChange';
import objectValueStr from './objectValueStr';
import ScrollerPaging from './ScrollerPaging';
import httpAdapter from './httpAdapter';
import firstUppercase from './firstUppercase';

export default {
  animate, // animate.css的重放办法
  storage, // 本地存储
  httpAdapter, // 远程协议
  humpChange, // 驼峰规则变换
  hasEmpty, // 空值校验
  formatTime, // 格式化时间
  firstUppercase, // 首字母大写
  objectValueStr, // 对象参数转字符
  ScrollerPaging, // 滚动分页
};
