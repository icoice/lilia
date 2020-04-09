import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'table',
    status: [
      'narrowScreen',
    ],
    events: {
      NARROW_SCREEN: 'narrowScreen',
    },
  });

  // 定义事件过渡
  state.defineFlow('narrowScreen', 'NARROW_SCREEN');

  return state;
};
