import { css, html } from 'lit';
import '../scrable-tile.js';
import { defineSlideType } from './base.js';

const clone = (object) => JSON.parse(JSON.stringify(object))

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

    while(cursorIndex <= stepToShow) {
      const stepRead = []
      const stepWrite = currentLetter > 0 ? clone(write[cursorIndex - 1]) : []
      const currentTag = tags.find(tag => tag.startIndex === currentLetter)

      for(let i = 0; i < phraseArray.length; i++){
        stepRead.push({
          letter: phraseArray[i],
          ghost: i > currentLetter - 1
        })
      }

      if (currentTag) {
        stepWrite.push({
          letter: `${currentTag.content} < ${currentTag.ref} , ${currentTag.length} >`
        })
        currentLetter+=currentTag.length
      } else {
        stepWrite.push({
          letter: phraseArray[currentLetter - 1]
        })
        currentLetter++;
      }
      read.push(stepRead)
      write.push(stepWrite)
      cursorIndex++;
    }

    return html`
        <div class="read">
          ${read[stepToShow].map(({letter, ghost}, index) => html`
            <scrabble-tile data-index=${index} .letter=${letter} ghost=${ghost}></scrabble-tile>
          `)}
        </div>
        <div class="write">
          ${write[stepToShow].map(({letter, ghost}) => html`
            <scrabble-tile .letter=${letter} ghost=${ghost}></scrabble-tile>
          `)}
        </div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3em;
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
