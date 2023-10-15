import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-tip', {
  render ({ content }) {

    const [number, tip] = content.trim().split(') ');

    return html`
      <div class="scrabble-board">
        <img src="/src/img/scrabble-empty.svg" alt="">
      </div>
      <div class="background"></div>
      <div class="tip-number">${number}</div>
      <div class="tip-text">${tip}</div>
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
      position: relative;
      display: grid;
      grid-template-columns: 1fr var(--nb-half-size) var(--nb-half-size) 2fr;
      grid-template-rows: 1fr 1fr;
    }

    .scrabble-board {
      grid-area: 1 / 1 / 3 / 3;
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
      grid-area: 1 / 3 / 3 / 5;
      z-index: 2;
    }

    .tip-number,
    .tip-text {
      color: #fff;
      font-family: 'Interstate', sans-serif;
    }

    .tip-number {
      grid-area: 1 / 2 / 2 / 4;
      font-size: 3.5rem;
      background-color: #ee2325;
      text-align: center;
      font-family: 'Sufler', sans-serif;
      z-index: 3;
      align-self: end;
      height: calc(var(--nb-half-size) * 2);
      line-height: calc(var(--nb-half-size) * 2);
    }

    .tip-text {
      align-self: start;
      padding: 3rem;
      box-sizing: border-box;
      grid-area: 2 / 3 / 3 / 5;
      font-size: 2.5rem;
      line-height: 1.4;
      z-index: 3;
    }
  `,
});
