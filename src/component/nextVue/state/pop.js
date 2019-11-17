import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'pop',
    status: [
      'open',
      'close',
      'disabled',
      'usable',
    ],
    events: {
      POP_OPEN: 'open',
      POP_CLOSE: 'close',
      POP_DISABLED: 'disabled',
      POP_USABLE: 'usable',
    },
  });

  // 定义事件过渡
  state.defineFlow('open', 'POP_OPEN');
  state.defineFlow('close', 'POP_CLOSE');
  state.defineFlow('disabled', 'POP_DISABLED');
  state.defineFlow('usable', 'POP_USABLE');

  return state;
};
