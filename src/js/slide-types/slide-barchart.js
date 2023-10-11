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
        <div>${unsafeHTML(markup(title))}</div>
        ${attrs.logo != null ? html`
          <img class="title-logo" src="src/img/logo-${attrs.logo}.svg" alt="">
        ` : ''}
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
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    strong {
      color: #0082ff;
    }

    .underline {
      text-decoration: underline;
    }

    em {
      margin-left: 1rem;
      font-style: normal;
      color: #666;
      font-size: 2rem;
    }
    
    .title-logo {
      display: none;
      height: 3rem;
    }

    .container {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      align-content: center;
      justify-content: center;
    }

    .section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .bar {
      height: 18rem;
      position: relative;
      width: 2.5rem;
    }

    :host([narrow]) .bar {
      width: 1.75rem;
    }

    .section.comment .bar {
      visibility: hidden;
    }

    .bar-label {
      bottom: 100%;
      box-sizing: border-box;
      font-family: "Operator Mono Medium", monospace;
      font-size: 1.5rem;
      left: 50%;
      padding-bottom: 0.5rem;
      position: absolute;
      text-align: center;
      transform-origin: center center;
      transform: translateX(-50%) scale(1, 1);
      white-space: nowrap;
    }

    :host([small]) .bar-label {
      font-size: 1.25rem;
    }

    .unit {
      padding-left: 0.25rem;
      font-size: 0.8em;
      vertical-align: baseline;
      color: #777;
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
      background-color: #4285f4;
      border: 0.15rem solid #000;
      border-bottom: none;
    }

    .bar-value[data-color="brut"] {
      background-color: #ea4335;
    }

    .bar-value[data-color="min"] {
      background-color: #fbbc04;
    }

    .bar-value[data-color="compressed"] {
      background-color: #ff1493;
    }

    .bar-value[data-color="gzip"] {
      background-color: #4285f4;
    }

    .bar-value[data-color="zopfli"] {
      background-color: #46bdc6;
    }

    .bar-value[data-color="brotli"] {
      background-color: #34a853;
    }

    .legend {
      border-top: 0.15rem solid #000;
      box-sizing: border-box;
      font-family: "Operator Mono Medium", monospace;
      font-size: 1.4rem;
      line-height: 1.5;
      padding: 0.5rem 1rem;
      text-align: center;
      width: 100%;
    }


    :host([small]) .legend {
      min-width: 5rem;
    }


    :host([narrow]) .legend {
      padding: 0.5rem 0.75rem;
    }

    .section.comment .legend {
      color: transparent;
    }
  `,
});
