import { css, html } from 'lit';
import '../scrable-tile.js';
import { defineSlideType } from './base.js';

let lastContent = null;

const ANIMATION_DURATION = 400;
const MAX_COLS = 22;

function moveTo ($startElement, $endElement, duration) {
  const startBox = $startElement.getBoundingClientRect();
  const endBox = $endElement.getBoundingClientRect();
  const x = startBox.left - endBox.left;
  const y = startBox.bottom - endBox.bottom;
  $endElement.removeAttribute('hidden');
  const anim = $endElement.animate(
    [{ transform: `translate3d(${x}px, ${y}px, 0)` }, { transform: `translate3d(${0}px, ${0}px, 0)` }],
    {
      duration,
      iterations: 1,
      fill: 'forwards',
    },
  );
  anim.addEventListener('finish', () => {
    setTimeout(() => {
      anim.cancel();
      // $endElement.setAttribute('hidden', '');
    }, 50);
  });
}

defineSlideType('slide-lzd', {
  render: function ({ attrs, content, slide }) {

    if (content != null) {
      lastContent = content;
    }
    else if (slide.dataset.text != null) {
      content = slide.dataset.text;
    }
    else {
      content = lastContent;
      slide.dataset.text = content;
    }

    const [inputText, ...rawReplacements] = content
      .trim()
      .split('\n');

    const fullInput = inputText
      .toUpperCase()
      .split('')
      .map((letter, i) => {
        return {
          id: i,
          letter,
        };
      });

    const inputTiles = [];
    const outputTiles = [];

    const replacementIndexes = rawReplacements.map((replacement) => {
      return {
        sourceStart: replacement.indexOf('['),
        sourceEnd: replacement.indexOf(']'),
        repeatStart: replacement.indexOf('('),
        repeatEnd: replacement.indexOf(')'),
      };
    });

    const currentReplacement = (attrs.replacement != null)
      ? Number(attrs.replacement)
      : null;

    const currentStep = (currentReplacement != null)
      ? replacementIndexes[currentReplacement].repeatStart
      : Number(attrs.step ?? 0);

    let fullInputIndex = 0;

    for (const replacement of replacementIndexes) {

      const { sourceStart, sourceEnd, repeatStart, repeatEnd } = replacement;

      for (let i = fullInputIndex; i < repeatEnd + 1; i++) {
        const { id, letter } = fullInput[i];
        const ghost = (attrs.init != null)
          ? false
          : (attrs.finish != null)
            ? true
            : (i < currentStep || i >= currentStep + 3);
        inputTiles.push({ id, letter, ghost });
      }

      for (let i = fullInputIndex; i < repeatStart; i++) {
        const { id, letter } = fullInput[i];
        const hidden = (attrs.finish == null)
          ? (i >= currentStep)
          : false;
        outputTiles.push({ id, letter, hidden });
      }

      const distance = repeatStart - sourceStart;
      const length = repeatEnd - repeatStart + 1;
      const hidden = (attrs.finish == null)
        ? (repeatStart >= currentStep)
        : false;
      outputTiles.push({ distance, length, hidden });

      fullInputIndex = repeatEnd + 1;
    }

    for (let i = fullInputIndex; i < fullInput.length; i++) {
      const { id, letter } = fullInput[i];
      const ghost = (attrs.init == null);
      inputTiles.push({ id, letter, ghost });
      const hidden = (attrs.finish == null);
      outputTiles.push({ id, letter, hidden });
    }

    let mode = 'init';
    let sourceStartIndex;
    let sourceEndIndex;
    let $sourceTiles;
    let repeatStartIndex;
    let repeatEndIndex;
    let $repeatTiles;
    let $largeTile;

    function onClickTile (e) {
      const $inputChildren = Array.from(slide.shadowRoot.querySelector('.tiles.input').children);
      const clickedIndex = $inputChildren.indexOf(e.target);
      if (mode === 'init') {
        const $start = e.target;
        const $firstActive = $inputChildren.find((tile) => !tile.ghost);
        if ($start === $firstActive) {
          const id = $start.dataset.id;
          const $end = slide.shadowRoot.querySelector(`.tiles.output scrabble-tile[data-id="${id}"]`);
          $start.ghost = true;
          $inputChildren[clickedIndex + 3].ghost = false;
          moveTo($start, $end, ANIMATION_DURATION);
        }
      }
      else if (mode === 'select-source-start') {
        if (clickedIndex === sourceStartIndex) {
          mode = 'select-source-end';
        }
      }
      else if (mode === 'select-source-end') {
        mode = 'init';
        $inputChildren.forEach((tile, i) => {
          const ghost = (i < repeatEndIndex + 1 || i >= repeatEndIndex + 4);
          tile.ghost = ghost;
        });
        $inputChildren.forEach((tile) => tile.marked = false);
        $largeTile.marked = false;
        sourceStartIndex = null;
        sourceEndIndex = null;
        $sourceTiles = null;
        repeatStartIndex = null;
        repeatEndIndex = null;
        $repeatTiles = null;
        $largeTile = null;
      }
    }

    function onHoverTile (e) {
      const $inputChildren = Array.from(slide.shadowRoot.querySelector('.tiles.input').children);
      const hoveredIndex = $inputChildren.indexOf(e.target);
      if (mode === 'select-source-start') {
        if ($sourceTiles != null) {
          $sourceTiles.forEach((tile) => {
            tile.marked = false;
            tile.ghost = true;
          });
        }
        if (hoveredIndex < repeatStartIndex) {
          sourceStartIndex = hoveredIndex;
          sourceEndIndex = hoveredIndex + 3;
          $sourceTiles = $inputChildren.slice(sourceStartIndex, Math.min(sourceEndIndex, repeatStartIndex));
          $sourceTiles.forEach((tile) => {
            tile.marked = true;
            tile.ghost = false;
          });
          $largeTile.distance = repeatStartIndex - sourceStartIndex;
        }
      }
      if (mode === 'select-source-end') {
        if (hoveredIndex - sourceStartIndex >= 2) {
          sourceEndIndex = hoveredIndex;
          const length = sourceEndIndex - sourceStartIndex + 1;
          repeatEndIndex = repeatStartIndex + length - 1;
          $inputChildren
            .slice(0, repeatStartIndex)
            .forEach((tile, index) => {
              const isSource = sourceStartIndex <= index && index <= sourceEndIndex;
              tile.marked = isSource;
              tile.ghost = !isSource;
            });
          $inputChildren
            .slice(repeatStartIndex)
            .forEach((tile, shiftedIndex) => {
              const index = shiftedIndex + repeatStartIndex;
              const isRepeat = repeatStartIndex <= index && index <= repeatEndIndex;
              tile.marked = isRepeat;
              tile.ghost = !isRepeat;
            });
          $largeTile.length = length;
        }
      }
    }

    function onClickLargeTile (e) {
      if (mode === 'init') {
        if (e.target.hasAttribute('distance')) {
          mode = 'select-source-start';

          $largeTile = e.target;
          $largeTile.marked = true;
          $largeTile.distance = '?';
          $largeTile.length = 3;
          $largeTile.removeAttribute('hidden');

          const $inputChildren = Array.from(slide.shadowRoot.querySelector('.tiles.input').children);
          const $activeTiles = $inputChildren.filter((tile) => tile.ghost !== true);
          repeatStartIndex = $inputChildren.indexOf($activeTiles[0]);
          repeatEndIndex = $inputChildren.indexOf($activeTiles[2]);
          $inputChildren.forEach((tile, i) => {
            if (repeatStartIndex <= i && i <= repeatEndIndex) {
              tile.marked = true;
            }
          });
        }
      }
      else {
        mode = 'init';
        $largeTile = null;
        e.target.setAttribute('hidden', '');
      }
    }

    return html`
      <div class="step">
        <div class="input title">Avant :</div>
        <div class="input tiles" style="--cols: ${Math.min(inputTiles.length, MAX_COLS)}">
          ${inputTiles.map((tile) => html`
            <scrabble-tile
                data-id=${tile.id}
                .letter=${tile.letter}
                .ghost=${tile.ghost}
                @click=${onClickTile}
                @mouseover=${onHoverTile}
            ></scrabble-tile>
          `)}
        </div>
        <div class="output title">Après :</div>
        <div class="output tiles" style="--cols: ${Math.min(inputTiles.length, MAX_COLS)}">
          ${outputTiles.map((tile) => html`
            <scrabble-tile
                data-id=${tile.id}
                .letter=${tile.letter}
                .marked=${tile.marked}
                .distance=${tile.distance}
                .length=${tile.length}
                ?hidden=${tile.hidden}
                @click=${onClickLargeTile}
            ></scrabble-tile>
          `)}
        </div>
      </div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      display: grid;
      justify-content: center;
      align-content: center;
      font-size: 1rem;
      cursor: url('/src/img/pointer.svg') 24 15, auto;
    }

    .step {
      grid-area: 1 / 1 / 2 / 2;
    }

    .title {
      font-weight: bold;
      font-family: 'Yanone Kaffeesatz', sans-serif;
      font-size: 1.5em;
    }

    :host([init]) .title {
      visibility: hidden;
    }

    .title.output {
      margin-top: 1em;
    }

    .tiles {
      display: grid;
      grid-template-columns: repeat(var(--cols), 2em);
      grid-auto-rows: 1fr;
      justify-items: start;
      gap: 0.5em;
    }

    scrabble-tile {
      transform: translate3d(0, 0, 0);
    }

    scrabble-tile:hover {
      transform: scale(1.1);
    }

    scrabble-tile:active {
      transform: scale(1);
    }

    scrabble-tile[distance] {
      grid-column-end: span 2;
      width: 100%;
    }

    [hidden] {
      opacity: 0;
      /*visibility: hidden;*/
    }
  `,
});
