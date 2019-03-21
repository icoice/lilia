import arrayPile from './arrayPile';
import hash from './hash';
import decideType from './decideType';
import device from './device';
import isMob from './isMob';
import image from './image';
import file from './file';

export default {
  arrayPile,
  hash,
  isMob,
  decideType,
  ...device,
  ...image,
  ...file,
};
