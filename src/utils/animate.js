// animate.css的控制
export default function animate(name, target, type) {
  clearTimeout(animate.sid);

  const dom = target;
  const domClass = dom.className.split(' ');

  if (domClass.indexOf('animated') < 0) domClass.push('animated');
  if (type === 'quickly' && domClass.indexOf('animated-quickly') < 0) domClass.push('animated-quickly');

  if (domClass.indexOf(name) < 0) {
    domClass.push(name);
    dom.className = domClass.join(' ');
  } else {
    const newClass = [];

    domClass.map((cn) => {
      if (cn !== name) newClass.push(cn);
      return cn;
    });

    dom.className = newClass.join(' ');
    animate.sid = setTimeout(() => animate(name, target), 10);
  }
};
