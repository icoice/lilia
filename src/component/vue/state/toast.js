import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'tap',
    status: [
      'on',
      'off',
    ],
    events: {
      ONOFF: 'on -> off',
      OFFON: 'off -> on',
    },
  });

  // 定义事件过渡
  state.defineFlow('open', 'OFFON');
  state.defineFlow('close', 'ONOFF');

  return state;
};
