import StateMachine from  '../../../stateMachine';

export default () => {
  const state = new StateMachine({
    name: 'input',
    status: [
      'focus',
      'blur',
      'clear',
      'input',
      'change',
      'keyup',
      'keydown',
      'disabled',
      'usable',
    ],
    events: {
      INPUT_FOCUS: 'focus',
      INPUT_BLUR: 'blur',
      INPUT_INPUT: 'input',
      INPUT_CHANGE: 'change',
      INPUT_KEYUP: 'keyup',
      INPUT_KEYDOWN: 'keydown',
      INPUT_CLEAR: 'clear',
      INPUT_DISABLED: 'disabled',
      INPUT_USABLE: 'usable',
    },
  });

  // 定义事件过渡
  state.defineFlow('focus', 'INPUT_FOCUS');
  state.defineFlow('blur', 'INPUT_BLUR');
  state.defineFlow('input', 'INPUT_INPUT');
  state.defineFlow('change', 'INPUT_CHANGE');
  state.defineFlow('keyup', 'INPUT_KEYUP');
  state.defineFlow('keydown', 'INPUT_KEYDOWN');
  state.defineFlow('clear', 'INPUT_CLEAR');
  state.defineFlow('disabled', 'INPUT_DISABLED');
  state.defineFlow('usable', 'INPUT_USABLE');

  return state;
};
