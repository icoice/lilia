import arrayFilter from './arrayFilter';
import arrayPile from './arrayPile';
import arrayToJson from './arrayToJson';
import assign from './assign';
import contain from './contain';
import copyToClipboard from './copyToClipboard';
import createTree from './createTree';
import consoleWin from './consoleWin';
import dateFormat from './dateFormat';
import decideType, { JUDGE } from './decideType';
import def from './def';
import device from './device';
import empty from './empty';
import equal from './equal';
import externalStyle from './externalStyle';
import file from './file';
import firstUppercase from './firstUppercase';
import hash from './hash';
import htmlCollectionToArray from './htmlCollectionToArray';
import jsonToArray from './jsonToArray';
import image from './image';
import imageCompress from './imageCompress';
import importScript from './importScript';
import locationSearchToJson from './locationSearchToJson';
import isMob from './isMob';
import loop from './loop';
import memory from './memory';
import nodeToString from './nodeToString';
import now from './now';
import or from './or';
import replaceHump from './replaceHump';
import stepByStep from './stepByStep';
import storage from './storage';
import scrollEnd from './scrollEnd';
import scrollRecord from './scrollRecord';
import timestamp from './timestamp';
import webpSupport from './webpSupport';
import week from './week';

export const eq = equal;

export {
  JUDGE,
  arrayFilter,
  arrayPile,
  arrayToJson,
  assign,
  contain,
  copyToClipboard,
  createTree,
  consoleWin,
  dateFormat,
  decideType,
  def,
  device,
  empty,
  equal,
  externalStyle,
  file,
  firstUppercase,
  hash,
  htmlCollectionToArray,
  jsonToArray,
  image,
  imageCompress,
  importScript,
  isMob,
  loop,
  locationSearchToJson,
  memory,
  nodeToString,
  now,
  or,
  replaceHump,
  stepByStep,
  storage,
  scrollEnd,
  scrollRecord,
  timestamp,
  webpSupport,
  week,
};

export default {
  ...device,
  ...file,
  ...image,

  JUDGE,
  arrayFilter,
  arrayPile,
  arrayToJson,
  contain,
  copyToClipboard,
  createTree,
  consoleWin,
  dateFormat,
  decideType,
  def,
  empty,
  eq: equal,
  equal,
  externalStyle,
  firstUppercase,
  hash,
  htmlCollectionToArray,
  locationSearchToJson,
  jsonToArray,
  imageCompress,
  importScript,
  isMob,
  loop,
  memory,
  nodeToString,
  now,
  or,
  replaceHump,
  stepByStep,
  storage,
  scrollEnd,
  scrollRecord,
  timestamp,
  webpSupport,
  week,
};
