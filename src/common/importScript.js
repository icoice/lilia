const { importScripts } = window;

if(!importScripts){
  /* javascript原始的import定义和使用，基于eval进行 */
  window.importScripts = (function (globalEval) {
    const xhr = new XMLHttpRequest;

    return () => {
      const args = Array.prototype.slice.call(arguments);
      let meta;
      let data;
      let content;

      args.map((data, i) => {
        let nextData = data;

        if(data.substr(0, 5).toLowerCase() === 'data:'){
          content = nextData.indexOf(',');
          meta = nextData.substr(5, content).toLowerCase();
          nextData = decodeURIComponent(nextData.substr(content + 1));

          if(/;\s*base64\s*[;,]/.test(meta)) {
            nextData = atob(nextData);
          }

          if(/;\s*charset=[uU][tT][fF]-?8\s*[;,]/.test(meta)) {
            nextData = decodeURIComponent(escape(nextData));
          }
        } else {
          xhr.open('GET', data, false);
          xhr.send(null);

          nextData = xhr.responseText;
        }

        globalEval(nextData);

        return data;
      });
    };
  }(eval));
}

export default window.importScripts;
