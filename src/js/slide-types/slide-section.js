import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-section', {
  render ({ content }) {

    const lines = content
      .trim()
      .split('  ')
      .map((line) => {
        const letters = line
          .toUpperCase()
          .split('')
          .map((letter) => html`
            <span class="letter" data-letter="${letter}">${letter}</span>
          `);
        return html`
          <div class="line">${letters}</div>
        `;
      });

    return html`
      ${lines}
    `;
  },
  // language=CSS
  styles: css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: #2f6646;
      font-family: "Interstate", "Helvetica Neue", Helvetica, Arial, sans-serif;
      justify-content: center;
      align-items: center;
    }

    .line {
      justify-content: center;
      flex-grow: 0;
      display: flex;
      gap: 3rem 0.5rem;
      flex-wrap: wrap;
      margin: 1rem;
    }

    .letter {
      --size: 3.5rem;
      height: var(--size);
      line-height: var(--size);
      width: 2rem;
    }

    .letter:not([data-letter=" "]) {
      background-color: #f4eaa3;
      border-radius: 0.25rem;
      font-size: calc(var(--size) * 0.85);
      font-weight: bold;
      text-align: center;
      width: var(--size);
      box-shadow: 0 0.35rem 0 0 #e5d377;
      /* */
      /*border: 0.2rem solid #000;*/
      /*border-radius: 0.5rem;*/
    }

  `,
});
