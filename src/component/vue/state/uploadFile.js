import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'uploadFile',
    status: [
      'verifyFail',
      'change',
      'useable',
      'disabled',
    ],
    events: {
      UPLOAD_FILE_VERIFY_FAIL: 'verifyFail',
      UPLOAD_FILE_CHANGE: 'change',
      UPLOAD_FILE_USEABLE: 'useable',
      UPLOAD_FILE_DISABLED: 'disabled',
    },
  });

  // 定义事件过渡
  state.defineFlow('verifyFail', 'UPLOAD_FILE_VERIFY_FAIL');
  state.defineFlow('change', 'UPLOAD_FILE_CHANGE');
  state.defineFlow('useable', 'UPLOAD_FILE_USEABLE');
  state.defineFlow('disabled', 'UPLOAD_FILE_DISABLED');

  return state;
};
