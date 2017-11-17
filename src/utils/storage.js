export default {
  set(name, value) {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch(e) {
      this.exception(e);
    }
  },
  get(name) {
    try {
      const data = localStorage.getItem(name);
      return data !== null ? JSON.parse(data) : data;
    } catch(e) {
     this.exception(e);
    }
  },
  exception: () => {},
};
