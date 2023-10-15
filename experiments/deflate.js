// let compressedBits = '0001111110001011000010000000000000000000000000000000000000000000000000000000001111110011110011110101001100101000010010000010110100101101010100010010100000101001110010101100111100101101010010000010110101010010001010001100110101001011000001010000101000010100000101011110011111100111000000010001100110111001100110010011100100111001101010010000101001101001111110011001100111000101011110100000101011111110011010000000101000100001011100100011000010100101110001010110000010001101000100001001010110111110100010011001100111000101000010101111100101111001000010100110000010010011100000000011101000001010000100101000101101110001111010011101001001000001101101101000001000001011000000001111100001011010000101001110110010001100000000000000000000000000'.split('');
let compressedBits = '1111100011010001000100000000000000000000000000000000000000000000000000001100000011001111111100111100101000010100000100101011010010110100100010100001010010010100010100111111001110110100000100101011010001001010000101001011001111010010101000000101000000101000101010001110011111100111100000001001100010011101100110011001110010011100100101010101000010010110100111111001100110100011010111100101000001111111000101100101000010000100010011100000110010100101101000110000011010110001000010001010100101111101100100011001100110100011010100001001111110011110010100000000011011001001000000010101110001010000010010001101000110001110100101110100101110000010011011010100000111010000000000000001111101011010001010000011011100110001000000000000000000000000'.split('');
const compressedDetails = await fetch('/demos/data/cite-de-la-peur.txt.json').then((r) => r.json());

const $stepList = document.querySelector('.step-list');

function highlightFoo (...intervals) {
  const $step = document.createElement('div');
  $step.classList.add('step');
  $step.innerHTML = compressedBits
    .map((bit, i) => {
      for (const [start, end, color, text] of intervals) {
        if (start <= i && i < end) {
          if (text != null) {
            return `<span style="background-color: ${color};">${text?.[i - start]?.replace(' ', '⎵') ?? '·'}</span>`;
          }
          else {
            return `<span style="background-color: ${color};">${bit}</span>`;
          }
        }
      }
      return `<span>${bit}</span>`;
    })
    .join('');
  $stepList.appendChild($step);
  compressedBits = $step.textContent.trim().split('');
}

function highlight (...intervals) {
  const bool = intervals.some(([start, end, color, text]) => text != null);
  if (bool) {
    const cleanIntervals = intervals.map(([start, end, color]) => [start, end, color]);
    highlightFoo(...cleanIntervals);
  }
  highlightFoo(...intervals);
}

function displayStep (newStep) {
  const currentStep = Number($stepList.dataset.currentStep) || 0;
  $stepList.children[currentStep].classList.remove('current');
  $stepList.children[newStep].classList.add('current');
  $stepList.dataset.currentStep = newStep;
}

document.addEventListener('keydown', (e) => {
  const minStep = 0;
  const maxStep = $stepList.children.length - 1;
  const currentStep = Number($stepList.dataset.currentStep) || 0;
  if (e.code === 'ArrowLeft') {
    const newStep = Math.max(minStep, currentStep - 1);
    displayStep(newStep);
  }
  if (e.code === 'ArrowRight') {
    const newStep = Math.min(currentStep + 1, maxStep);
    displayStep(newStep);
  }
});

highlight();

highlight(
  [0, 80, 'deepskyblue'],
);

highlight(
  [0, 16, 'yellow'],
  [0, 80, 'deepskyblue'],
);

highlight(
  [16, 24, 'yellow'],
  [0, 80, 'deepskyblue'],
);

highlight(
  [24, 32, 'yellow'],
  [0, 80, 'deepskyblue'],
);

highlight(
  [32, 64, 'yellow'],
  [0, 80, 'deepskyblue'],
);

highlight(
  [64, 72, 'yellow'],
  [0, 80, 'deepskyblue'],
);

highlight(
  [72, 80, 'yellow'],
  [0, 80, 'deepskyblue'],
);

highlight(
  [0, 80, 'deepskyblue'],
);

