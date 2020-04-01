export default (group = []) => {
  for (let i = 0; i < group.length; i += 1) {
    const groupItem = group[i];

    if (groupItem.be && typeof groupItem.do === 'function') {
      return groupItem.do();
    }
  }
};
