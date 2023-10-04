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

    codeBlocks
      .filter((pre) => pre.hasAttribute('size'))
      .forEach((pre) => {

        const span = document.createElement('span');
        span.classList.add('size');
        pre.appendChild(span);

        if (pre.getAttribute('size') !== '') {
          span.textContent = pre.getAttribute('size');
        }
        else if (pre.hasAttribute('highlight')) {
          span.textContent = pre.textContent.split('\n').filter((l, i) => i % 2 == 0).join('\n').length + 1;
        }
        else {
          span.textContent = pre.textContent.length + 1;
        }
      });

    codeBlocks
      .filter((pre) => pre.hasAttribute('highlight'))
      .forEach((pre) => {
        const highlight = pre.getAttribute('highlight');
        pre.innerHTML = pre.innerHTML
          .split('\n')
          .map((line, i, allLines) => {
            if (i % 2 !== 0) {
              return;
            }
            const highlightLine = allLines[i + 1] ?? '';
            return line
              .split('')
              .map((char, i) => {
                const highlightChar = highlightLine[i];
                return (highlightChar === '_')
                  ? `<mark class="${highlight}">${char}</mark>`
                  : char;
              })
              .join('');
          })
          .filter((a) => a != null)
          .join('<mark>\n</mark>');
      });

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

    pre mark.hide {
      visibility: hidden;
    }

    pre mark.hide-mark {
      color: transparent;
    }

    pre[simple-js-example] {
      word-break: break-all;
      width: 34rem;
      height: 23rem;
    }

    pre[size] {
      position: relative;
    }

    .size {
      display: block;
      bottom: 0;
      right: 0;
      position: absolute;
      background-color: #0a8fdf;
      color: #fff;
      padding: 0 1rem;
      transform: translate3d(50%, 50%, 0);
      border-radius: 0.25rem;
      font-weight: bold;
      font-size: 2rem;
    }
  `,
});
