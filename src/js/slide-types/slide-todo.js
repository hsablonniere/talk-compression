import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

defineSlideType('slide-todo', {
  render ({ content }) {
    let text = (content ?? '')
      .split('\n')
      .filter((line) => line !== '')
      .map((rawLine) => {
        return html`
          <mark>${unsafeHTML(rawLine)}</mark>
        `;
      });
    return html`${text} <div class="todo-banner">TODO</div>`;
  },
  // language=CSS
  styles: css`
    :host {
      align-content: center;
      display: grid;
      gap: 1rem;
      justify-content: center;
      position: relative;
    }
  `,
});
