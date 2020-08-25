import device from './device';
import { JUDGE } from './decideType';

// 通过canvas绘制image类dom对象，再导出成base64字符串
const DOM_BE_64 = (img, scale) => {
  const canvas = document.createElement('canvas');
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  const ctx = canvas.getContext('2d');

  canvas.setAttribute('width', w);
  canvas.setAttribute('height', h);
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL();
};

// 图片file对象转换成base64字符串
const BASE_64 = file => new Promise((resolve) => {
  if (JUDGE.NO_FIL(file)) return;

  const b64 = new FileReader();

  b64.onloadend = () => resolve(b64.result);

  b64.readAsDataURL(file);
});

// 通过image类获得图片file对象，再转换成base64字符串，同时用来进行尺寸压缩
const loadImage = (src, scale) => (new Promise((resolve, reject) => {
  device.browser(() => {
    const img = new Image();
  
    img.setAttribute('crossOrigin', 'anonymous');
  
    img.onload = e => resolve(DOM_BE_64(img, scale));
    img.onerror = e => reject('Image load has error');
    img.src = src;
  })
}));

export default (pic, scale = 1) => {
  // pic为图像文件时
  if (JUDGE.IS_IMG(pic)) {
    return BASE_64(pic).then(b64 => loadImage(b64, scale));
  }

  // pic为dom对象时
  if (JUDGE.IS_DOM(pic)) {
    return new Promise(resolve => resolve(DOM_BE_64(img, scale)));
  }

  // pic为图像链接地址时
  if (JUDGE.IS_STR(pic)) {
    return loadImage(pic, scale);
  }

  return new Promise(resolve => resolve(pic));
};
