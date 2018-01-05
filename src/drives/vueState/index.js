import firstUppercase from './firstUppercase';

export default function vueState(name, state, patch = {}) {
  const $props = {};
  const $watch = {};
  const $data = {};
  const { props, watch, data } = patch;

  Object.entries(state).map((kv) => {
    const [k, v] = kv;
    const dk = `${name}${firstUppercase(k)}`;

    $props[k] = {
      type: v[0],
      default: typeof v[1] === 'object' ? () => v[1] : v[1],
    };
    $watch[k] = function(val) {
     this[dk] = val;
    };
    $data[k] = v[1];

    return kv;
  });

  return {
    props: Object.assign($props, props),
    watch: Object.assign($watch, watch),
    data() {
     const newData = {};

     Object.entries($data).map((kv) => {
      const [k, v] = kv;
      newData[`${name}${firstUppercase(k)}`] = this[k];
      return kv;
     });

     return Object.assign(newData, data);
    },
  };
}
