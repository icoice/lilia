export default function formatTime(express, date = null) {
  const setter = typeof date === 'object' && date !== null ? `${date.year}/${date.month}/${date.day}` : date;
  const timer = typeof setter === 'number' || typeof setter === 'string' ? new Date(setter) : new Date();

  const YYYY = timer.getFullYear();
  const M = timer.getMonth() + 1;
  const D = timer.getDate();
  let dateExporess = express;

  dateExporess = dateExporess.replace(/YYYY/g, YYYY);
  dateExporess = dateExporess.replace(/YY/g, YYYY.toString().substr(2, 4));
  dateExporess = dateExporess.replace(/MM/g, M < 10 ? `0${M}` : M);
  dateExporess = dateExporess.replace(/M/g, M);
  dateExporess = dateExporess.replace(/DD/g, D < 10 ? `0${D}` : D);
  dateExporess = dateExporess.replace(/D/g, D < 10 ? `0${D}` : D);

  return dateExporess;
};
