// 基础组件
import button from './base/button';
import checkbox from './base/checkbox';
import file from './base/file';
import loading from './base/loading';
import image from './base/image';
import input from './base/input';
import radio from './base/radio';
import select from './base/select';
import toast from './base/toast';

// 特例组件
import choose from './instance/choose';
import condition from './instance/condition';
import datepicker from './instance/datepicker';
import datepickerMobile from './instance/datepickerMobile';
import table from './instance/table';
import time from './instance/time';
import tree from './instance/tree';
import type from './instance/type';
import timeZones from './instance/timeZones';
import pop from './instance/pop';
import paging from './instance/paging';
import measure from './instance/measure';
import showcase from './instance/showcase';

// 组件一列
export const liliaBtn = button;
export const liliaCheckbox = checkbox;
export const liliaChoose = choose;
export const liliaCondition = condition;
export const liliaDatepicker = datepicker;
export const liliaDatepickerMobile = datepickerMobile;
export const liliaFile = file;
export const liliaLoading = loading;
export const liliaMeasure = measure;
export const liliaPaging = paging;
export const liliaInput = input;
export const liliaImg = image;
export const liliaRadio = radio;
export const liliaSelect = select;
export const liliaShowcase = showcase;
export const liliaTime = time;
export const liliaToast = toast;
export const liliaTable = table;
export const liliaTimeZones = timeZones;
export const liliaTree = tree;
export const liliaType = type;
export const liliaPop = pop;

const component = {
  liliaBtn,
  liliaChoose,
  liliaCheckbox,
  liliaCondition,
  liliaDatepicker,
  liliaDatepickerMobile,
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
  liliaTimeZones,
  liliaTree,
  liliaType,
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
