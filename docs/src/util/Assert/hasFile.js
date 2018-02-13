export default obj => obj instanceof File || obj.toString().indexOf('File') >= 0;
