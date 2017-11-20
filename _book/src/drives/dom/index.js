const focusRegisterEvent = {};

function listenInputFocus() {
  return function ifInputFocus() {
    window.scrollTo(0, this.offsetHeight);
  }
}

export const focusEffectScroll = function focusEffectScroll() {
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i += 1) {
   const input = inputs[i];
   if (input.type === 'file') continue;
   input.removeEventListener('focus', focusRegisterEvent[i] , false);
   focusRegisterEvent[i] =  listenInputFocus().bind(input);
   input.addEventListener('focus', focusRegisterEvent[i] , false);
  }
}

export default {
  focusEffectScroll
},
