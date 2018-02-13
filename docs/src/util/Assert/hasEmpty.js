// 判断变量是否为空值
export default function hasEmpty(word) {
  return word === '' ||
  word === null ||
  JSON.stringify(word) === '{}' ||
  JSON.stringify(word) === '[]' ||
  typeof word === 'undefined';
}
