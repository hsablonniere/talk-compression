function $ (selector) {
  return document.querySelector(selector);
}

function $$ (selector) {
  return Array.from(document.querySelectorAll(selector));
}

function getTileAsHtml ({ count = '', letter = '', score = '' }) {
  return `
    <div class="tile-wrapper">
      ${count !== '' ? `
        <div class="tile-count">${count}</div>
      ` : ''}
      ${letter !== '' ? `
        <div class="tile">
          <div class="tile-letter">${letter}</div>
          ${score !== '' ? `
            <div class="tile-score">${score}</div>
          ` : ''}
        </div>
      ` : ''}
    </div>
  `;
}

function getTree (node) {

  if (node.letter != null) {
    const html = getTileAsHtml(node);
    return { count: 1, html };
  }

  const left = getTree(node.left);
  const right = getTree(node.right);
  const count = node.left.count + node.right.count;

  const html = `
    <div class="tree">
      <div class="tree-head">
        ${getTileAsHtml({ count })}
      </div>
      <div class="tree-bar"></div>
      <div class="tree-left">${left.html}</div>
      <div class="tree-right">${right.html}</div>
    </div>
  `;

  return { count, html };
}

function sortTrees (a, b) {
  if (b.count === a.count) {
    if (b.letter != null && a.letter == null) {
      return -1;
    }
    if (b.letter == null && a.letter != null) {
      return +1;
    }
  }
  return b.count - a.count;
}

function addStep (html) {
  const step = $('.step-list').children.length;
  const style = (step === 0) ? '' : 'display: none';
  $('.step-list').innerHTML += `<div class="step" data-step="${step}" style="${style}">${html}</div>`;
}

function addTreesAsStep (trees) {
  const html = trees
    .map((tree) => getTree(tree).html)
    .join('');
  addStep(html);
}

function buildMap (tree, code = '') {
  if (tree == null) {
    return [];
  }
  if (tree.letter != null) {
    return [{ letter: tree.letter, code }];
  }
  const leftTree = buildMap(tree.left, code + '0');
  const rightTree = buildMap(tree.right, code + '1');
  return [
    ...leftTree,
    ...rightTree,
  ];
}

function updateText (text) {

  $('.step-list').innerHTML = '';

  const lettersCount = new Set(text.split('')).size;
  const baseScore = Math.max(
    1,
    Math.ceil(Math.log2(lettersCount)),
  );

  const textAsTiles = text
    .split('')
    .map((letter) => getTileAsHtml({ letter, score: baseScore }))
    .join('');

  $('.input-text-letters').innerHTML = textAsTiles + `
  <div>=${text.length * baseScore}</div>
`;

  const lettersWithCount = {};
  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    if (lettersWithCount[letter] == null) {
      lettersWithCount[letter] = 0;
    }
    lettersWithCount[letter] += 1;
  }

  let trees = Object.entries(lettersWithCount)
    .map(([letter, count]) => {
      return { count, letter };
    })
    .sort(sortTrees);

  addTreesAsStep(trees);

  while (trees.length >= 2) {

    const left = trees[trees.length - 2];
    const right = trees[trees.length - 1];

    trees = [
      ...trees.slice(0, trees.length - 2),
      {
        count: left.count + right.count,
        left,
        right,
      },
    ];

    addTreesAsStep(trees);
    trees.sort(sortTrees);
    addTreesAsStep(trees);
  }

  // displayStep($$('.step').length - 1);
  displayStep(0);

  const codeMap = Object.fromEntries(
    buildMap(trees[0])
      .map(({ letter, code }) => [letter, code]),
  );

  let totalScore = 0;
  const outputTextAsTiles = text
    .split('')
    .map((letter) => {
      const score = codeMap[letter].length;
      totalScore += score;
      return getTileAsHtml({ letter, score });
    })
    .join('');

  $('.output-text-letters').innerHTML = outputTextAsTiles + `
  <div>=${totalScore}</div>
`;
}

function displayStep (stepIndex) {
  $$('.step').forEach((step) => step.style = 'display: none');
  $('.step-list').dataset.currentStep = stepIndex;
  $(`.step[data-step="${stepIndex}"]`).style = '';
}

$('button[data-action="previous"]').addEventListener('click', () => {
  const currentStep = Number($('.step-list').dataset.currentStep);
  const previousStep = Math.max(0, currentStep - 1);
  displayStep(previousStep);
});

$('button[data-action="next"]').addEventListener('click', () => {
  const currentStep = Number($('.step-list').dataset.currentStep);
  const previousStep = Math.min(currentStep + 1, $$('.step').length - 1);
  displayStep(previousStep);
});

$('.input-text').addEventListener('input', () => {
  updateText($('.input-text').value);
});

updateText($('.input-text').value);

// const text = 'HUBERT ET ANTOINE';
// const text = 'RASPBERRY BLUEBERRY PEAR';
// const text = 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. QUISQUE FEUGIAT DUI AT LEO PORTA DIGNISSIM. ETIAM UT PURUS ULTRICES, PULVINAR TELLUS QUIS, CURSUS MASSA. MAURIS DIGNISSIM ACCUMSAN EX, AT VESTIBULUM LECTUS FERMENTUM ID. QUISQUE NEC MAGNA ARCU. QUISQUE IN METUS SED ERAT SODALES EUISMOD EGET ID PURUS. SED SAGITTIS RHONCUS MAURIS. UT SIT AMET URNA AC NUNC SEMPER PORTA. NAM UT FELIS EU VELIT LUCTUS RUTRUM. NAM LEO NISL, MOLESTIE A VARIUS NON, ULLAMCORPER SIT AMET TORTOR. DONEC IN CONVALLIS EX. VESTIBULUM ANTE IPSUM PRIMIS IN FAUCIBUS ORCI LUCTUS ET ULTRICES POSUERE CUBILIA CURAE; PRAESENT HENDRERIT VENENATIS ERAT, EU MALESUADA NULLA VIVERRA EU. CURABITUR PORTA RISUS AUGUE, NON RUTRUM LECTUS HENDRERIT A. SED VOLUTPAT DOLOR NEC RUTRUM VULPUTATE. INTERDUM ET MALESUADA FAMES AC ANTE IPSUM PRIMIS IN FAUCIBUS. INTEGER RHONCUS TURPIS ORCI, AT TEMPOR TORTOR SCELERISQUE VARIUS. INTEGER NEC FERMENTUM DUI. INTEGER VITAE DOLOR SIT AMET ERAT ULLAMCORPER ELEMENTUM. DONEC BLANDIT LACINIA ERAT, VITAE BLANDIT LIBERO ORNARE ID. IN LUCTUS ODIO A LACUS DIGNISSIM, ID POSUERE TORTOR LACINIA. PELLENTESQUE SED MASSA AC TELLUS TINCIDUNT RUTRUM. PRAESENT COMMODO ENIM NIBH, UT CONSECTETUR TORTOR CONSEQUAT NON. ALIQUAM MI ENIM, MATTIS EU VELIT QUIS, SOLLICITUDIN FRINGILLA EX. DONEC AT AUGUE ULTRICES, PORTA JUSTO IN, MATTIS TORTOR. NUNC SOLLICITUDIN NISI EGET URNA CONDIMENTUM SEMPER. PELLENTESQUE SAGITTIS QUAM EU MOLLIS VIVERRA. PROIN TINCIDUNT AUCTOR NIBH QUIS SUSCIPIT.';