highlight(
  [0, 80, 'deepskyblue'],
  [compressedBits.length - 64, compressedBits.length, 'deepskyblue'],
);

highlight(
  [0, 80, 'deepskyblue'],
  [compressedBits.length - 64, compressedBits.length - 32, 'yellow'],
  [compressedBits.length - 64, compressedBits.length, 'deepskyblue'],
);

highlight(
  [0, 80, 'deepskyblue'],
  [compressedBits.length - 32, compressedBits.length, 'yellow'],
  [compressedBits.length - 64, compressedBits.length, 'deepskyblue'],
);

highlight(
  [0, 80, 'deepskyblue'],
  [compressedBits.length - 64, compressedBits.length, 'deepskyblue'],
);

highlight(
  [0, 80, 'deepskyblue'],
  [80, compressedBits.length - 64, 'darkseagreen'],
  [compressedBits.length - 64, compressedBits.length, 'deepskyblue'],
);

const headerBlocksFooter = [
  [0, 80, 'deepskyblue'],
  [80, compressedBits.length - 64, 'darkseagreen'],
  [compressedBits.length - 64, compressedBits.length, 'deepskyblue'],
];

highlight([80, 81, 'yellow'], ...headerBlocksFooter);

highlight([81, 83, 'yellow'], ...headerBlocksFooter);

highlight([83, 91, 'yellow', 'O'], ...headerBlocksFooter);

highlight([91, 99, 'yellow', 'n'], ...headerBlocksFooter);

highlight([99, 107, 'yellow', ' '], ...headerBlocksFooter);

highlight([107, 115, 'yellow', 'p'], ...headerBlocksFooter);

highlight([115, 123, 'yellow', 'e'], ...headerBlocksFooter);

highlight([123, 131, 'yellow', 'u'], ...headerBlocksFooter);

highlight([131, 139, 'yellow', 't'], ...headerBlocksFooter);

highlight([139, 147, 'yellow', ' '], ...headerBlocksFooter);

highlight([147, 155, 'yellow', 't'], ...headerBlocksFooter);

highlight([155, 163, 'yellow', 'r'], ...headerBlocksFooter);

highlight([163, 171, 'yellow', 'o'], ...headerBlocksFooter);

highlight([171, 179, 'yellow', 'm'], ...headerBlocksFooter);

highlight([179, 187, 'yellow', 'p'], ...headerBlocksFooter);

highlight([187, 195, 'yellow', 'e'], ...headerBlocksFooter);

highlight([195, 203, 'yellow', 'r'], ...headerBlocksFooter);

highlight([203, 211, 'yellow', ' '], ...headerBlocksFooter);

highlight([211, 219, 'yellow', 'u'], ...headerBlocksFooter);

highlight([219, 227, 'yellow', 'n'], ...headerBlocksFooter);

highlight([227, 235, 'yellow', 'e'], ...headerBlocksFooter);

// repeat
highlight([235, 242, 'yellow', '257'], ...headerBlocksFooter);
highlightFoo([235, 242, 'yellow', '3'], ...headerBlocksFooter);
highlightFoo([235, 242, 'yellow', '3'], [242, 247, 'yellow'], ...headerBlocksFooter);
highlightFoo([235, 242, 'yellow', '3'], [242, 247, 'yellow', '8'], ...headerBlocksFooter);
highlightFoo([235, 242, 'yellow', '3'], [242, 247, 'yellow', '17+'], ...headerBlocksFooter);
highlightFoo([235, 242, 'yellow', '3'], [242, 247, 'yellow', '17+'], [247, 250, 'yellow'], ...headerBlocksFooter);
highlightFoo([235, 242, 'yellow', '3'], [242, 247, 'yellow', '17+'], [247, 250, 'yellow', '0'], ...headerBlocksFooter);
highlightFoo([235, 250, 'yellow', ' pe'], ...headerBlocksFooter);

highlight([250, 258, 'yellow', 'r'], ...headerBlocksFooter);

highlight([258, 266, 'yellow', 's'], ...headerBlocksFooter);

