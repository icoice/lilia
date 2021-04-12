const state = {
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
  exception() {},
};

export default (n, v, exception = () => {}) => {
  state.exception = exception;

  if (typeof v !== 'undefined') {
    state.set(n, v);

    return v;
  } else {
    return state.get(n);
  }
};
