export default (text) => {
  const aux = document.createElement('input');

  aux.style.position = 'fixed';
  aux.style.zIndex = -999999;
  aux.style.top = '-99999px';
  aux.style.left = '-99999px';
  aux.style.border = 'none';
  aux.style.backgroundColor = 'transparent';
  aux.style.color = 'transparent';

  aux.value = text;
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
};
