import { css, html, LitElement } from 'lit';

export const LETTERS = {
  'A': 1,
  'B': 3,
  'C': 3,
  'D': 2,
  'E': 1,
  'F': 4,
  'G': 2,
  'H': 4,
  'I': 1,
  'J': 8,
  'K': 10,
  'L': 1,
  'M': 2,
  'N': 1,
  'O': 1,
  'P': 3,
  'Q': 8,
  'R': 1,
  'S': 1,
  'T': 1,
  'U': 1,
  'V': 4,
  'W': 10,
  'X': 10,
  'Y': 10,
  'Z': 10,
};

/**
 * TODO DOCS
 */
export class ScrabbleTile extends LitElement {

  static get properties () {
    return {
      id: { type: String, reflect: true },
      count: { type: String, reflect: true },
      letter: { type: String, reflect: true },
      score: { type: String, reflect: true },
      bits: { type: String, reflect: true },
    };
  }

  constructor () {
    super();
  }

  getScore () {
    if (this.score === 'auto') {
      return LETTERS[this.letter] ?? null;
    }
    return this.score;
  }

  getBits () {
    if (this.bits === 'auto') {
      return this.letter.charCodeAt(0).toString(2).padStart(8, '0');
    }
    return this.bits;
  }

  render () {

    const score = this.getScore();
    const bits = this.getBits();
    const version = (this.letter ?? '').charCodeAt(0) % 4;

    return html`
      ${this.count != null ? html`
        <div class="count">${this.count}</div>
      ` : ''}
      ${this.letter != null ? html`
        <div class="tile" data-version=${version}>
          <div class="bg"></div>
          <div class="letter">${this.letter}</div>
          ${score != null ? html`
            <div class="score">${score}</div>
          ` : ''}
        </div>
      ` : ''}
      ${bits != null ? html`
        <div class="bits">${bits}</div>
      ` : ''}
    `;
  }

  static get styles () {
    return [
      // language=CSS
      css`
        :host {
          --tile-size: 2em;
          --count-shift: -0.3em;
          align-items: center;
          display: flex;
          flex-direction: column;
          font-family: "Interstate", sans-serif;
          width: var(--tile-size);
        }

        .count {
          --count-size: 1.6em;
          /*background-color: #000;*/
          border-radius: 50%;
          color: #fff;
          flex: 0 0 auto;
          font-size: 0.7em;
          font-weight: bold;
          height: var(--count-size);
          line-height: var(--count-size);
          text-align: center;
          width: var(--count-size);
          z-index: 2;
          /**/
          /*background-color: #fff;*/
          color: #000;
          /*border: 2px solid #000;*/

          background-image: url(src/img/tile-count.svg);
          background-size: cover;
          background-position: center center;
        }

        .tile {
          /*background-color: #ffffa1;*/
          border-radius: 0.2em;
          /*border: 0.05em solid #000;*/
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          height: var(--tile-size);
          position: relative;
          user-select: none;
          width: var(--tile-size);
        }

        .tile[data-version="0"] {
          transform: translate3d(0, 0, 0) rotate(0.33deg);
        }

        .tile[data-version="1"] {
          transform: translate3d(0, 0, 0) rotate(-0.33deg);
        }

        .tile[data-version="2"] {
          transform: translate3d(0, 0, 0) rotate(0.66deg);
        }

        .tile[data-version="3"] {
          transform: translate3d(0, 0, 0) rotate(-0.66deg);
        }

        .bg {
          background-image: url(src/img/tile.svg);
          background-size: cover;
          background-position: center center;
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .tile[data-version="0"] .bg {
          transform: translate3d(0, 0, 0) rotate(0deg);
          filter: drop-shadow(#ccc 0.1em 0.1em 0.1em);
        }

        .tile[data-version="1"] .bg {
          transform: translate3d(0, 0, 0) rotate(90deg);
          filter: drop-shadow(#ccc 0.1em -0.1em 0.1em);
        }

        .tile[data-version="2"] .bg {
          transform: translate3d(0, 0, 0) rotate(180deg);
          filter: drop-shadow(#ccc -0.1em -0.1em 0.1em);
        }

        .tile[data-version="3"] .bg {
          transform: translate3d(0, 0, 0) rotate(270deg);
          filter: drop-shadow(#ccc -0.1em 0.1em 0.1em);
        }

        .count ~ .tile {
          margin-top: var(--count-shift);
        }

        .letter {
          font-size: calc(var(--tile-size) * 0.7);
          line-height: 1em;
          font-weight: bold;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        .score {
          --score-size: 1.2em;
          bottom: 0.35em;
          font-size: 0.4em;
          font-weight: bold;
          height: var(--score-size);
          line-height: var(--score-size);
          position: absolute;
          right: 0.3em;
          text-align: center;
          width: var(--score-size);
          z-index: 2;
        }

        .bits {
          color: #0082ff;
          font-size: 0.8em;
          font-family: "Operator Mono Medium", monospace;
          font-family: "Just Another Hand";
          font-weight: bold;
        }
      `,
    ];
  }
}

window.customElements.define('scrabble-tile', ScrabbleTile);