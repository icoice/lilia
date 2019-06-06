import arrayPile from './arrayPile';
import copyToClipboard from './copyToClipboard';
import hash from './hash';
import decideType from './decideType';
import device from './device';
import dateFormat from './dateFormat';
import isMob from './isMob';
import image from './image';
import file from './file';
import memory from './memory';
import empty from './empty';
import storage from './storage';
import firstUppercase from './firstUppercase';
import timestamp from './timestamp';
import week from './week';
import now from './now';

export default {
  arrayPile,
  copyToClipboard,
  decideType,
  dateFormat,
  ...device,
  ...file,
  hash,
  empty,
  ...image,
  isMob,
  memory,
  storage,
  firstUppercase,
  timestamp,
  week,
  now,
};
