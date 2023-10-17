import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { markup } from '../utils.mjs';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

defineSlideType('slide-demo', {
  render ({ attrs, content }) {

    return html`
      <img class="scrabble-board" src="/src/img/scrabble-empty.svg" alt="">
    `;
  },
  // language=CSS
  styles: css`
    @keyframes slide-out {
      0% {
        transform: scale(2.1) rotate(30deg) translateY(7%);
      }
      100% {
        transform: scale(2.1) rotate(30deg) translateY(-7%);
      }
    }

    :host {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .scrabble-board {
      position: absolute;
      object-fit: contain;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      animation: slide-out linear infinite alternate 30s;
    }
  `,
});
