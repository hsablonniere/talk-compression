import { css, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { defineSlideType } from './base.js';

defineSlideType('slide-timeline', {
  render ({ attrs, content }) {
    const markers = (content ?? '')
      .split('\n')
      .filter((line) => line !== '')
      .map(row => row.split(', '))
      .map(([event, date, custom, image]) => {

        return html`
          <article class="container">
            ${image && unsafeHTML(image)}
            <div class="text-wrapper">
              ${event && html`<h2>${event}</h2>`}
              ${date && html`<date>${date}</date>`}
              ${custom && html`<aside>
              ${unsafeHTML(custom)}
            </aside>`}
            </div>
          </article>
        `
      })

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
      --timeline-duration: 600ms;  
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
    
     :host([year='2010']) h2 {
         display: inline-block;
         font-weight: 400;
         text-align: center;
         white-space: nowrap;
         vertical-align: middle;
         user-select: none;
         padding: 0.375rem 0.75rem;
         font-size: 1rem;
         line-height: 1.5;
         border-radius: 0.25rem;
         color: #fff;
         background-color: #007bff;
         border-color: #007bff;
     }
     
     :host([year='2000']) {
         font-family: 'Comic Sans MS';
         --timeline-background: linear-gradient( to bottom, #bcc6cc, #eee, #bcc6cc);
     }

    :host([year='2000']) .text-wrapper{
        border: solid 1px gray;
        border-radius: 0.5rem;
        padding: 0 0.25rem;
        background: white;
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
         --timeline-background: chartreuse;
         color: chartreuse;
         background: #1a1e21;
     }

     :host([year='1950']) {
         font-family: 'Courier New';
         --timeline-background: black;
     }
    
    .container {
        position: relative;
        flex: 1 1 0;
        inset: 0;
        display: flex;
        flex-direction: column;
        height: 60%;
        align-items: center;
        justify-content: space-around;
    }
    
    .timeline {
        height: 0.5rem;
        width: 100%;
        background: var(--timeline-background);
        transform: translateX(100%);
        transition: transform var(--timeline-duration) ease-in;
    }
    
    :host([data-position="current"][animated]) .timeline {
        transform: translateX(0);
    }

    :host([data-position="current"][animated]) .text-wrapper {
        opacity: 1;
    }
    
    img {
        max-height: 14rem;
        flex: 1 0;
        width: auto;
    }

    .text-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        transition: opacity 800ms ease-in var(--timeline-duration);
    }
    
    h2 {
        margin: 0;
    }
  `,
});
