import { css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { defineSlideType } from './base.js';
import '../scrable-tile.js';
import { LETTERS } from '../scrable-tile.js';

function getTree (node) {

  if (node.letter != null) {
    const { id, count, letter, score, bits } = node;
    const htmlContent = html`
      <scrabble-tile data-id=${id} .count=${count} .letter=${letter} .score=${score} .bits=${bits} style="transform: translate3d(0, 0, 0) scale(var(--scale))"></scrabble-tile>
    `;
    return { count: 1, htmlContent };
  }

  const left = getTree(node.left);
  const right = getTree(node.right);
  const count = node.count;

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

    if (slide.attributes.animation == null) {
      return;
    }

    const stepCount = elements.stepList.children.length;
    const currentStep = Number(slide.getAttribute('step'));
    const shouldAnimate = (0 <= currentStep) && (currentStep < (stepCount - 3));

    if (position === 'after' || !shouldAnimate) {
      return;
    }

    const duration = 400;

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
      const y = nextCoords.bottom - currentCoords.bottom;
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

    function addTreesAsStep (trees, tree = false) {

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
        <div id=${ifDefined(id)} class="step ${cssClass}" data-tree=${tree} data-step="${newStep}">${htmlContent}</div>
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
      return { letter, score, bits, id: `letter-${letter}` };
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
    addTreesAsStep(trees, true);
    trees.sort(sortTrees);
    addTreesAsStep(trees, true);

    while (trees.length >= 2) {

      const left = trees[trees.length - 2];
      const right = trees[trees.length - 1];

      trees = [
        ...trees.slice(0, trees.length - 2),
        {
          count: left.count + right.count,
          id: Math.random().toString(36).slice(2),
          left: { ...left, count: '' },
          right: { ...right, count: '' },
        },
      ];

      addTreesAsStep(trees, true);
      if (trees.length === 1) {
        trees[0].count = '';
        addTreesAsStep(trees);
      }
      else {
        trees.sort(sortTrees);
        addTreesAsStep(trees, true);
      }
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
      const $tile = e.target;
      if ($tile.matches('scrabble-tile')) {
        const letter = $tile.letter;
        if (letter != null) {
          const $score = slide.shadowRoot
            .querySelector(`.score-sheet td[data-letter="${letter}"]`);
          $score
            .classList
            .toggle('hidden');
          if ($tile.score == null) {
            $tile.score = $score.textContent.length;
          }
          else {
            $tile.score = null;
          }
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
                <th>${letter}</th>
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
      cursor: url('/src/img/pointer.svg') 24 15, auto;
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
      gap: 0.25em;
      margin: 10px 0;
      align-items: start;
      justify-content: center;
    }

    .step[data-tree="true"] {
      gap: 0.75em;
    }

    scrabble-tile {
      font-size: 1.85rem;
    }

    scrabble-tile:hover {
      --scale: 1.1;
    }

    scrabble-tile:active {
      --scale: 1;
    }

    .tree {
      display: grid;
      gap: 1.5rem 0.75em;
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
      border: 3px solid #000;
      font-weight: bold;
    }

    .score-sheet th,
    .score-sheet td {
      border: 1px solid #000;
    }

    .score-sheet th {
      font-family: 'Interstate';
      padding: 0 0.5rem;
      line-height: 1.25;
      font-size: 2rem;
    }

    .score-sheet td {
      color: #0082ff;
      font-family: "Just Another Hand";
      font-size: 2.25rem;
      line-height: 1;
      padding: 0.7rem 0.75rem 0 0.75rem;
    }

    .hidden {
      visibility: hidden;
    }
  `,
});
