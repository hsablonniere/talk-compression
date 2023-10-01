import '../src/js/scrable-tile.js';
import { LETTERS } from '../src/js/scrable-tile.js';

const $demo = document.querySelector('.demo');

const lettersAndSpace = [...Object.keys(LETTERS), ' '];

function createLine (getProperties) {

  const $line = document.createElement('div');
  $line.classList.add('line');

  lettersAndSpace.forEach((letter, i) => {
    const properties = getProperties(letter, i);
    const $tile = document.createElement('scrabble-tile');
    for (const [name, value] of Object.entries(properties)) {
      $tile[name] = value;
    }
    $line.appendChild($tile);
  });

  $demo.appendChild($line);
}

createLine((letter) => ({ letter }));

createLine((letter, i) => ({
  letter,
  count: String(i),
}));

createLine((letter, i) => ({
  count: String(i),
}));

createLine((letter, i) => ({
  letter,
  score: 'auto',
}));

createLine((letter, i) => ({
  letter,
  score: 'auto',
}));

createLine((letter, i) => ({
  letter,
  score: 8,
  bits: 'auto',
}));

createLine((letter, i) => ({
  letter,
  score: String(Math.floor(i / 3)),
}));

createLine((letter, i) => ({
  letter,
  id: 'id-' + i,
}));
