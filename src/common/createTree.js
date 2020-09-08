// 根据id和parentId创建树, 基于Javascript对象引用的特性制作，无论有多少的节点，也是第二遍遍历完成树形结构的数据
export default function createTree(list = [], tree = null) {
  const mapList = {};
  let treeTemp = tree;

  list.map((item) => {
    const nextItem = item;

    nextItem.children = !nextItem.children ? {} : nextItem.children;
    mapList[item.id] = nextItem;

    return item;
  });

  // step.1 扎根
  if (treeTemp === null) {
    treeTemp = {};

    list.map((item) => {
      if (item.parentId === null) {
        treeTemp[item.id] = mapList[item.id];
      }

      return item;
    });

    return createTree(list, treeTemp);
  }

  // step.2 生长
  list.map((item) => {
    const parent = mapList[item.parentId];

    if (item.parentId === null) return item;

    if(parent) {
      parent.children[item.id] = item;
    }

    return item;
  });

  return treeTemp;
}