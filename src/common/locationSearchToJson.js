export default () => {
  const { location } = window;
  const { search } = location;
  const queryParams = search.substr(1, search.length).split('&');
  const params = {};

  queryParams.map((kv) => {
    const splitCode = kv.indexOf('=');
    const key = kv.substr(0, splitCode);
    const value = kv.substr(splitCode + 1, kv.length);

    params[key] = value;
  });

  return params;
}