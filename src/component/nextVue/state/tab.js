import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'tab',
    status: [
      'change',
    ],
    events: {
      PRESS_CHANGE: 'change',
    },
  });

  // 定义事件过渡
  state.defineFlow('change', 'PRESS_CHANGE');

  return state;
};
