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

const BASE_64 = file => new Promise((reslove) => {
  if (!(file instanceof File)) return;

  const b64 = new FileReader();

  b64.onloadend = () => reslove(b64.result);

  b64.readAsDataURL(file);
});

const loadImage = (src) => device.browser(() => {
  const img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');

  img.src = src;
  img.onload = e => reslove(DOM_BE_64(img, scale));
});

export default (pic, scale = 1) => (new Promise((reslove) => {
  if (pic instanceof File) {
    return BASE_64(pic).then(b64 => loadImage(b64));
  }

  if (pic !== null && typeof pic === 'object' && typeof pic.nodeType === 'number') {
    return reslove(DOM_BE_64(img, scale));
  }

  if (typeof pic === 'string') {
    return BASE_64(pic);
  }
}));
