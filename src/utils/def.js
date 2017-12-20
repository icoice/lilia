import hasEmpty from './hasEmpty';

export default (val, defVal) => {
  return hasEmpty(val) ? defVal : val;
}
