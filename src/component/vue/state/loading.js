import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'loading',
    status: [
      'loadStart',
      'loadEnd'
    ],
    events: {
      LOAD_START: 'loadStart',
      LOAD_END: 'loadEnd',
    },
  });

  // 定义事件过渡
  state.defineFlow('loadStart', 'LOAD_START');
  state.defineFlow('loadEnd', 'LOAD_END');

  return state;
};
