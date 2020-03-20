import device from './device';

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
  imageCanvas,
  getRealMimeType,
}
