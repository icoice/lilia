import Assert from '../Assert';

export default (start, end = new Date()) => {
  let t, e;

  if (Assert.hasStr(start)) {
    t = new Date(start);
  } else if (Assert.hasDate(start)) {
    t = start;
  } else {
    return null;
  }

  if (Assert.hasStr(end)) {
    e = new Date(end);
  } else if (Assert.hasDate(end)) {
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
