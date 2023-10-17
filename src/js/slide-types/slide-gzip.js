import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import '../../../experiments/gzip-explain.js';

defineSlideType('slide-gzip', {
  render ({ content, attrs }) {

    return html`
      <gzip-explain .mode=${attrs.mode}></gzip-explain>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 2rem;
      cursor: url('/src/img/pointer.svg') 24 15, auto;
    }
    
    gzip-explain {
      font-size: 1.4rem;
      width: 72ch;
    }
  `,
});
