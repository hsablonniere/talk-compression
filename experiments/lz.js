function $ (selector) {
  return document.querySelector(selector);
}

function $$ (selector) {
  return Array.from(document.querySelectorAll(selector));
}


const simpleExample = 'mille feuille'.toUpperCase();

const tags = [{
  startIndex: 9,
  length: 4,
  ref: -8
}];

const getTile = ({ letter, shadow, double = false, reference = false}) => {
  const classes = `tile ${double ? 'tile--double':''} ${shadow ? 'tile--shadow':''} ${reference ? 'underline': ''}`
  return `<div class='${classes}'>
    <h2>${letter}</h2>
  </div>`
}

const steps = []

for(let i = 0; i<=simpleExample.length ; i++ ) {
  const step = []
  for(let j = 0; j<i; j++) {
    step.push(getTile({ letter: simpleExample[j], shadow: false}))
  }
  for(let k = i; k < simpleExample.length; k++) {
    step.push(getTile({ letter: simpleExample[k], shadow: true}))
  }
  steps.push(step)
}

$('.steps').innerHTML = steps[Number($('.steps').dataset.currentStep)].join('')

$('button[data-action="previous"]').addEventListener('click', () => {
  const currentStep = Number($('.steps').dataset.currentStep) - 1;
  $('.steps').innerHTML = steps[currentStep].join('');
  $('.steps').dataset.currentStep = currentStep;
});

$('button[data-action="next"]').addEventListener('click', () => {
  const currentStep = Number($('.steps').dataset.currentStep) + 1;
  $('.steps').innerHTML = steps[currentStep].join('');
  $('.steps').dataset.currentStep = currentStep;
});
