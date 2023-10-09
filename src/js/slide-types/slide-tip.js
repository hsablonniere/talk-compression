import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-tip', {
  render ({ content, attrs }) {

    const items = content
      .trim()
      .split('\n')
      .map((rawTxt, i) => {
        const [number, tip] = rawTxt.trim().split(') ');
        return html`
          <div class="tip">
            <div class="star">${number}</div>
            <div class="text">${tip}</div>
          </div>
        `;
      });

    return items;
  },
  // language=CSS
  styles: css`
    :host {
      display: grid;
      grid-template-columns: auto 40rem;
      grid-template-columns: auto auto;
      justify-content: center;
      align-content: center;
      gap: 0.25rem 1rem;
    }

    .tip {
      display: contents;
    }

    /*.tip > * {*/
    /*  opacity: 0.25;*/
    /*}*/

    .tip:last-child > * {
      opacity: 1;
    }

    .star {
      background-image: url(src/img/tile-center.svg);
      background-size: contain;
      background-repeat: no-repeat;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      color: #ffffff;
      font-family: Interstate;
      font-size: 0.75rem;
      width: 2rem;
    }

    .text {
      font-family: Interstate;
      font-size: 1.75rem;
      line-height: 1.4;
      /*margin-top: 1rem;*/
    }
  `,
});
