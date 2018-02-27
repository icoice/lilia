// 基础组件
import button from './parts/common/button';
import checkbox from './parts/common/checkbox';
import file from './parts/common/file';
import loading from './parts/common/loading';
import radio from './parts/common/radio';
import toast from './parts/common/toast';
import memo from './parts/common/memo';
import scoller from './parts/common/scroller';
import image from './parts/common/image';
import select from './parts/common/select';
import input from './parts/common/input';

// 特例组件
import measure from './parts/instance/measure';
import date from './parts/instance/date';
import table from './parts/instance/table';
import confirm from './parts/instance/confirm';
import condition from './parts/instance/condition';
import showcase from './parts/instance/showcase';
import tree from './parts/instance/tree';
import category from './parts/instance/category';
import paging from './parts/instance/paging';
import multipleChoose from './parts/instance/multipleChoose';
import louver from './parts/instance/louver';

export const mooBtn = button;
export const mooCheckbox = checkbox;
export const mooInput = input;
export const mooRadio = radio;
export const mooFile = file;
export const mooCondition = condition;
export const mooSelect = select;
export const mooDate = date;

export const vpToast = toast;
export const vpMemo = memo;
export const vpScroller = scoller;
export const vpConfirm = confirm;``
export const vpShowcase = showcase;
export const vpTree = tree;
export const vpCategory = category;
export const vpMultipleChoose = multipleChoose;
export const vmMeasure = measure;
export const vmImage = image;
export const vmLoading = loading;
export const vmPaging = paging;
export const vmBtn = button;
export const vmTable = table;
export const vmLouver = louver;
export const vmShowcase = showcase;

const component = {
  mooBtn,
  mooCheckbox,
  mooCondition,
  mooFile,
  mooRadio,
  mooInput,
  mooSelect,
  mooDate,

  vmLouver,
  vmTable,
  vmPaging,
  vmShowcase,
  vmLoading,
  vmImage,
  vmMeasure,
  vpMemo,
  vpToast,
  vpScroller,
  vpConfirm,
  vpShowcase,
  vpCategory,
  vpMultipleChoose,
  vpTree,
};

export const register = function register(Vue) {
  Object.entries(component).map((kv) => {
    const [n, c] = kv;
    Vue.component(n, c);
    return kv;
  });
};

export default {
  ...component,
  register,
};
