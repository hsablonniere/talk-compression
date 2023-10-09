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
    ).toUpperCase();

    return html`
      <img src="/src/img/scrabble-empty.svg" alt="" />
      <div class="title">
        ${unsafeHTML(title)}
      </div>
      <div class="background"></div>
      <div class="details details--bottom">
        <h2 class='event-title'>${meta.event} / <span class="date">${meta.date}</span></h2>
        
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Rézosocios</th>
              <th>Entreprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Caron</td>
              <td>Antoine</td>
              <td>@Slashgear_</td>
              <td>Scaleway</td>
            </tr>
            <tr>
              <td>Sablonnière</td>
              <td>Hubert</td>
              <td>@hsablonniere</td>
              <td>Clever Cloud</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },
  // language=CSS
  styles: css`
    @keyframes slide-out {
      0% {
        transform: scale(1.8) translateX(-5%) rotate(30deg) translateY(0%);
      }
      100% {
        transform: scale(1.8) translateX(-5%) rotate(30deg) translateY(-10%);
      }
    }

    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    }

    .date {
      font-family: 'Just Another Hand';
      color: #0019a4;
      font-size: 1.25em;
      font-weight: normal;
    }

    .details--bottom {
      position: absolute;
      display: flex;
      flex-direction: column;
      right: -0%;
      bottom: -50%;
      width: 45%;
      height: 30em;
      padding: 1em 3em;
      background-color: white;
      color: black;
      transform: rotate(-10deg) scale(1);
    }

    .details--bottom .event-title {
      text-align: center;
      font-family: Interstate;
    }

    .title {
      background: red;
      font-size: 3.5em;
      z-index: 1;
      padding: 0 0.75ch;
      margin-bottom: 12rem;
      transform: scale(1, 1.2);
      font-family: "VFC Sufler";
    }

    img {
      position: absolute;
      object-fit: contain;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      animation: slide-out linear infinite alternate 30s;
    }

    h2 {
      margin: 0.25em 0;
    }

    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }

    td {
      text-align: left;
    }

    th {
      font-family: Interstate;
    }

    td {
      font-family: "Just Another Hand";
      color: #0019a4;
      font-size: 2.25em;
      padding: 0.5rem 0.6rem 0 0.6rem;
      line-height: 1.75rem;
      white-space: nowrap;
      min-height: 2rem;
    }

    .background {
      background-color: #2f6646;
      position: absolute;
      left: 33%;
      top: 0;
      bottom: 0;
      right: 0;
    }
  `,
});
