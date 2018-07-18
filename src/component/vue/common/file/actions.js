const methods = {
  mb: size => (size / 1024 / 1024).toFixed(2),
  getFiles() {
    const { fileUpload } = this.$refs;
    const files = [];
    for (let i = 0; i < fileUpload.files.length; i += 1) {
      const file = fileUpload.files[i];
      files.push(file);
    }
    this.m$Files = files;
    this.$emit('change', files);
    this.$emit('selected', files);
  },
  verifyFileExtend(name) {
    const { m$Limit } = this;
    if (!m$Limit) return true;
    const rules = new RegExp(`^.*?\\.(${m$Limit.replace(/,/g, '|')})`);
    const result = rules.test(name);
    this.$emit('verify', result);
    return result;
  },
};

export default {
  methods,
};
