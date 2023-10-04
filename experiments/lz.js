function $ (selector) {
  return document.querySelector(selector);
}

function $$ (selector) {
  return Array.from(document.querySelectorAll(selector));
}


/*
const simpleExample = 'mille feuille'.toUpperCase();
const tags = [{
  startIndex: 9,
  length: 4,
  ref: -8
}];
*/


const simpleExample = 'On peut tromper mille personnes une fois. Mais on ne peut pas tromper mille personnes, mille fois'.toUpperCase();
const tags = [
  {
    startIndex: 61,
    length: 23,
    ref: -53
  },
  {
    startIndex: 86,
    length: 7,
    ref: -40
  },
  {
    startIndex: 93,
    length: 4,
    ref: -10
  }
];


const getTile = ({ letter, shadow, double = false, reference = false}) => {
  const classes = `tile ${double ? 'tile--double':''} ${shadow ? 'tile--shadow':''} ${reference ? 'underline': ''}`
  return `<div class='${classes}'>
    <h2>${letter}</h2>
  </div>`
}

const getTag = ({ content, ref, length})=> {
  return `<div class='tag'>
    <h2>${content}</h2>
    <h3><${ref},${length}></h3>
  </div>`
}
const clone = (object) => JSON.parse(JSON.stringify(object))
const steps = [];
let currentLetter = 0;
let cursorIndex = 0;
while(currentLetter < simpleExample.length) {
  const step = []
  // write previous letter
  for(let j = 0; j<cursorIndex; j++) {
    if(cursorIndex > 0) {
      console.log({steps, currentLetter, j})
      step.push(clone(steps[cursorIndex-1][j]))
    }
  }
  // Apply marker on previous letter
  const visibleTags = tags.filter(tag => cursorIndex>=tag.startIndex);

  visibleTags.forEach(tag => {
    const from = tag.startIndex + tag.ref;
    const to = from + tag.length;

    for(let k = from; k< to; k++) {
      step[k] = getTile({ letter: simpleExample[k], reference: true, shadow: false})
    }
  })

  const currentLetterIsTag = tags.find(tag => tag.startIndex === currentLetter)
  if(currentLetterIsTag) {
    step.push(getTag({
      content: 'yolo',
      ref: currentLetterIsTag.ref,
      length: currentLetterIsTag.length,
    }))
    currentLetter+=currentLetterIsTag.length
  } else {
    step.push(getTile({ letter: simpleExample[currentLetter], shadow: false}))
    currentLetter++;
  }
  for(let k = currentLetter; k<simpleExample.length;k++) {
    step.push(getTile({ letter: simpleExample[k], shadow: true }))
  }
  cursorIndex++;
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