highlight([266, 274, 'yellow', 'o'], ...headerBlocksFooter);

highlight([274, 282, 'yellow', 'n'], ...headerBlocksFooter);

// repeat
highlight([282, 289, 'yellow', '257'], ...headerBlocksFooter);
highlightFoo([282, 289, 'yellow', '3'], ...headerBlocksFooter);
highlightFoo([282, 289, 'yellow', '3'], [289, 294, 'yellow'], ...headerBlocksFooter);
highlightFoo([282, 289, 'yellow', '3'], [289, 294, 'yellow', '6'], ...headerBlocksFooter);
highlightFoo([282, 289, 'yellow', '3'], [289, 294, 'yellow', '9+'], ...headerBlocksFooter);
highlightFoo([282, 289, 'yellow', '3'], [289, 294, 'yellow', '9+'], [294, 296, 'yellow'], ...headerBlocksFooter);
highlightFoo([282, 289, 'yellow', '3'], [289, 294, 'yellow', '9+'], [294, 296, 'yellow', '0'], ...headerBlocksFooter);
highlightFoo([282, 296, 'yellow', 'ne '], ...headerBlocksFooter);

highlight([296, 304, 'yellow', ''], ...headerBlocksFooter);

highlight([304, 312, 'yellow', ''], ...headerBlocksFooter);

highlight([312, 320, 'yellow', ''], ...headerBlocksFooter);

highlight([320, 328, 'yellow', ''], ...headerBlocksFooter);

highlight([328, 336, 'yellow', ''], ...headerBlocksFooter);

highlight([336, 344, 'yellow', ''], ...headerBlocksFooter);

highlight([344, 352, 'yellow', ''], ...headerBlocksFooter);

highlight([352, 360, 'yellow', ''], ...headerBlocksFooter);

highlight([360, 368, 'yellow', ''], ...headerBlocksFooter);

highlight([368, 376, 'yellow', ''], ...headerBlocksFooter);

highlight([376, 384, 'yellow'], ...headerBlocksFooter);

highlight([384, 392, 'yellow'], ...headerBlocksFooter);

highlight([392, 400, 'yellow'], ...headerBlocksFooter);

highlight([400, 417, 'yellow'], ...headerBlocksFooter);

highlight([417, 432, 'yellow'], ...headerBlocksFooter);

highlight([432, 448, 'yellow'], ...headerBlocksFooter);

highlight([448, 456, 'yellow'], ...headerBlocksFooter);

highlight([456, 472, 'yellow'], ...headerBlocksFooter);

highlight([472, 488, 'yellow'], ...headerBlocksFooter);

highlight([488, 496, 'yellow'], ...headerBlocksFooter);

highlight([496, 504, 'yellow'], ...headerBlocksFooter);

highlight([504, 512, 'yellow'], ...headerBlocksFooter);

highlight([512, 520, 'yellow'], ...headerBlocksFooter);

highlight([520, 528, 'yellow'], ...headerBlocksFooter);

highlight([528, 536, 'yellow'], ...headerBlocksFooter);

highlight([536, 544, 'yellow'], ...headerBlocksFooter);

highlight([544, 552, 'yellow'], ...headerBlocksFooter);

highlight([552, 569, 'yellow'], ...headerBlocksFooter);

highlight([569, 585, 'yellow'], ...headerBlocksFooter);

highlight([585, 593, 'yellow'], ...headerBlocksFooter);

highlight([593, 601, 'yellow'], ...headerBlocksFooter);

highlight([601, 609, 'yellow'], ...headerBlocksFooter);

highlight([609, 627, 'yellow'], ...headerBlocksFooter);

highlight([627, 635, 'yellow'], ...headerBlocksFooter);

highlight([635, 653, 'yellow'], ...headerBlocksFooter);

highlight([653, 661, 'yellow'], ...headerBlocksFooter);

highlight([661, 668, 'yellow'], ...headerBlocksFooter);

displayStep(70);
displayStep(0);
