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
      const stepWrite = currentLetter > 0 ? clone(write[cursorIndex - 1]) : clone([{
        letter: phraseArray[currentLetter],
      }])
      const currentTag = tags.find(tag => tag.startIndex === currentLetter)

      for(let i = 0; i < phraseArray.length; i++){
        stepRead.push({
          letter: phraseArray[i],
          ghost: i > currentLetter
        })
      }

      if(currentLetter>0 && !currentTag) {
        stepWrite.push({
          letter: phraseArray[currentLetter]
        })
      }

      if (currentTag) {
        const { ref, length } = currentTag;
        const shiftIndex = currentLetter - ref
        stepWrite.push({
          tag: currentTag,
        })

        for(let i = currentLetter; i < currentLetter + length; i++) {
          stepRead[i].ghost = false;
          stepRead[i].marked = true;
        }

        for(let i = shiftIndex - length; i < shiftIndex ; i++) {
          stepRead[i].marked = true;
        }

        currentLetter+=currentTag.length
      } else {
        currentLetter++;
      }


      read.push(stepRead)
      write.push(stepWrite)
      cursorIndex++;
    }

    return html`
      <div>
        <h2>Avant</h2>
        <div class="read">
          ${read[stepToShow].map(({letter, ghost, marked}, index) => html`
            <scrabble-tile data-index=${index} .letter=${letter} ghost=${ghost} marked=${marked} ></scrabble-tile>
          `)}
        </div>
      </div>
      <div>
        <h2>Après</h2>
        <div class="write">
          ${write[stepToShow].map(({letter, ghost, tag}) => {
            if(tag) {
              return html`
                <div class='tag'>
                    <div>< ${tag.ref}, ${tag.length} ></div>
                </div>
              `
            } else {
              return html`
                <scrabble-tile .letter=${letter} ghost=${ghost}></scrabble-tile>
              `
            }
          })}
        </div>
      </div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
    } 
    
    h1, h2 {
        margin: 0;
        padding: 0 10%;
        font-family: 'Yanone Kaffeesatz';
    }
    
    
    .read, .write {
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        grid-template-rows: repeat(3, 1fr);
        justify-content: left;
        padding: 0 10%;
        gap: 0.5em;
    }
    
    .tag {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: solid 1px;
        background: chartreuse;
        grid-column: span 2;
    }
  `,
});
