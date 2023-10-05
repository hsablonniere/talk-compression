import { css, html } from 'lit';
import '../scrable-tile.js';
import { defineSlideType } from './base.js';

defineSlideType('slide-lz', {
  render ({ attrs, content }) {
   const stepToShow = parseInt(attrs.step, 10);
   const [phrase, ...rawTags] = (content ?? '')
     .split('\n')
     .filter((line) => line !== '')
    const phraseArray = phrase.toUpperCase().split('');
    const tags = rawTags.map(rawTag => {
      const [startIndex, length, ref, content] = rawTag.split(',')
      return ({
        startIndex: parseInt(startIndex, 10),
        length: parseInt(length, 10),
        ref: parseInt(ref, 10),
        content: content
      })
    })

    let currentLetter = 0;
    let cursorIndex = 0;
    const read = [];
    const write = [];

    while(currentLetter <= stepToShow) {
      const stepRead = []
      const stepWrite = []
      const currentTag = tags.find(tag => tag.startIndex === currentLetter)

      for(let i = 0; i < phraseArray.length; i++){
        stepRead.push(html`
          <scrabble-tile .letter=${phraseArray[i]} ghost=${i > currentLetter - 1}></scrabble-tile>
        `)
      }

      for(let i = 0; i < currentLetter; i++){
        stepWrite.push(html`
          <scrabble-tile .letter=${phraseArray[i - 1]}></scrabble-tile>
        `)
      }

      if (currentTag) {
        stepWrite.push(html`
          <div class='tag'>
            <h2>${currentTag.content}</h2>
            <h1>< ${currentTag.ref} , ${currentTag.length} ></c></h1>
          </div>
        `)
        currentLetter+=currentTag.length
      } else {
        stepWrite.push(html`
          <scrabble-tile .letter=${phraseArray[currentLetter - 1]}></scrabble-tile>
        `)
        currentLetter++;
      }
      read.push(stepRead)
      write.push(stepWrite)
    }

    return html`
        <h2>Avant</h2>
        <div class="read">
          ${read[stepToShow]}
        </div>
        <h2>Après</h2>
        <div class="write">
          ${write[stepToShow]}
        </div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2em;
    } 
    
    h1, h2 {
        margin: 0;
    }
    
    .read, .write, h2 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5em;
    }
    
    .tag {
        border: solid 1px;
        background: chartreuse;
    }
  `,
});
