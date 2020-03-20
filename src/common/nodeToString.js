export default (node) => {
  let tmp = document.createElement( "div" );

  tmp.appendChild(node.cloneNode(true));

  const str = tmp.innerHTML;

  tmp = null;
  node = null;

  return str;
};
