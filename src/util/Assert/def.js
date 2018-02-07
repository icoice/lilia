import hasEmpty from './hasEmpty';

export default (val, defVal) => (hasEmpty(val) ? defVal : val);
