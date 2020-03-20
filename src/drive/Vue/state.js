import { firstUppercase, loop, JUDGE } from '../../common';

export default (namespace, list) => {
  const props = {};
  const types = [String, Number, Object, FormData, Array, null];
  const watch = {};
  const propNames = [];

  list.map((item) => {
    let propName;
    let propBody;

    loop(item, (v, k) => {
      if (JUDGE.IS_ARR(v) || JUDGE.BELONG_IN(v, types)) {
        propName = k;
        propBody = { type: v };

        propNames.push(k);
      }
    });

    props[propName] = propBody;
    watch[propName] = JUDGE.IS_FUN(item.watch) ? item.watch : v => v;

    return item;
  });

  return {
    data() {
      const list = {};

      propNames.map((n) => {
        list[`${namespace}${firstUppercase(n)}`] = this[n];
      });

      return {
        ...list,
      };
    },
    props,
    watch,
  };
}
