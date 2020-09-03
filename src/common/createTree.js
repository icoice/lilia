// 根据id和parentId创建树
export default function createTree(list, tree = {}) {
  const waitFindList = []; // 等待找到parent的children

  list.map((item) => {
    const parent = tree[item.parentId];

    if (item.parentId === null) {
      tree[item.id] = {
        ...item,
        children: {},
      };
    } else if(parent) {
      parent.children[item.id] = {
        ...item,
        children: {},
      };
    } else {
      waitFindList.push({
        ...item,
      });
    }

    return item;
  });

  if (waitFindList.length > 0) {
    return createTree(waitFindList, tree);
  }

  return tree;
};