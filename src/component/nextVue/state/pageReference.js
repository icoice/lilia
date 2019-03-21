import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'pageReference',
    status: [
      'change',
    ],
    events: {
      UPLOAD_FILE_CHANGE: 'change',
    },
  });

  // 定义事件过渡
  state.defineFlow('change', 'UPLOAD_FILE_CHANGE');

  return state;
};
