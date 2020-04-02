export default (elem, attrName) => {
  const { defaultView } = document;
  const { currentStyle } = elem;

  if (currentStyle) {
    return currentStyle;
  }

  return defaultView.getComputedStyle(elem);
};
