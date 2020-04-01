import arrayPile from './arrayPile';
import arrayToJson from './arrayToJson';
import assign from './assign';
import copyToClipboard from './copyToClipboard';
import dateFormat from './dateFormat';
import decideType, { JUDGE } from './decideType';
import def from './def';
import device from './device';
import empty from './empty';
import equal from './equal';
import file from './file';
import firstUppercase from './firstUppercase';
import hash from './hash';
import image from './image';
import imageCompress from './imageCompress';
import isMob from './isMob';
import loop from './loop';
import memory from './memory';
import nodeToString from './nodeToString';
import now from './now';
import or from './or';
import replaceHump from './replaceHump';
import stepByStep from './stepByStep';
import storage from './storage';
import timestamp from './timestamp';
import webpSupport from './webpSupport';
import week from './week';

export const eq = equal;

export {
  JUDGE,
  arrayPile,
  arrayToJson,
  assign,
  copyToClipboard,
  dateFormat,
  decideType,
  def,
  device,
  empty,
  equal,
  file,
  firstUppercase,
  hash,
  image,
  imageCompress,
  isMob,
  loop,
  memory,
  nodeToString,
  now,
  or,
  replaceHump,
  stepByStep,
  storage,
  timestamp,
  webpSupport,
  week,
};

export default {
  ...device,
  ...file,
  ...image,
  JUDGE,
  arrayPile,
  arrayToJson,
  copyToClipboard,
  dateFormat,
  decideType,
  def,
  empty,
  eq: equal,
  equal,
  firstUppercase,
  hash,
  imageCompress,
  isMob,
  loop,
  memory,
  nodeToString,
  now,
  or,
  replaceHump,
  stepByStep,
  storage,
  timestamp,
  webpSupport,
  week,
};
