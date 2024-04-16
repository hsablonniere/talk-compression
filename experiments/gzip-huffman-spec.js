// Lit Value    Bits        Codes
// ---------    ----        -----
//   0 - 143     8          00110000 through
//                          10111111
// 144 - 255     9          110010000 through
//                          111111111
// 256 - 279     7          0000000 through
//                          0010111
// 280 - 287     8          11000000 through
//                          11000111

function toBits (nb, nbBits) {
  return nb.toString(2).padStart(nbBits, '0');
}

const sections = [
  { from: 0, to: 143, fromBits: '00110000', toBits: '10111111', nbBits: 8 },
  { from: 144, to: 255, fromBits: '110010000', toBits: '111111111', nbBits: 9 },
  { from: 256, to: 279, fromBits: '0000000', toBits: '0010111', nbBits: 7 },
  { from: 280, to: 287, fromBits: '11000000', toBits: '11000111', nbBits: 8 },
];

const numbers = sections
  .flatMap((s) => {
    return Array
      .from({ length: s.to - s.from + 1 })
      .map((_, i) => {
        const fromNb = parseInt(s.fromBits, 2);
        const nb = fromNb + i;
        return {
          bits: toBits(nb, s.nbBits),
          symbol: s.from + i,
        };
      });
  })
  .sort((a, b) => parseInt(a.bits) - parseInt(b.bits));

const columnSize = Math.ceil(numbers.length / 10);
const columns = [];
let currentColumn;

numbers.forEach(({ bits, symbol }, i) => {
  if (i % columnSize === 0) {
    currentColumn = [];
    columns.push(currentColumn);
  }
  const symbolPadded = symbol.toString().padStart(3, ' ');
  const bitsPadded = bits.toString().padEnd(9, ' ');
  // currentColumn.push(symbolPadded + ' ' + bitsPadded);
  currentColumn.push(bitsPadded + ' ' + symbolPadded);
});

for (let r = 0; r < columnSize; r++) {
  for (let c = 0; c < columns.length; c++) {
    const text = columns[c][r] ?? '';
    process.stdout.write(text.padEnd(16, ' '));
  }
  process.stdout.write('\n');
}
