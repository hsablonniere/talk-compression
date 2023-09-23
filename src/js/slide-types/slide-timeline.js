import { css, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { defineSlideType } from './base.js';
import { getMeta, getTitle, markup, pipeline } from '../utils.mjs';

defineSlideType('slide-timeline', {
  render ({ attrs, content }) {
    const markers = (content ?? '')
      .split('\n')
      .filter((line) => line !== '')
      .map(row => row.split(', '))
      .map(row => console.log(row) || row)
      .map(([event, date, custom, image]) => {

        return html`
          <article class="container">
            ${image && unsafeHTML(image)}
            ${date && html`<date>${date}</date>`}
            ${event && html`<h2>${event}</h2>`}
            ${custom && html`<aside>
              ${unsafeHTML(custom)}
            </aside>`}
          </article>
        `
      })

    console.log(content)

    return html`
      <div class="absolute-fill">
        <div class="timeline"></div>
      </div>
      <div class="absolute-fill dates">
        ${markers}
      </div>
    `;
  },
  // language=CSS
  styles: css`
      
    :host {
      position: relative;
      font-family: 'Yanone Kaffeesatz', sans-serif;
      background: #fff;
    }
    
    .dates {
        justify-content: space-evenly;
    }
    
    .absolute-fill {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
    }
    
    :host([year='2023']) {
        --timeline-background: var(--color-c);
    }

     :host([year='2010']) {
         font-family: 'Helvetica Neue';
         --timeline-background: #337ab7;
     }
    

     :host([year='2000']) {
         font-family: 'Comic Sans MS';
         --timeline-background: linear-gradient( to bottom, #bcc6cc, #eee, #bcc6cc);
     }

     :host([year='1990']) {
         font-family: 'sans-serif';
         --timeline-background: #cccc99;
     }

     :host([year='1980']) {
         font-family: 'DOS VGA';
         --timeline-background: #C0C0C0;
         background: #0000FF;
         color: #C0C0C0;
     }

     :host([year='1970']) {
         font-family: 'Courier New';
         --timeline-background: #f06a95;
     }

     :host([year='1950']) {
         font-family: 'Courier New';
         --timeline-background: #000;
     }
    
    .container {
        position: relative;
        flex: 1 1 0px;
        inset: 0;
        display: flex;
        flex-direction: column;
        height: 10em;
        align-items: center;
        justify-content: space-around;
        opacity: 0;
        transition: opacity 800ms ease-in;
    }
    
    date::after{
        position: absolute;
        top: -0.5em;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scale(0);
        content: '';
        height: 1.5em;
        width: 1.5em;
        border-radius: 50%;
        background: var(--timeline-background);
    }
    
    .timeline {
        height: 0.5em;
        width: 100%;
        background: var(--timeline-background);
        transform: translateX(100%);
        transition: transform 600ms ease-in;
    }
    
    :host([data-position="current"][animated]) .timeline {
        transform: translateX(0);
    }

    :host([data-position="current"][animated]) .container {
        opacity: 1;
    }
    
    img {
        height: 300px;
        width: auto;
    }
  `,
});
