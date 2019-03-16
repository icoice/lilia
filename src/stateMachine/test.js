const StateMachine = require('./index');

const signalLight = new StateMachine({
  name: 'signalLight',
  status: [
    'green',
    'yellow',
    'red'
  ],
  events: {
    WARNNING: 'green -> yellow',
    STOP: 'yellow -> red',
    GO: 'red -> green',
  },
});

// 这里的transition是复合事件，主要体现事件的流转过渡
signalLight.defineFlow('trafficLimit', 'WARNNING -> STOP -> GO');

let resultState = '';

resultState = signalLight.nextFlowState('trafficLimit');

console.log(resultState);

resultState = signalLight.nextFlowState('trafficLimit');

console.log(resultState);

resultState = signalLight.nextFlowState('trafficLimit');

console.log(resultState);

resultState = signalLight.nextFlowState('trafficLimit');

console.log(resultState);

resultState = signalLight.nextFlowState('trafficLimit');

console.log(resultState);

signalLight.restate('trafficLimit');

resultState = signalLight.runFlow('trafficLimit');

console.log(resultState);

console.log('\n');

signalLight.setFlowAction('trafficLimit', (state, option) => {
  console.log(state);
});

resultState = signalLight.runFlow('trafficLimit');

console.log('\n');

signalLight.doFlowAction('trafficLimit');
signalLight.doFlowAction('trafficLimit');
signalLight.doFlowAction('trafficLimit');
signalLight.doFlowAction('trafficLimit');
signalLight.doFlowAction('trafficLimit');

console.log('\n');

signalLight.wheelFlowAction('trafficLimit');
signalLight.wheelFlowAction('trafficLimit');
signalLight.wheelFlowAction('trafficLimit');
signalLight.wheelFlowAction('trafficLimit');
signalLight.wheelFlowAction('trafficLimit');
signalLight.wheelFlowAction('trafficLimit');
signalLight.wheelFlowAction('trafficLimit');
signalLight.wheelFlowAction('trafficLimit');
signalLight.wheelFlowAction('trafficLimit');
