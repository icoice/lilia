import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'pulldown',
    status: [
      'open',
      'close',
      'searching',
      'change',
      'useable',
      'disabled',
    ],
    events: {
      PULLDOWN_DROP: 'open -> close',
      PULLDOWN_SEARCHING: 'unsearch -> searching',
      PULLDOWN_CHANGE: 'change',
      PULLDOWN_CLEAR: 'clear',
      PULLDOWN_DISABLED: 'disabled',
      PULLDOWN_USABLE: 'usable',
    },
  });

  // 定义事件过渡
  state.defineFlow('drop', 'PULLDOWN_DROP');
  state.defineFlow('searching', 'PULLDOWN_SEARCHING');
  state.defineFlow('change', 'PULLDOWN_CHANGE');
  state.defineFlow('disabled', 'PULLDOWN_DISABLED');
  state.defineFlow('useable', 'PULLDOWN_USABLE');
  state.defineFlow('clear', 'PULLDOWN_CLEAR');

  return state;
};
