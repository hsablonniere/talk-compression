import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-gantt', {
  render ({ content, attrs }) {

    const phases = content
      .trim()
      .split('\n')
      .map((line) => {
        const [text, options] = line.split(' : ');
        const shift = Number(options) / 100;
        return { text, shift };
      })
      .map(({ text, shift }, i, all) => {
        const totalShift = all
          .slice(0, i)
          .map((a) => a.shift)
          .reduce((a, b) => a + b, 0) + shift;
        return html`
          <div class="phase" style="margin-left: calc(var(--w) * ${totalShift})">${text}</div>
        `;
      });

    return html`
      <div class="title">${attrs.title}</div>
      <div class="phase-list">${phases}</div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      display: grid;
      grid-template-rows: min-content 1fr;
    }
    
    .title {
      font-family: 'Yanone Kaffeesatz', sans-serif;
      font-size: 3rem;
      font-weight: bold;
      justify-self: center;
      align-self: center;
      padding: 1rem 0px;
    }

    .phase-list {
      display: grid;
      justify-content: center;
      align-content: center;
    }

    .phase {
      font-family: 'Yanone Kaffeesatz', sans-serif;
      background-color: #ccc;
      line-height: 1;
      padding: 0.7rem 0 0.5rem 0;
      font-size: 2rem;
      text-align: center;
      --w: 10rem;
      box-sizing: border-box;
      width: var(--w);
    }

    .phase:nth-child(1) {
      background-color: #4285f4;
      color: #fff;
    }

    .phase:nth-child(2) {
      background-color: #ea4335;
      background-color: #333;
      color: #fff;
    }

    .phase:nth-child(3) {
      background-color: #4285f4;
      color: #fff;
    }

    .phase:nth-child(4) {
      background-color: #666;
      color: #fff;
    }

    .phase:nth-child(5) {
      background-color: #888;
      color: #fff;
    }
  `,
});
