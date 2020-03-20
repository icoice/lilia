export default () => {
  const { hash } = location;
  const paramSupCode = hash.indexOf('?');
  const pathSupCode = hash.indexOf('/');
  let path = hash.substr(pathSupCode + 1, hash.length);
  let params = '';
  let hashParams = [];

  if (paramSupCode >= 0) {
    path = hash.substr(pathSupCode + 1, paramSupCode - 2);
    params = hash.substr(paramSupCode + 1, hash.length);
    hashParams = params.split('&').map((express) => {
      const expressArr = express.split('=');

      return {
        key: expressArr[0],
        value: expressArr[1],
      };
    });
  }

  return {
    path,
    params: hashParams,
  };
};
