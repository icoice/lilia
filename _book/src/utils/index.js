import animate from './animate';
import def from './def';
import hasEmpty from './hasEmpty';
import humpChange from './humpChange';
import hasPormise from './hasPromise';
import firstUppercase from './firstUppercase';
import formatTime from './formatTime';
import stroage from './storage';
import ScrollerPaging from './ScrollerPaging';
import objectValueStr from './objectValueStr';

export default {
  animate, // animate.css的重放办法
  def, // 非空默认
  humpChange, // 驼峰规则变换
  hasEmpty, // 空值校验
  hasPormise, // 是否为Promise对象
  formatTime, // 格式化时间
  firstUppercase, // 首字母大写
  objectValueStr, // 对象参数转字符
  ScrollerPaging, // 滚动分页
  storage, // 本地存储
};
