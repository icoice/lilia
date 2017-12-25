// 基础组件
import button from './parts/common/button';
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
import table from './parts/instance/table';
import confirm from './parts/instance/confirm';
import condition from './parts/instance/condition';
import showcase from './parts/instance/showcase';
import tree from './parts/instance/tree';
import category from './parts/instance/category';
import paging from './parts/instance/paging';
import multipleChoose from './parts/instance/multipleChoose';
import louver from './parts/instance/louver';

export const vpFile = file;
export const vpLoading = loading;
export const vpRadio = radio;
export const vpToast = toast;
export const vpMemo = memo;
export const vpScroller = scoller;
export const vpConfirm = confirm;
export const vpShowcase = showcase;
export const vpTree = tree;
export const vpCategory = category;
export const vpPaging = paging;
export const vpMultipleChoose = multipleChoose;
export const vpImage = image;
export const vmButton = button;
export const vmTable = table;
export const vmLouver = louver;
export const vmInput = input;
export const vmSelect = select;
export const vmCondition = condition;

const components = {
  vmInput,
  vmSelect,
  vmLouver,
  vmTable,
  vmCondition,
  vmButton,
  vpMemo,
  vpFile,
  vpImage,
  vpLoading,
  vpRadio,
  vpToast,
  vpPaging,
  vpScroller,
  vpConfirm,
  vpShowcase,
  vpCategory,
  vpMultipleChoose,
  vpTree,
};

export const register = function register(Vue) {
  Object.entries(components).map((kv) => {
    const [name, component] = kv;
    Vue.component(name, component);
    return kv;
  });
};

export default {
  components,
  register,
};
