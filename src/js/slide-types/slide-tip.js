import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { markup } from '../utils.mjs';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

defineSlideType('slide-tip', {
  render ({ attrs, content }) {

    const tips = content
      .trim()
      .split('\n')
      .map((line) => {
        const [number, tip] = line.split(') ');
        const formattedTip = tip.replace('La compression, ', 'La compression, <br>');
        return (attrs.recap != null)
          ? html`<span class="number">${number}</span> <span class="tip">${unsafeHTML(markup(formattedTip))}</span>`
          : unsafeHTML(markup(formattedTip));
      });

    return html`
      <img class="scrabble-board" src="/src/img/scrabble-empty.svg" alt="">
      <div class="background">
        <img class="qrcode" src="/src/img/qr-code.png" alt="">
        ${tips.map((tip) => html`
          <div class="tip-text">${tip}</div>
        `)}
      </div>
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

    .background {
      background-color: #2f6646;
      z-index: 2;
      margin: 6rem;
      padding: 3rem;
    }

    :host([recap]) .background {
      display: grid;
      grid-template-columns: min-content 1fr;
      gap: 0 1.5rem;
      position: relative;
    }

    .qrcode {
      position: absolute;
      top: 2rem;
      right: 2rem;
      width: 7rem;
    }

    :host(:not([recap])) .qrcode {
      display: none;
    }

    .tip-text {
      color: #fff;
      font-family: 'Interstate', sans-serif;
      margin: auto;
      box-sizing: border-box;
      font-size: 2.5rem;
      line-height: 1.4;
      z-index: 3;
    }

    :host([recap]) .tip-text {
      font-size: 1.7rem;
      display: contents;
    }

    .number {
      text-align: right;
      text-align: center;
    }
  `,
});
