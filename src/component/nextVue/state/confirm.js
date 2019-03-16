import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'confirm',
    status: [
      'open',
      'sure',
      'cancel',
    ],
    events: {
      CONFIRM_OPEN: 'open',
      CONFIRM_SURE: 'sure',
      CONFIRM_CANCEL: 'cancel',
    },
  });

  // 定义事件过渡
  state.defineFlow('open', 'CONFIRM_OPEN');
  state.defineFlow('sure', 'CONFIRM_SURE');
  state.defineFlow('cancel', 'CONFIRM_CANCEL');

  return state;
};
