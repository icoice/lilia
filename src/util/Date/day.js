export default (start, end = new Date()) => {
  let t, e;

  if (typeof start === 'string') {
    t = new Date(start);
  } else if (start instanceof Date) {
    t = start;
  } else {
    return null;
  }

  if (typeof end === 'string') {
    e = new Date(end);
  } else if (end instanceof Date) {
    e = end;
  } else {
    return null;
  }

  e = e.getTime();

  const s = t.getTime();
  const space = Math.abs(e - s);
  const sec = space / 1000;
  const min = sec / 60;
  const hour = min / 60;

  return Math.ceil(hour / 24);
}
