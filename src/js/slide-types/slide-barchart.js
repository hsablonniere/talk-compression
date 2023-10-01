import { css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { defineSlideType } from './base.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// <div className="chart bytes ${classMap({ dim: this._dimBytes })}">
//   <div className="chart-bars">
//     ${this._bytesData.map(({ value, percent }) => html`
//             <div class="bar">
//               <div class="bar-value" style="--bar-percent: ${percent}">
//                 <div class="bar-label">${formatBytes(value)}</div>
//               </div>
//             </div>
//           `)}
//   </div>
//   <div className="chart-title">Taille (Ko)</div>
// </div>
//
// <div className="chart requests ${classMap({ dim: this._dimRequests })}">
//   <div className="chart-bars">
//     ${this._requestsData.map(({ value, percent }) => html`
//             <div class="bar">
//               <div class="bar-value" style="--bar-percent: ${percent}">
//                 <div class="bar-label">${value}</div>
//               </div>
//             </div>
//           `)}
//   </div>
//   <div className="chart-title">Requêtes</div>
// </div>
//
// <div className="chart time ${classMap({ dim: this._dimTime })}">
//   <div className="chart-bars">
//     ${this._timeData.map(({ value, percent }) => html`
//             <div class="bar">
//               <div class="bar-value" style="--bar-percent: ${percent}">
//                 <div class="bar-label">${formatSeconds(value)}</div>
//               </div>
//             </div>
//           `)}
//   </div>
//   <div className="chart-title">Temps (secs)</div>
// </div>
//
// <div className="legend">
//   ${this._legend.map((legend) => html`
//           <div class="legend-entry">
//             <div class="legend-color"></div>
//             <div class="legend-text">${legend}</div>
//           </div>
//         `)}
// </div>

defineSlideType('slide-barchart', {
  render ({ content }) {

    const [title, ...parts] = content
      .trim()
      .split('\n')
      .map((line) => line.trim());

    const sections = parts
      .map((line) => {
        const [rawLabel, valueAndUnit] = line.split(' : ').map((a) => a.trim());
        const isCommented = rawLabel.startsWith('// ');
        const label = rawLabel.replace('// ', '');
        const value = valueAndUnit.replace(/[^0-9\.,]/g, '');
        const unit = valueAndUnit.replace(value, '');
        return { label, value, unit, isCommented };
      })
      .map((section, i, all) => {
        const max = Math.max(...all.map((s) => s.value));
        const percent = (section.value * 100) / max;
        return { ...section, percent };
      });

    const maxValue = Math.max(...sections.map((s) => s.value));

    return html`

      <div class="title">
        ${title}
      </div>

      <div class="container">
        ${sections.map(({ label, value, unit, isCommented, percent }) => html`
          <div class="section ${classMap({ comment: isCommented })}">
            <div class="bar">
              <div class="bar-value" style="--bar-percent: ${percent}">
                <div class="bar-label">${value} ${unit}</div>
              </div>
            </div>
            <div class="legend">${unsafeHTML(label)}</div>
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
      font-size: 2rem;
      font-weight: bold;
      padding: 1rem 0;
      font-family: "Interstate", sans-serif;
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
      box-sizing: border-box;
      font-family: "Operator Mono Medium", monospace;
      font-size: 1.25rem;
      font-weight: bold;
      padding-bottom: 0.5rem;
      position: absolute;
      text-align: center;
      white-space: nowrap;
    }

    .bar-value {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: calc(var(--bar-percent) * 1%);
      background-size: 100% auto;
      background-image: url(/src/img/drawn-rectangle-3.svg);
    }

    .section:nth-child(1n) .bar .bar-value {
      /*background-image: url(/src/img/drawn-rectangle-1.svg);*/
    }

    .section:nth-child(2n) .bar .bar-value {
      /*background-image: url(/src/img/drawn-rectangle-2.svg);*/
    }

    .section:nth-child(3n) .bar .bar-value {
      /*background-image: url(/src/img/drawn-rectangle-3.svg);*/
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
