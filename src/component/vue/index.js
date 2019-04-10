// 基础组件
import button from '../nextVue/button';
import confirm from '../nextVue/confirm';
import pulldown from '../nextVue/pulldown';
import input from '../nextVue/input';
import loading from '../nextVue/loading';
import tab from '../nextVue/tab';
import image from '../nextVue/image';
import uploadFile from '../nextVue/uploadFile';
import pageReference from '../nextVue/pageReference';
import datepicker from '../nextVue/datepicker';

// import button from './base/button';
import checkbox from './base/checkbox';
import file from './base/file';
// import loading from './base/loading';
// import image from './base/image';
// import input from './base/input';
import radio from './base/radio';
import select from './base/select';
import toast from './base/toast';

// 特例组件
import choose from './instance/choose';
import condition from './instance/condition';
// import datepicker from './instance/datepicker';
import datepickerMobile from './instance/datepickerMobile';
import latticeCell from './instance/latticeCell';
import selfAdaptiveBox from './instance/selfAdaptiveBox';
// import table from './instance/table';
import time from './instance/time';
import tree from './instance/tree';
import type from './instance/type';
import timeZones from './instance/timeZones';
import pop from './instance/pop';
import paging from './instance/paging';
import measure from './instance/measure';

// 组件一列
export const liliaButton = button;
export const liliaConfirm = confirm;
export const liliaDatepicker = datepicker;
export const liliaPulldown = pulldown;
export const liliaInput = input;
export const liliaLoading = loading;
export const liliaTab = tab;
export const liliaImage = image;
export const liliaUploadFile = uploadFile;
export const liliaPageReference = pageReference;

// export const liliaTable = table;
export const liliaCheckbox = checkbox;
export const liliaChoose = choose;
export const liliaCondition = condition;
export const liliaDatepickerMobile = datepickerMobile;
export const liliaFile = file;
export const liliaLatticeCell = latticeCell;
export const liliaMeasure = measure;
export const liliaPaging = paging;
// export const liliaImg = image;
export const liliaRadio = radio;
export const liliaSelect = select;
export const liliaSelfAdaptiveBox = selfAdaptiveBox;
export const liliaTime = time;
export const liliaToast = toast;
export const liliaTimeZones = timeZones;
export const liliaTree = tree;
export const liliaType = type;
export const liliaPop = pop;

const component = {
  liliaButton,
  liliaPulldown,
  liliaInput,
  liliaLoading,
  liliaTab,
  liliaConfirm,
  liliaImage,
  liliaUploadFile,
  liliaPageReference,
  liliaDatepicker,

  // liliaTable,
  liliaChoose,
  liliaCheckbox,
  liliaCondition,
  // liliaDatepicker,
  liliaDatepickerMobile,
  liliaFile,
  liliaLatticeCell,
  // liliaLoading,
  liliaMeasure,
  liliaPaging,
  liliaRadio,
  liliaSelect,
  liliaSelfAdaptiveBox,
  liliaToast,
  liliaTimeZones,
  liliaTree,
  liliaType,
  // liliaImg,
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
