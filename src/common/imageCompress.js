import device from './device';

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

const BASE_64 = file => new Promise((resolve) => {
  if (!(file instanceof File)) return;

  const b64 = new FileReader();

  b64.onloadend = () => resolve(b64.result);

  b64.readAsDataURL(file);
});

const loadImage = (src, scale) => (new Promise((resolve, reject) => {
  device.browser(() => {
    const img = new Image();
  
    img.setAttribute('crossOrigin', 'anonymous');
  
    img.onload = e => resolve(DOM_BE_64(img, scale));
    img.onerror = e => reject('image load error');
    img.src = src;
  })
}));

export default (pic, scale = 1) => {
  if (pic instanceof File) {
    return BASE_64(pic).then(b64 => loadImage(b64, scale));
  }

  if (pic !== null && typeof pic === 'object' && typeof pic.nodeType === 'number') {
    return new Promise(resolve => resolve(DOM_BE_64(img, scale)));
  }

  if (typeof pic === 'string') {
    return loadImage(pic, scale);
  }
};
