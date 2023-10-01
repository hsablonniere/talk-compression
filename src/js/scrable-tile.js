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

    return html`
      ${this.count != null ? html`
        <div class="count">${this.count}</div>
      ` : ''}
      ${this.letter != null ? html`
        <div class="tile">
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
          --count-shift: -0.25em;
          align-items: center;
          display: flex;
          flex-direction: column;
          font-family: "Interstate", sans-serif;
          width: var(--tile-size);
        }

        :host([letter][count=""]) .count {
        }

        .count {
          --count-size: 1.5em;
          background-color: #000;
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
          background-color: #fff;
          color: #000;
          border: 2px solid #000;
        }

        .tile {
          background-color: #ffffa1;
          border-radius: 0.2em;
          border: 0.05em solid #000;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          height: var(--tile-size);
          position: relative;
          user-select: none;
          width: var(--tile-size);
        }

        .count ~ .tile {
          margin-top: var(--count-shift);
        }

        .letter {
          font-size: 1.5em;
          line-height: 1em;
          font-weight: bold;
          margin: auto;
        }

        .score {
          --score-size: 1.2em;
          bottom: 0;
          font-size: 0.4em;
          font-weight: bold;
          height: var(--score-size);
          line-height: var(--score-size);
          position: absolute;
          right: 0;
          text-align: center;
          width: var(--score-size);
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
