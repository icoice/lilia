export default (file, cb) => {
  const b64 = new FileReader();
  b64.onloadend = () => (cb && cb(b64.result));
  b64.readAsDataURL(file);
}
