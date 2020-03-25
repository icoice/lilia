import Request, { requestPack } from './request';
import Vue, { BuildStore } from './vue';

window.LILIA_DRIVE_PACK = {
  BuildStore,
  Request,
  Vue,
  requestPack,
};

export {
  BuildStore,
  Request,
  Vue,
  requestPack,
};

export default window.LILIA_DRIVE_PACK;
