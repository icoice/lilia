export default (express, d = null) => {
  let z, t, e;

  if (typeof d === 'object' && d !== null && !(d instanceof Date)) {
    z = `${d.year}/${d.month}/${d.day}`;
  } else {
    z = d;
  }

  if (z instanceof Date) {
    t = d;
  } else if (typeof z === 'number' || typeof z === 'string') {
    t = new Date(z);
  } else {
    t = new Date();
  }

  const Y = t.getFullYear();
  const M = t.getMonth() + 1;
  const D = t.getDate();
  const H = t.getHours();
  const I = t.getMinuters();
  const S = t.getSeconds();

  // YYYY-MM-DD, YY-MM-DD
  e = express;
  e = e.replace(/YYYY/g, Y);
  e = e.replace(/YY/g, Y.toString().substr(2, 4));
  e = e.replace(/MM/g, M < 10 ? `0${M}` : M);
  e = e.replace(/M/g, M);
  e = e.replace(/DD/g, D < 10 ? `0${D}` : D);
  e = e.replace(/D/g, D);
  e = e.replace(/HH/g, H < 10 ? `0${H}` : H);
  e = e.replace(/H/g, H);
  e = e.replace(/II/g, I < 10 ? `0${I}` : I);
  e = e.replace(/I/g, I);
  e = e.replace(/SS/g, S < 10 ? `0${S}` : S);
  e = e.replace(/S/g, S);

  return e;
};
