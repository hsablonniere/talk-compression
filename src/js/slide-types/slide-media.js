import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { entriesToObject, toCamelCase } from '../utils.mjs';
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

defineSlideType('slide-media', {
  render ({ content }) {

    const media = content
      .split('\n')
      .find((line) => line.startsWith('<img ') || line.startsWith('<video '));

    const mediaAttrs = getAttributes(media);

    const browserUrl = mediaAttrs.screenshotUrl
      ?? mediaAttrs.browserUrl
      ?? null;

    return html`
      ${browserUrl != null ? html`
        <div class="browser">
          <figcaption class="url">
            <a href="${browserUrl}" target="_blank" rel="noopener">${browserUrl}</a>
          </figcaption>
          ${unsafeHTML(media)}
        </div>
      ` : ''}
      ${browserUrl == null ? html`
        ${unsafeHTML(media)}
      ` : ''}
    `;
  },
  // language=CSS
  styles: css`
    :host {
      background-color: #000;
      position: relative;
    }

    :host([white]),
    :host([logo]:not([black])) {
      background-color: #fff;
    }

    :host > img,
    :host > video {
      position: absolute;
      left: 0;
      top: 0;
      object-fit: cover;
      object-position: center;
      height: 100%;
      width: 100%;
    }

    :host([contain]) img,
    :host([logo]) img,
    :host([contain]) video,
    :host([logo]) video {
      object-fit: contain;
    }

    :host([logo]) img,
    :host([logo]) video {
      top: 30%;
      left: 25%;
      height: 40%;
      width: 50%;
    }

    :host([top]) img,
    :host([top]) video {
      object-position: top center;
    }

    .browser {
      background-color: #ddd;
      background-image: url(/src/img/browser-buttons.svg);
      background-position: top 0.8rem left 0.4rem;
      background-repeat: no-repeat;
      background-size: auto 1.5rem;
      border-radius: 0.3rem 0.3rem 0 0;
      border: 2px solid #aaa;
      border-bottom-width: 0;
      display: flex;
      flex-direction: column;
      margin: 0.5rem 0.5rem 0 0.5rem;
      overflow: hidden;
    }

    .url {
      background-color: var(--color-f);
      border-radius: 0.3rem;
      border: 1px solid #ccc;
      flex: 0 0 auto;
      font-family: Boogaloo, sans-serif;
      font-size: 1.2rem;
      margin: 0.5rem 0.5rem 0.5rem 6.5rem;
      order: -1;
      overflow: hidden;
      padding: 0 0.4rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .url a {
      color: var(--color-a);
      text-decoration: none;
    }

    .url a:hover {
      text-decoration: underline;
    }

    .browser img {
      border-top: 1px solid #ccc;
      object-fit: cover;
      object-position: center top;
    }
  `,
});
