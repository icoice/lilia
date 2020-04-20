import { firstUppercase, loop, JUDGE } from '../../common';

export default (namespace, list) => {
  const props = {};
  const types = [String, Number, Object, FormData, Array, Boolean];
  const watch = {};
  const propNames = [];

  list.map((item) => {
    const propName = item.key;

    propNames.push(propName);

    props[propName] = {
      type: !item.type ? types : item.type,
      default: item.def,
    };

    if (JUDGE.IS_FUN(item.watch)) {
      watch[propName] = item.watch;
    } else {
      watch[propName] = function (v) {
        const dk = `${namespace}${firstUppercase(propName)}`;

        this[dk] = v;
      };
    }

    return item;
  });

  return {
    data() {
      const contactProps = {};

      propNames.map((n) => {
        contactProps[`${namespace}${firstUppercase(n)}`] = this[n];
      });

      return {
        ...contactProps,
      };
    },
    props,
    watch,
  };
}
