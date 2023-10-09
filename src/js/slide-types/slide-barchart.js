import { css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { defineSlideType } from './base.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { markup } from '../utils.mjs';

const NNBSP = '\u202f';
const SI_PREFIXES = ['', 'k', 'M', 'G', 'T', 'P'];

const nf = new Intl.NumberFormat('fr', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

export function formatBytes (rawValue) {
  const symbol = 'o';
  const separator = NNBSP;
  // Figure out the "magnitude" of the rawValue: 1000 => 1 / 1000000 => 2 / 1000000000 => 3 ...
  const prefixIndex = (rawValue > 1)
    ? Math.floor(Math.log10(rawValue) / 3)
    : 0;
  // Use the prefixIndex to "rebase" the rawValue into the new base, 1250 => 1.25 / 1444000 => 1.444...
  const rebasedValue = rawValue / 1000 ** prefixIndex;
  // Use Intl/i18n aware number formatter
  const formattedValue = nf.format(rebasedValue);
  const prefix = SI_PREFIXES[prefixIndex];
  return html`${formattedValue}<strong class="unit">${prefix + symbol}</strong>`;
}

function format (value, unit) {
  if (unit == null) {
    return formatBytes(value);
  }
  if (unit === '') {
    return html`${nf.format(value)}`;
  }
  return html`${nf.format(value)}<strong class="unit">${unit}</strong>`;
}

defineSlideType('slide-barchart', {
  render ({ attrs, content }) {

    const unit = attrs.unit;

    const [title, ...parts] = content
      .trim()
      .split('\n')
      .map((line) => line.trim());

    const sections = parts
      .map((line) => {
        const [rawLabel, rawDetails] = line.split(' : ').map((a) => a.trim());
        const [rawValue, color = '#888'] = rawDetails.split(' ');
        const isCommented = rawLabel.startsWith('// ');
        const label = rawLabel.replace('// ', '');
        const value = Number(rawValue);
        return { label, value, isCommented, color };
      })
      .map((section, i, all) => {
        const max = Math.max(...all.map((s) => s.value));
        const percent = (section.value * 100) / max;
        return { ...section, percent };
      });

    const maxValue = Math.max(...sections.map((s) => s.value));

    return html`

      <div class="title">
        ${unsafeHTML(markup(title))}
      </div>

      <div class="container">
        ${sections.map(({ label, value, isCommented, color, percent }) => html`
          <div class="section ${classMap({ comment: isCommented })}">
            <div class="bar">
              <div class="bar-value" style="--bar-percent: ${percent}" data-color="${color}">
                ${attrs.percent == null ? html`
                  <div class="bar-label">${format(value, unit)}</div>
                ` : ''}
                ${attrs.percent != null ? html`
                  <div class="bar-label">${format(percent, '%')}</div>
                ` : ''}
              </div>
            </div>
            <div class="legend">${unsafeHTML(markup(label))}</div>
          </div>
        `)}
      </div>

    `;
  },
  // language=CSS
  styles: css`
    :host {
      display: grid;
      grid-template-rows: min-content 1fr;
      justify-content: center;
    }

    .title {
      align-self: center;
      justify-self: center;
      font-size: 3rem;
      font-weight: bold;
      padding: 1rem 0;
      font-family: 'Yanone Kaffeesatz', sans-serif;
    }

    strong {
      color: #0082ff;
    }

    .underline {
      text-decoration: underline;
    }

    em {
      font-style: normal;
      color: #666;
    }

    .container {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      justify-items: stretch;
      align-content: center;
      justify-content: center;
    }

    .section {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;
    }

    .bar {
      height: 18rem;
      position: relative;
      width: 3rem;
      width: 2rem;
    }

    .section.comment .bar {
      visibility: hidden;
    }

    .bar-label {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      box-sizing: border-box;
      font-family: "Operator Mono Medium", monospace;
      font-size: 1.5rem;
      font-weight: bold;
      padding-bottom: 0.5rem;
      position: absolute;
      text-align: center;
      white-space: nowrap;
    }

    :host([compact]) .bar-label,
    :host([small]) .bar-label {
      font-size: 1.25rem;
    }

    :host([compact]) .bar-label {
      transform: translateX(-20%) rotate(-30deg);
      transform-origin: left center;
    }

    .unit {
      padding-left: 0.5rem;
      color: #666;
    }

    .bar-value {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: calc(var(--bar-percent) * 1%);
      /*background-size: 100% auto;*/
      /*background-image: url(/src/img/drawn-rectangle-3.svg);*/
      background-color: #aaa;
      border: 0.15rem solid #000;
      border-bottom: none;
    }

    .bar-value[data-color="brut"] {
      background-color: #888;
    }

    .bar-value[data-color="min"] {
      background-color: green;
    }

    .bar-value[data-color="compressed"] {
      background-color: pink;
    }

    .bar-value[data-color="gzip"] {
      background-color: blue;
    }

    .bar-value[data-color="zopfli"] {
      background-color: orange;
    }

    .bar-value[data-color="brotli"] {
      background-color: red;
    }

    .legend {
      border-top: 0.15rem solid #000;
      padding: 0.25rem 1rem;
      padding: 0.25rem 0.75rem;
      text-align: center;
      font-size: 1.25rem;
      width: 100%;
      font-family: "Operator Mono Medium", monospace;
    }

    .section.comment .legend {
      color: transparent;
    }
  `,
});
