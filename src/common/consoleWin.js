/* 用于移动端远程调试看不到日志的问题 */
let log = null;
let logStatus = 'block';

function consoleContent(message) {
  return `
  <div style='margin: 1rem .5rem 0 .5rem; background-color: #666; padding: 10px'>
    ${message}
  </div>`;
}

function consoleWin(message) {
  if (log) {
    log.style.display = 'block';
    log.innerHTML = log.innerHTML + consoleContent(message);

    return log;
  }

  log = document.createElement('div');
  log.innerHTML = consoleContent(message);
  log.style.position = 'fixed';
  log.style.zIndex = '999999999';
  log.style.top = 0;
  log.style.left = 0;
  log.style.width = '100%';
  log.style.height = '250px';
  log.style.backgroundColor = '#000';
  log.style.color = '#fff';
  log.style.display = logStatus;
  log.style.fontSize = '12px';
  log.style.overflowY = 'scroll';
  log.onclick = () => {
    log.style.display = logStatus === 'block' ? 'none' : 'block';
    logStatus = log.style.display;
  };

  document.body.appendChild(log);
}

window.console_win = consoleWin;

export default consoleWin;