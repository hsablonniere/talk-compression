import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

defineSlideType('slide-tip', {
  render ({ content }) {
    const [image, rawTxt] = content
      .trim()
      .split('\n');
    const [number, tip] = rawTxt.trim().split(') ');

    return html`
      <div class="board">
        ${unsafeHTML(image)}
      </div>
      <div class="tip">
        <div class="star">${number}</div>
        <div class="text">${tip}</div>
      </div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      display: grid;
      font-family: Interstate, sans-serif;
      grid-template-columns: 3fr 4fr;
      grid-template-rows: 1fr;  
    }
    
    img {
        display: block;
        width: 90%;
    }
    
    .board {
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: solid 0.25em black;
        background-color: #2f6646;
    }
    
    .tip {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 3em;
        gap: 1em;
    }
    
    .star {
      background-image: url(src/img/tile-center.svg);
      background-size: contain;
      background-repeat: no-repeat;
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      color: #ffffff;
      font-size: 1.75rem;
      width: 4rem;
    }

    .text {
      font-size: 1.5rem;
      line-height: 1.4;
    }
  `,
});
