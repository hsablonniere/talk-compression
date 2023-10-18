import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import '../../../experiments/gzip-explain.js';

defineSlideType('slide-gzip', {
  render ({ content, attrs }) {

    return html`
      <gzip-explain .mode=${attrs.mode} .bitIndex=${attrs.bitIndex}></gzip-explain>
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
      font-size: 1.35rem;
      width: 76ch;
    }
  `,
});
