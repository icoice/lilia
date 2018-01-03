import animate from './animate';
import arrayGroups from './arrayGroups';
import vueState from './vueState';
import def from './def';
import hasEmpty from './hasEmpty';
import humpChange from './humpChange';
import hasPromise from './hasPromise';
import firstUppercase from './firstUppercase';
import formatTime from './formatTime';
import storage from './storage';
import ScrollerPaging from './ScrollerPaging';
import objectValueStr from './objectValueStr';

export default {
  animate, // animate.css的重放办法
  arrayGroups,
  def, // 非空默认
  humpChange, // 驼峰规则变换
  hasEmpty, // 空值校验
  hasPromise, // 是否为Promise对象
  formatTime, // 格式化时间
  firstUppercase, // 首字母大写
  objectValueStr, // 对象参数转字符
  vueState, // vue的state快速创建
  ScrollerPaging, // 滚动分页
  storage, // 本地存储
};
