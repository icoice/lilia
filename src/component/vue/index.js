// 基础组件
import button from './common/button';
import checkbox from './common/checkbox';
import file from './common/file';
import loading from './common/loading';
import image from './common/image';
import input from './common/input';
import radio from './common/radio';
import select from './common/select';
import toast from './common/toast';

// 特例组件
import choose from './instance/choose';
import condition from './instance/condition';
import date from './instance/date';
import datepicker from './instance/datepicker';
import table from './instance/table';
import tree from './instance/tree';
import pop from './instance/pop';
import paging from './instance/paging';
import measure from './instance/measure';
import showcase from './instance/showcase';

export const liliaBtn = button;
export const liliaCheckbox = checkbox;
export const liliaChoose = choose;
export const liliaCondition = condition;
export const liliaDate = date;
export const liliaDatepicker = datepicker;
export const liliaFile = file;
export const liliaLoading = loading;
export const liliaMeasure = measure;
export const liliaPaging = paging;
export const liliaInput = input;
export const liliaRadio = radio;
export const liliaSelect = select;
export const liliaShowcase = showcase;
export const liliaToast = toast;
export const liliaTable = table;
export const liliaImg = image;
export const liliaTree = tree;
export const liliaPop = pop;

const component = {
  liliaBtn,
  liliaChoose,
  liliaCheckbox,
  liliaCondition,
  liliaDate,
  liliaDatepicker,
  liliaFile,
  liliaLoading,
  liliaMeasure,
  liliaInput,
  liliaPaging,
  liliaRadio,
  liliaSelect,
  liliaShowcase,
  liliaTable,
  liliaToast,
  liliaTree,
  liliaImg,
  liliaPop,
};

export const register = function register(Vue) {
  const components = {};
  Object.entries(component).map((kv) => {
    const [n, c] = kv;
    components[n] = Vue.component(n, c);
    return kv;
  });
  return components;
};

export default {
  ...component,
  register,
};
