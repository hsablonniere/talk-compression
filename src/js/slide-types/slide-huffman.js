import { css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { defineSlideType } from './base.js';
import '../scrable-tile.js';
import { LETTERS } from '../scrable-tile.js';

function getTree (node) {

  if (node.letter != null) {
    const { id, count, letter, score, bits } = node;
    const htmlContent = html`
      <scrabble-tile data-id=${id} .count=${count} .letter=${letter} .score=${score} .bits=${bits} style="transform: translate3d(0, 0, 0)"></scrabble-tile>
    `;
    return { count: 1, htmlContent };
  }

  const left = getTree(node.left);
  const right = getTree(node.right);
  const count = node.left.count + node.right.count;

  const htmlContent = html`
    <div class="tree" data-id="${node.id}" style="transform: translate3d(0, 0, 0)">
      <div class="tree-head">
        <scrabble-tile count=${count}></scrabble-tile>
      </div>
      <div class="tree-bar"></div>
      <div class="tree-left">${left.htmlContent}</div>
      <div class="tree-right">${right.htmlContent}</div>
    </div>
  `;

  return { count, htmlContent };
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

function getOptions (lines) {
  return Object.fromEntries(
    lines.map((txt) => {
      return txt.split(':').map((txt) => txt.trim());
    }),
  );
}

function getValue (valuesComma, index) {
  const values = valuesComma?.split(',');
  return values?.length > 1
    ? valuesComma[index]
    : valuesComma ?? null;
}

defineSlideType('slide-huffman', {
  onLeave (position, elements, slide) {

    const stepCount = elements.stepList.children.length;
    const currentStep = Number(slide.getAttribute('step'));
    const shouldAnimate = (0 < currentStep) && (currentStep < (stepCount - 3));

    if (position === 'after' || !shouldAnimate) {
      return;
    }

    const duration = 300;

    slide.setAttribute('frozen', '');
    setTimeout(() => {
      slide.removeAttribute('frozen');
    }, duration + 10);

    elements.stepList.querySelectorAll('#currentStep > [data-id]').forEach((currentElement, i) => {
      if (currentElement == null) {
        return;
      }
      const id = currentElement.dataset.id;
      const nextElement = elements.stepList.querySelector(`#nextStep [data-id="${id}"]`);
      if (nextElement == null) {
        return;
      }
      const currentCoords = currentElement.getBoundingClientRect();
      const nextCoords = nextElement.getBoundingClientRect();
      const x = nextCoords.left - currentCoords.left;
      const y = nextCoords.top - currentCoords.top;
      const translate = [
        { transform: `translate3d(${x}px, ${y}px, 0)` },
      ];
      const timing = {
        duration,
        iterations: 1,
        fill: 'forwards',
      };
      const anim = currentElement.animate(translate, timing);
      // if (i === 0) {
      anim.addEventListener('finish', () => {
        setTimeout(() => {
          anim.cancel();
        }, 50);
      });
      // }
    });

  },
  render ({ attrs, content, slide }) {

    const stepToDisplay = (attrs.step != null)
      ? Number(attrs.step)
      : 0;

    const steps = [];

    function addTreesAsStep (trees) {

      const htmlContent = trees.map((tree) => getTree(tree).htmlContent);

      const newStep = steps.length;
      const id = (newStep === stepToDisplay)
        ? 'currentStep'
        : (newStep === stepToDisplay + 1)
          ? 'nextStep'
          : (newStep === stepToDisplay - 1)
            ? 'previousStep'
            : null;
      const cssClass = (newStep === stepToDisplay)
        ? 'current'
        : 'hidden';
      steps.push(html`
        <div id=${ifDefined(id)} class="step ${cssClass}" data-step="${newStep}">${htmlContent}</div>
      `);
    }

    const lines = content.trim().split('\n');

    const options = getOptions(lines.slice(1));

    const letters = lines[0].split('');

    // The complete sequence
    const tiles = letters.map((letter, i) => {
      const rawScore = getValue(attrs.score, i);
      const score = rawScore === 'auto'
        ? LETTERS[letter]
        : rawScore;
      const rawBits = getValue(attrs.bits, i);
      const bits = (rawBits === 'inc')
        ? i.toString(2).padStart(score, '0')
        : rawBits;
      return { letter, score, bits };
    });
    const totalScoreInput = (attrs.totalScore != null)
      ? tiles.map((t) => t.score).reduce((a, b) => Number(a) + Number(b), 0)
      : null;
    addTreesAsStep(tiles);

    const lettersWithCount = {};
    for (const letter of letters) {
      if (lettersWithCount[letter] == null) {
        lettersWithCount[letter] = 0;
      }
      lettersWithCount[letter] += 1;
    }

    // The letters list
    let trees = Object.entries(lettersWithCount)
      .map(([letter, count]) => {
        return { count, letter, id: 'letter-' + letter };
      });
    addTreesAsStep(trees);
    trees.sort(sortTrees);
    addTreesAsStep(trees);

    while (trees.length >= 2) {

      const left = trees[trees.length - 2];
      const right = trees[trees.length - 1];

      trees = [
        ...trees.slice(0, trees.length - 2),
        {
          count: left.count + right.count,
          id: Math.random().toString(36).slice(2),
          left,
          right,
        },
      ];

      addTreesAsStep(trees);
      trees.sort(sortTrees);
      addTreesAsStep(trees);
    }

    const codeMap = Object.fromEntries(
      buildMap(trees[0])
        .map(({ letter, code }) => [letter, code]),
    );

    addTreesAsStep(
      letters.map((letter) => {
        const bits = codeMap[letter];
        return { letter, score: bits.length, bits };
      }),
    );

    const totalScoreOutput = (attrs.totalScore != null)
      ? letters
        .map((letter) => {
          const bits = codeMap[letter];
          return bits.length;
        })
        .reduce((a, b) => a + b, 0)
      : null;

    const totalScore = (stepToDisplay === 0)
      ? totalScoreInput
      : totalScoreOutput;

    function onClick (e) {
      if (e.target.matches('scrabble-tile')) {
        const letter = e.target.letter;
        if (letter != null) {
          slide.shadowRoot
            .querySelector(`.score-sheet td[data-letter="${letter}"]`)
            .classList
            .toggle('hidden');
        }
      }
    }

    return html`

      <div class="step-list" @click=${onClick} id="stepList">
        ${steps}
      </div>

      ${totalScore != null ? html`
        <div class="total-bits">= ${totalScore} bits</div>
      ` : ''}

      ${attrs.scoreSheet != null ? html`
        <div class="score-sheet">
          <table>
            <tr>
              <th></th>
              <th>Huffman</th>
            </tr>
            ${Object.entries(codeMap).map(([letter, code], i) => html`
              <tr>
                <td>${letter}</td>
                <td class="hidden" data-letter=${letter}>${code}</td>
              </tr>
            `)}
          </table>
        </div>
      ` : ''}

    `;
  },
  // language=CSS
  styles: css`
    :host {
      background-color: #fff;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
    }

    .step-list {
      /*flex: 1 1 0;*/
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: auto;
      justify-content: center;
      align-items: center;
    }

    .step {
      grid-area: 1 / 1 / 2 / 2;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5em;
      margin: 10px 0;
      align-items: start;
      justify-content: center;
    }

    scrabble-tile {
      font-size: 1.85rem;
    }

    .tree {
      display: grid;
      gap: 1.5rem 0.5em;
      grid-template-columns: auto auto;
      position: relative;
      text-align: center;
    }

    .tree-head {
      grid-area: 1 / 1 / 2 / 3;
      justify-self: center;
    }

    .tree-bar {
      border: 1px solid #000;
      border-bottom: none;
      position: absolute;
      left: 25%;
      right: 25%;
      height: 4em;
      /* use var from tree gap and count size */
      top: 1.115rem;
    }

    .total-bits {
      color: #0082ff;
      font-family: "Just Another Hand";
      font-size: 4rem;
      line-height: calc(2rem * 1.85);
      margin-top: 1rem;
    }

    .score-sheet table {
      border-collapse: collapse;
    }

    .score-sheet table {
      border: 3px solid #000;
    }

    .score-sheet table th,
    .score-sheet table td {
      border: 1px solid #000;
    }

    .score-sheet table th {
      border-bottom: 2px solid black;
    }

    .score-sheet table th,
    .score-sheet table td {
      color: #0082ff;
      font-family: "Just Another Hand";
      font-size: 2rem;
      line-height: 1;
      padding: 0.65rem 0.75rem 0 0.75rem;
    }

    .score-sheet table th {
      font-weight: normal;
    }

    .score-sheet table td {
      font-weight: bold;
    }

    .hidden {
      visibility: hidden;
    }
  `,
});
