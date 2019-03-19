import hash from './hash';
import decideType from './decideType';
import device from './device';
import isMob from './isMob';
import image from './image';

export default {
  hash,
  decideType,
  ...device,
  isMob,
  ...image,
};
