import eq from './equal';
import scrollEnd from './scrollEnd';

/**
 * 制作轻应用会用fixed的元素，fixed元素到现在表现都不好（页面滚动到时候会出问题），
 * 因此会将根元素全屏化（使用绝对定位），使用的是元素的滚动条，而非window对象的滚动条。
 * 将根元素作为滚动对象时，由于切换组件会初始化元素的滚动条位置（window的滚动条会依据不同页面记录滚动位置） 
 * 该mixin用于应对该情况。
 * 在根元素的周期事件或页面切换事件内使用：
 */

/*
  [Example]

  const recorder = scrollRecord(node, true);

  recorder.run((doth) => {
    const { hash } = location;

    doth({
      name: hash,
      rules: {
        '#/home': ['#/message'], // 当message返回上一页为home时，
      },
    });
  });
*/

export default (node, debug = false) => ({
  data: {
    before: '', // 上一个页面
    current: '', // 当前页面
    saveList: {}, // 已记录的页面滚动位置
    listening: false,
    debug,
  },
  run(callback = () => null) {
    callback(({ name, rules }) => {
      this.pageChange(name);
      this.listen();
      this.read(rules);
    });
  },
  log(message) {
    const { debug } = this;

    if (debug) console.log(message);
  },
  // 保存当前页面名称
  pageChange(name) {
    const { current } = this;

    if (eq(current, name)) return current;

    this.before = current;
    this.current = name;

    this.log(`上一个页面为${current}`);
    this.log(`当前页面为${name}`);

    return current;
  },
  // 读取滚动记录
  read(rules = {}) {
    const { current, before, saveList } = this;
    const needRead = rules[current];

    this.log(`${current}需要读取滚动记录？ ${node && needRead ? 'YES' : 'NO'}`);
    this.log(`${current}的记录规则为当上一个页面为${needRead}时，读取滚动条记录`);

    if (!node || !needRead) return node;
    if (needRead.indexOf(before) < 0) {
      node.scrollTop = 0;

      this.log('上一页面为非设定页面，当前滚动条已置顶');

      return node;
    }

    node.scrollTop = saveList[current];
    this.log(`${current}已读取滚动记录：${node.scrollTop}`);

    return node;
  },
  // 保存页面滚动
  listen() {
    const { data } = this;
    const { listening } = data;

    this.log(`是否开启了滚动监听：${listening}`);

    if (listening) return listening;

    data.listening = true;

    node.addEventListener('scroll', e => {
      const { saveList, current } = data;
      const n = e.srcElement || e.target;

      this.saveList = {
        ...saveList,

        [current]: n.scrollTop,
      };
    }, false);

    scrollEnd(node, (e) => {
      const n = e.srcElement || e.target;

      this.log(`[${data.current}: ${n.scrollTop}]`);
    });
  },
});