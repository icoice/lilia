import arrayPile from './arrayPile';
import hash from './hash';
import decideType from './decideType';
import device from './device';
import isMob from './isMob';
import image from './image';
import file from './file';
import memory from './memory';
import empty from './empty';
import storage from './storage';

export default {
  arrayPile,
  decideType,
  ...device,
  ...file,
  hash,
  empty,
  ...image,
  isMob,
  memory,
  storage,
};
