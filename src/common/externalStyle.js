export default (elem, attrName) => {
  const { defaultView } = document;
  const { currentStyle } = elem;

  if (currentStyle) {
    return currentStyle[attrName]
  }

  return defaultView.getComputedStyle(node)[attrName];
};
