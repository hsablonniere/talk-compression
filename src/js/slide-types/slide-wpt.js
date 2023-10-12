import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { defineSlideType } from './base.js';
import { entriesToObject, markup, toCamelCase } from '../utils.mjs';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

function getAttributes (elementHtml) {
  const tpl = document.createElement('template');
  tpl.innerHTML = elementHtml;
  const element = tpl.content.firstChild;
  return element
    .getAttributeNames()
    .map((name) => [toCamelCase(name), element.getAttribute(name)])
    .reduce(entriesToObject, {});
}

defineSlideType('slide-wpt', {
  render ({ attrs, content }) {

    const media = content
      .split('\n')
      .find((line) => line.startsWith('<img ') || line.startsWith('<video '));

    return html`
      <div class="title">${unsafeHTML(markup(attrs.title))}</div>
      <div class="media">${unsafeHTML(media)}</div>
    `;
  },
  // language=CSS format=false
  styles: css`
    :host {
      background-color: #fff;
      display: grid;
      grid-template-rows: min-content 1fr;
    }

    .title {
      align-self: center;
      justify-self: center;
      font-size: 3rem;
      font-weight: bold;
      padding: 1rem 0;
      font-family: 'Yanone Kaffeesatz', sans-serif;
    }

    .title strong {
      color: #0082ff;
    }
    
    em {
      margin-left: 1rem;
      font-style: normal;
      color: #666;
      font-size: 2rem;
    }
    
    .media {
      position: relative;
    }
    
    .media > video {
      display: block;
      left: 0;
      object-fit: contain;
      object-position: center center;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
    }
  `,
});
