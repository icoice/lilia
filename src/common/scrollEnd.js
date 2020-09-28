export default (target, callback = () => {}) => {
  let timer;

  return target.addEventListener('scroll', (e) => {
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      callback(e);
    }, 100);
  });
};