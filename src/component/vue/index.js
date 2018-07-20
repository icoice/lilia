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

export const mooBtn = button;
export const mooCheckbox = checkbox;
export const mooChoose = choose;
export const mooCondition = condition;
export const mooDate = date;
export const mooDatepicker = datepicker;
export const mooFile = file;
export const mooLoading = loading;
export const mooMeasure = measure;
export const mooPaging = paging;
export const mooInput = input;
export const mooRadio = radio;
export const mooSelect = select;
export const mooShowcase = showcase;
export const mooToast = toast;
export const mooTable = table;
export const mooImg = image;
export const mooTree = tree;
export const mooPop = pop;

const component = {
  mooBtn,
  mooChoose,
  mooCheckbox,
  mooCondition,
  mooDate,
  mooDatepicker,
  mooFile,
  mooLoading,
  mooMeasure,
  mooInput,
  mooPaging,
  mooRadio,
  mooSelect,
  mooShowcase,
  mooTable,
  mooToast,
  mooTree,
  mooImg,
  mooPop,
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
