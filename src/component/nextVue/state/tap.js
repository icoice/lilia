import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'tap',
    status: [
      'pressStart',
      'pressEnd',
      'cancel',
      'useable',
      'disabled',
    ],
    events: {
      PRESS: 'pressStart -> pressEnd',
      PRESS_CANCEL: 'cancel',
      PRESS_DISABLED: 'disabled',
      PRESS_USEABLE: 'useable',
    },
  });

  // 定义事件过渡
  state.defineFlow('press', 'PRESS');
  state.defineFlow('pressCancel', 'PRESS_CANCEL');
  state.defineFlow('disabled', 'PRESS_DISABLED');
  state.defineFlow('useable', 'PRESS_USEABLE');

  return state;
};
