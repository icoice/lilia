const alpha = 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==';
const animation = 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA';
const lossless = 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
const lossy = 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

export default (feature) => {
  const img = new Image();

  return new Promise((reslove, reject) => {
    const codes = { lossy, lossless, alpha, animation };
    const mediaType = 'data:image/webp;base64';

    img.onload = () => {
      reslove(img.width > 0 || img.height > 0);
    };

    img.onerror = () => {
      reslove(false);
    };

    img.src = `${mediaType},${codes[feature]}`;
  });
}
