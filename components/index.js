import _vpButton from './public/common/button';
import _vpInput from './public/common/input';
import _vpFile from './public/common/file';
import _vpSelect from './public/common/select';
import _vpLoading from './public/common/loading';
import _vpRadio from './public/common/radio';
import _vpToast from './public/common/toast';
import _vpMemo from './public/common/memo';
import _vpScroller from './public/common/scroller';
import _vpImage from './public/common/image';
import _vpDataTable from './public/dataTable';
import _vpConfirm from './public/confirm';
import _vpShowcase from './public/showcase';
import _vpTree from './public/tree';
import _vpCategory from './public/category';
import _vpPaging from './public/paging';
import _vpMultipleChoose from './public/multipleChoose';
import _vpFalls from './public/falls';
import _vpDate from './public/date';
import _vpLogin from './instance/login';

export const vpLogin = _vpLogin;
export const vpButton = _vpButton;
export const vpInput = _vpInput;
export const vpFile = _vpFile;
export const vpSelect = _vpSelect;
export const vpLoading = _vpLoading;
export const vpRadio = _vpRadio;
export const vpToast = _vpToast;
export const vpMemo = _vpMemo;
export const vpScroller= _vpScroller;
export const vpDataTable = _vpDataTable;
export const vpConfirm = _vpConfirm;
export const vpShowcase = _vpShowcase;
export const vpTree = _vpTree;
export const vpCategory = _vpCategory;
export const vpPaging = _vpPaging;
export const vpMultipleChoose = _vpMultipleChoose;
export const vpFalls = _vpFalls;
export const vpDate = _vpDate;
export const vpImage = _vpImage;

const components = {
  vpButton,
  vpMemo,
  vpFile,
  vpInput,
  vpImage,
  vpSelect,
  vpLoading,
  vpRadio,
  vpToast,
  vpPaging,
  vpScroller,
  vpDataTable,
  vpDate,
  vpConfirm,
  vpShowcase,
  vpCategory,
  vpMultipleChoose,
  vpTree,
  vpFalls,
  vpLogin,
}

export const register = function register(Vue) {
 Object.entries(components).map((kv) => {
   const [name, component] = kv;
   Vue.component(name, component);
   return kv;
 });
}

const focusRegisterEvent = {};

function listenInputFocus() {
  return function ifInputFocus() {
    window.scrollTo(0, this.offsetHeight);
  }
}

export const focusEffectScroll = function focusEffectScroll() {
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i += 1) {
   const input = inputs[i];
   if (input.type === 'file') continue;
   input.removeEventListener('focus', focusRegisterEvent[i] , false);
   focusRegisterEvent[i] =  listenInputFocus().bind(input);
   input.addEventListener('focus', focusRegisterEvent[i] , false);
  }
}

export default {
  components,
  focusEffectScroll,
  register,
};
