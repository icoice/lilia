let timeoutID = null;

const methods = {
  open() {
    this.m$Show = true;
    this.$emit('onoff', true);
  },
  close() {
    this.m$Show = false;
    this.$emit('onoff', false);
  },
  sandClock() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      if (this.m$Show) this.close();
    }, this.m$Timeout);
  },
};

export default {
  methods,
};
