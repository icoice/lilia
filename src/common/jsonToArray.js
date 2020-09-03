export default (json) => {
  if (typeof json !== 'object' || !json) {
    return json;
  }

  const keys = Object.keys(json);
  const list = [];

  keys.map((key) => {
    list.push(json[key]);

    return key;
  });

  return list;
}