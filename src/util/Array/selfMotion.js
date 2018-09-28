export default (arr = []) => {
  const contactMap = {};
  const tree = {};
  const root = [];

  const deepContactNet = list => list.map((node) => {
    if (node.$CHILDREN) {
      node.children = node.$CHILDREN.map((id) => {
        const item = tree[id];
        if (item.$CHILDREN) {
          item.children = deepContactNet(item.$CHILDREN.map(childId => tree[childId]));
        }
        return item;
      });
    }
    return tree[node.id];
  });

  arr.map((item) => {
    contactMap[item.id] = Object.assign({}, item);
  });

  Object.entries(contactMap).map((kv) => {
    const [ ,item] = kv;

    item.$CHILDREN = !item.$CHILDREN ? [] : item.$CHILDREN;

    if(typeof item.parentId === 'string' || typeof item.parentId === 'number') {
      const parent = contactMap[item.parentId];
      parent.$CHILDREN = !parent.$CHILDREN ? [] : parent.$CHILDREN;
      parent.$CHILDREN.push(item.id);
    } else {
      root.push(item);
    }

    tree[item.id] = item;

    return kv;
  });

  return deepContactNet(root);
};
