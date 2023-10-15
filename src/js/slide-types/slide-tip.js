import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-tip', {
  render ({ content }) {

    const [number, tip] = content.trim().split(') ');

    return html`
      <div class="scrabble-board">
        <img src="/src/img/scrabble-empty.svg" alt="">
      </div>
      <div class="background">
        <div class="tip-text">${tip}</div>
      </div>
    `;
  },
  // language=CSS
  styles: css`
    @keyframes slide-out {
      0% {
        transform: scale(1.8) translateX(-5%) rotate(30deg) translateY(0%);
      }
      100% {
        transform: scale(1.8) translateX(-5%) rotate(30deg) translateY(-10%);
      }
    }

    :host {
      --nb-half-size: 3rem;
      display: grid;
      grid-template-columns: 1fr 2fr;
    }

    .scrabble-board {
    }

    img {
      position: absolute;
      object-fit: contain;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      animation: slide-out linear infinite alternate 30s;
    }

    .background {
      background-color: #2f6646;
      z-index: 2;
      display: flex;
    }

    .tip-text {
      color: #fff;
      font-family: 'Interstate', sans-serif;
    }

    .tip-text {
      margin: auto;
      padding: 0 3rem;
      box-sizing: border-box;
      font-size: 2.5rem;
      line-height: 1.4;
      z-index: 3;
    }
  `,
});
