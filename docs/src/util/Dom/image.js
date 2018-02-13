import Assert from '../Assert';
import Device from '../Device';
import File from '../File';

export default {
  base64(img, scale, cb) {
    Device.type.browser(() => {
      const canvas = document.createElement('canvas');
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      const ctx = canvas.getContext('2d');
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);
      ctx.drawImage(img, 0, 0, width, height);
      if (Assert.hasFunc(cb)) cb(canvas.toDataURL());
    });
  },
  create(src, cb) {
    return Device.type.browser(() => {
      if (Assert.hasFunc(cb)) return null;
      const img = new Image();
      img.src = src;
      img.onload = e => cb(img);
    });
  },
  zoom(img, scale = 1) {
    const { create, express, base64 } = this;
    return new Promise((reslove) => {
      const e = i => express(i, scale, b64 => reslove(b64));
      if (Assert.hasFile(img)) {
        File.base64(img, b64 => create(b64, i => e(i)));
      } else if (Assert.hasStr(img)) {
        create(img, e(i));
      } else {
        e(i);
      }
    });
  },
};
