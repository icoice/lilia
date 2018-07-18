'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var methods = {
  mb: function mb(size) {
    return (size / 1024 / 1024).toFixed(2);
  },
  getFiles: function getFiles() {
    var fileUpload = this.$refs.fileUpload;

    var files = [];
    for (var i = 0; i < fileUpload.files.length; i += 1) {
      var file = fileUpload.files[i];
      files.push(file);
    }
    this.m$Files = files;
    this.$emit('change', files);
    this.$emit('selected', files);
  },
  verifyFileExtend: function verifyFileExtend(name) {
    var m$Limit = this.m$Limit;

    if (!m$Limit) return true;
    var rules = new RegExp('^.*?\\.(' + m$Limit.replace(/,/g, '|') + ')');
    var result = rules.test(name);
    this.$emit('verify', result);
    return result;
  }
};

exports.default = {
  methods: methods
};