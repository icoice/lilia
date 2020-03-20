import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'image',
    status: [
      'load',
    ],
    events: {
      LOAD: 'load',
    },
  });

  // 定义事件过渡
  state.defineFlow('load', 'LOAD');

  return state;
};
