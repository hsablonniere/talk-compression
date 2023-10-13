const fs = require('fs');

const NDBITS = [0, 0, 0, 0, 10, 10, 11, 11, 10, 10, 10, 10, 10, 9, 9, 8, 7, 7, 8, 7, 7, 6, 6, 5, 5];
const WORD_LENGTHS = [];

let count = 0;
for (let i = 0; i < NDBITS.length; i++) {
  if (NDBITS[i] > 0) {
    const length = 2 ** NDBITS[i];
    WORD_LENGTHS.push({ length: i, start: count, end: count + length });
    count += length;
  }
}

console.log(WORD_LENGTHS.map(({end,start}, i) => `${i+4} : ${end-start}`).join('\n'));

const dictHex = fs.readFileSync('./src/benchmarks/brotli-dic.hex.txt', 'utf8').trim();
const dictBytes = [];
const dictWords = [];

for (let i = 0; i < dictHex.length; i += 2) {
  const byte = parseInt(dictHex[i] + dictHex[i + 1], 16);
  dictBytes.push(byte);
}

const utf8decoder = new TextDecoder();

let wordCount = 0;
for (let byteIndex = 0; byteIndex < dictBytes.length;) {
  let wordLength = WORD_LENGTHS.find(({ start, end }) => start <= wordCount && wordCount < end);
  wordLength = wordLength.length;
  const word = [];
  for (let byteOffset = 0; byteOffset < wordLength; byteOffset++) {
    word.push(dictBytes[byteIndex + byteOffset]);
  }
  const wordByteArray = new Int8Array(word);
  const decodedWord = utf8decoder.decode(wordByteArray);
  dictWords.push(decodedWord);
  byteIndex += wordLength;
  wordCount += 1;
}

const dictJson = JSON.stringify(dictWords, null, 2);
const dictRaw = dictWords.join('');

fs.writeFileSync('./src/benchmarks/brotli-dic.raw.json', dictJson, 'utf8');
fs.writeFileSync('./src/benchmarks/brotli-dic.raw.txt', dictRaw, 'utf8');
