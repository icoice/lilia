import device from './device';

export const checkWebp = (feature) => {
  const img = new Image();

  return new Promise((reslove, reject) => {
    const types = {
      lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
      lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
      alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
      animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
    };

    img.onload = () => {
      if (img.width > 0 || img.height > 0) {
        reslove(true);
      } else {
        reject(false);
      }
    };

    img.onerror = () => {
      reject(false);
    };

    img.src = `data:image/webp;base64,${types[feature]}`;
  });
}

export const imageCanvas = (src, width, height) => device.browser(() => {
  const img = new Image();

  return new Promise((reslove) => {
    img.setAttribute('crossOrigin', 'anonymous');
    img.style.width = `${width}px`;
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.setAttribute('width', width || img.naturalWidth);
      canvas.setAttribute('height', height || img.naturalHeight);
      ctx.drawImage(img, 0, 0);

      reslove(canvas);
    };
  });
});

export const domToBase64 = (img, scale) => device.browser(() => {
  const canvas = document.createElement('canvas');
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  const ctx = canvas.getContext('2d');

  canvas.setAttribute('width', w);
  canvas.setAttribute('height', h);
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL();
});

export const toBase64 = (file) => new Promise((reslove) => {
  if (file instanceof File) {
    const base64 = new FileReader();

    base64.onloadend = () => {
      reslove(base64.result);
    };

    base64.readAsDataURL(file);
  }
});

export const zoom64 = (pic, scale = 1) => new Promise((reslove) => {
  const toDomLoad = (src) => device.browser(() => {
    const img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;
    img.onload = e => reslove(domToBase64(img, scale));
  });

  if (pic instanceof File) {
    // 文件对象
    toBase64(pic).then(b64 => toDomLoad(b64));
  } else if (pic !== null && typeof pic === 'object' && typeof pic.nodeType === 'number') {
    // dom对象
    reslove(domToBase64(img, scale));
  } else if (typeof pic === 'string') {
    // 链接字符
    toDomLoad(pic);
  }
});

export const getRealMimeType = reader => {
   const arr = (new Uint8Array(reader.result)).subarray(0, 4);
   let realMimeType;
   let header = '';

   for (var i = 0; i < arr.length; i++) {
     header += arr[i].toString(16);
   }

   // magic numbers: http://www.garykessler.net/library/file_sigs.html
   switch (header) {
     case "89504e47":
       realMimeType = "image/png";
       break;
     case "47494638":
       realMimeType = "image/gif";
       break;
     case "ffd8ffDB":
     case "ffd8ffe0":
     case "ffd8ffe1":
     case "ffd8ffe2":
     case "ffd8ffe3":
     case "ffd8ffe8":
       realMimeType = "image/jpeg";
       break;
     default:
       realMimeType = "unknown"; // Or you can use the blob.type as fallback
       break;
   }

   return realMimeType;
};


export default {
  checkWebp,
  imageCanvas,
  domToBase64,
  toBase64,
  zoom64,
  getRealMimeType,
}
