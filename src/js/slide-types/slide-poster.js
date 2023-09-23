import { css, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { defineSlideType } from './base.js';
import { getMeta, getTitle, markup, pipeline } from '../utils.mjs';

defineSlideType('slide-poster', {
  render ({ attrs, content }) {

    const meta = getMeta();
    const title = pipeline(
      content ?? getTitle(),
      (text) => text.replace(', ', ' '),
      markup,
    );

    return html`
      <img src="/src/img/plan-metro.svg" alt="">
      <div class="details details--top">
        <div class="date">${meta.date}</div>
        <div class="event">${meta.event}</div>
      </div>
      <div class="title">
        ${unsafeHTML(title)}
      </div>
      <div class="details details--bottom">
        <div class="author">${meta.author}</div>
        <div class="author-twitter">${meta.authorTwitter}</div>
        <div class="author-company">${meta.authorCompany}</div>
      </div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      display: grid;
      background-color: #fff;
      grid-template-columns: 1fr;
      grid-template-rows: min-content 1fr min-content;
      grid-template-areas: "header" "title" "footer";
    }

    .details {
    }

    .details--top {
    }

    .details--bottom {
    }

    .title {
    }
  `,
});
