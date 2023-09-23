import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { markup } from '../utils.mjs';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const TIMELINE_REGEX = /^\* ([^:]*): (.*) (<img.*)$/;

function select (html, selector) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  return Array.from(tpl.content.querySelectorAll(selector));
}

defineSlideType('slide-code', {
  render ({ content, attrs }) {

    const codeBlocks = select(content, 'pre');

    return html`
      ${attrs.title != null ? html`
        <div class="title">${unsafeHTML(markup(attrs.title))}</div>
      ` : ''}
      <div class="code-blocks">
        ${codeBlocks}
      </div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      position: relative;
      display: grid;
      align-content: center;
      gap: 1rem;
      justify-content: center;
    }

    .title {
      font-family: 'Yanone Kaffeesatz', sans-serif;
      font-size: 4rem;
      font-weight: bold;
      line-height: 1.2;
      text-align: center;
      color: #000;
    }

    .title strong {
      color: #0082ff;
    }

    .underline {
      text-decoration: underline;
    }

    pre[data-lang][hide] {
      visibility: hidden;
    }

    pre[data-lang][hide-height] {
      height: 0;
      overflow: hidden;
      padding-top: 0;
      padding-bottom: 0;
      margin-top: 0;
      margin-bottom: 0;
      border-top-width: 0;
      border-bottom-width: 0;
    }

    pre[type] {
      position: relative;
      margin-top: 1rem;
      padding-top: 1.5rem;
      /* cond request */
      /*background-color: #fafafa;*/
      border: 0.15rem solid #bbb;
      /*border: 0.15rem solid transparent;*/
    }

    pre[type]::before {
      content: attr(label);
      display: block;
      background-color: #333;
      color: #fff;
      position: absolute;
      top: -1rem;
      height: 2rem;
      line-height: 2rem;
      padding: 0 0.5rem;
      border-radius: 0.25rem;
    }

    pre[type="request"]::before {
      content: 'Requête HTTP ➡️';
      left: 1rem;
    }

    pre[type="response"]::before {
      content: '⬅️ Réponse HTTP';
      right: 1rem;
    }

    /* cond request */
    pre[status="304"] {
      background: none;
      border: 0.15rem dotted #bbb;
    }

    pre[data-lang="http"] .hljs-meta {
      color: #999 !important;
    }

    pre[data-lang="http"] .hljs-attribute {
      color: #050D9E !important;
    }
  `,
});
