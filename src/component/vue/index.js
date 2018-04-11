// 基础组件
import button from './parts/common/button';
import checkbox from './parts/common/checkbox';
import file from './parts/common/file';
import loading from './parts/common/loading';
import memo from './parts/common/memo';
import image from './parts/common/image';
import input from './parts/common/input';
import radio from './parts/common/radio';
import select from './parts/common/select';
import toast from './parts/common/toast';
// 特例组件
import measure from './parts/instance/measure';
import date from './parts/instance/date';
import datepicker from './parts/instance/datepicker';
import table from './parts/instance/table';
import tree from './parts/instance/tree';
import condition from './parts/instance/condition';
import showcase from './parts/instance/showcase';
import paging from './parts/instance/paging';
import multipleChoose from './parts/instance/multipleChoose';
import louver from './parts/instance/louver';

export const mooBtn = button;
export const mooCheckbox = checkbox;
export const mooCondition = condition;
export const mooDate = date;
export const mooDatepicker = datepicker;
export const mooFile = file;
export const mooLoading = loading;
export const mooInput = input;
export const mooPaging = paging;
export const mooRadio = radio;
export const mooSelect = select;
export const mooShowcase = showcase;
export const mooToast = toast;
export const mooTable = table;
export const mooMemo = memo;
export const mooLouver = louver;
export const mooMultipleChoose = multipleChoose;
export const mooMeasure = measure;
export const mooImg = image;
export const mooTree = tree;

const component = {
  mooBtn,
  mooCheckbox,
  mooCondition,
  mooDate,
  mooDatepicker,
  mooFile,
  mooLoading,
  mooInput,
  mooPaging,
  mooRadio,
  mooSelect,
  mooShowcase,
  mooTable,
  mooToast,
  mooTree,
  mooMemo,
  mooMeasure,
  mooMultipleChoose,
  mooImg,
  mooMeasure,
  mooLouver,
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
