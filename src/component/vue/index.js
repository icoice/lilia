import { loop } from '../../common';
import liliaButton from './button';
import liliaConfirm from './confirm';
import liliaDrift from './drift';
import liliaDatepicker from './datepicker';
import liliaImage from './image';
import liliaInput from './input';
import liliaLoading from './loading';
import liliaPageReference from './pageReference';
import liliaPop from './pop';
import liliaPulldown from './pulldown';
import liliaToast from './toast';
import liliaTable from './table';
import liliaUploadFile from './uploadFile';

const components = {
  liliaButton,
  liliaConfirm,
  liliaDatepicker,
  liliaDrift,
  liliaImage,
  liliaInput,
  liliaLoading,
  liliaPageReference,
  liliaPop,
  liliaPulldown,
  liliaTable,
  liliaToast,
  liliaUploadFile,
};

export {
  liliaButton,
  liliaConfirm,
  liliaDatepicker,
  liliaDrift,
  liliaImage,
  liliaInput,
  liliaLoading,
  liliaPageReference,
  liliaPop,
  liliaPulldown,
  liliaTable,
  liliaToast,
  liliaUploadFile,
};

export default {
  ...components,

  register(Vue) {
    const componentList = {};

    loop(components, (c, n) => {
      componentList[n] = Vue.component(n, c);
    });

    return componentList;
  },
};
