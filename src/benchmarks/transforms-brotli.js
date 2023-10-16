function omitFirst (number, str) {
  return str.substring(number);
}

function omitLast (number, str) {
  return str.substring(0, str.length - number);
}

const TRANSFORM_FUNCTIONS = {
  FermentAll: (str) => str.toUpperCase(),
  FermentFirst: (str) => {
    return str[0].toUpperCase() + str.slice(1);
  },
  Identity: (str) => str,
  OmitFirst1: (str) => omitFirst(1, str),
  OmitFirst2: (str) => omitFirst(2, str),
  OmitFirst3: (str) => omitFirst(3, str),
  OmitFirst4: (str) => omitFirst(4, str),
  OmitFirst5: (str) => omitFirst(5, str),
  OmitFirst6: (str) => omitFirst(6, str),
  OmitFirst7: (str) => omitFirst(7, str),
  OmitFirst9: (str) => omitFirst(9, str),
  OmitLast1: (str) => omitLast(1, str),
  OmitLast2: (str) => omitLast(2, str),
  OmitLast3: (str) => omitLast(3, str),
  OmitLast4: (str) => omitLast(4, str),
  OmitLast5: (str) => omitLast(5, str),
  OmitLast6: (str) => omitLast(6, str),
  OmitLast7: (str) => omitLast(7, str),
  OmitLast8: (str) => omitLast(8, str),
  OmitLast9: (str) => omitLast(9, str),
};

const TRANSFORMS = [
  [0, '', 'Identity', ''],
  [1, '', 'Identity', ' '],
  [2, ' ', 'Identity', ' '],
  [3, '', 'OmitFirst1', ''],
  [4, '', 'FermentFirst', ' '],
  [5, '', 'Identity', ' the '],
  [6, ' ', 'Identity', ''],
  [7, 's ', 'Identity', ' '],
  [8, '', 'Identity', ' of '],
  [9, '', 'FermentFirst', ''],
  [10, '', 'Identity', ' and '],
  [11, '', 'OmitFirst2', ''],
  [12, '', 'OmitLast1', ''],
  [13, ', ', 'Identity', ' '],
  [14, '', 'Identity', ', '],
  [15, ' ', 'FermentFirst', ' '],
  [16, '', 'Identity', ' in '],
  [17, '', 'Identity', ' to '],
  [18, 'e ', 'Identity', ' '],
  [19, '', 'Identity', '"'],
  [20, '', 'Identity', '.'],
  [21, '', 'Identity', '">'],
  [22, '', 'Identity', '\n'],
  [23, '', 'OmitLast3', ''],
  [24, '', 'Identity', ']'],
  [25, '', 'Identity', ' for '],
  [26, '', 'OmitFirst3', ''],
  [27, '', 'OmitLast2', ''],
  [28, '', 'Identity', ' a '],
  [29, '', 'Identity', ' that '],
  [30, ' ', 'FermentFirst', ''],
  [31, '', 'Identity', '. '],
  [32, '.', 'Identity', ''],
  [33, ' ', 'Identity', ', '],
  [34, '', 'OmitFirst4', ''],
  [35, '', 'Identity', ' with '],
  [36, '', 'Identity', '\''],
  [37, '', 'Identity', ' from '],
  [38, '', 'Identity', ' by '],
  [39, '', 'OmitFirst5', ''],
  [40, '', 'OmitFirst6', ''],
  [41, ' the ', 'Identity', ''],
  [42, '', 'OmitLast4', ''],
  [43, '', 'Identity', '. The '],
  [44, '', 'FermentAll', ''],
  [45, '', 'Identity', ' on '],
  [46, '', 'Identity', ' as '],
  [47, '', 'Identity', ' is '],
  [48, '', 'OmitLast7', ''],
  [49, '', 'OmitLast1', 'ing '],
  [50, '', 'Identity', '\n\t'],
  [51, '', 'Identity', ':'],
  [52, ' ', 'Identity', '. '],
  [53, '', 'Identity', 'ed '],
  [54, '', 'OmitFirst9', ''],
  [55, '', 'OmitFirst7', ''],
  [56, '', 'OmitLast6', ''],
  [57, '', 'Identity', '('],
  [58, '', 'FermentFirst', ', '],
  [59, '', 'OmitLast8', ''],
  [60, '', 'Identity', ' at '],
  [61, '', 'Identity', 'ly '],
  [62, ' the ', 'Identity', ' of '],
  [63, '', 'OmitLast5', ''],
  [64, '', 'OmitLast9', ''],
  [65, ' ', 'FermentFirst', ', '],
  [66, '', 'FermentFirst', '"'],
  [67, '.', 'Identity', '('],
  [68, '', 'FermentAll', ' '],
  [69, '', 'FermentFirst', '">'],
  [70, '', 'Identity', '="'],
  [71, ' ', 'Identity', '.'],
  [72, '.com/', 'Identity', ''],
  [73, ' the ', 'Identity', ' of the '],
  [74, '', 'FermentFirst', '\''],
  [75, '', 'Identity', '. This '],
  [76, '', 'Identity', ','],
  [77, '.', 'Identity', ' '],
  [78, '', 'FermentFirst', '('],
  [79, '', 'FermentFirst', '.'],
  [80, '', 'Identity', ' not '],
  [81, ' ', 'Identity', '="'],
  [82, '', 'Identity', 'er '],
  [83, ' ', 'FermentAll', ' '],
  [84, '', 'Identity', 'al '],
  [85, ' ', 'FermentAll', ''],
  [86, '', 'Identity', '=\''],
  [87, '', 'FermentAll', '"'],
  [88, '', 'FermentFirst', '. '],
  [89, ' ', 'Identity', '('],
  [90, '', 'Identity', 'ful '],
  [91, ' ', 'FermentFirst', '. '],
  [92, '', 'Identity', 'ive '],
  [93, '', 'Identity', 'less '],
  [94, '', 'FermentAll', '\''],
  [95, '', 'Identity', 'est '],
  [96, ' ', 'FermentFirst', '.'],
  [97, '', 'FermentAll', '">'],
  [98, ' ', 'Identity', '=\''],
  [99, '', 'FermentFirst', ','],
  [100, '', 'Identity', 'ize '],
  [101, '', 'FermentAll', '.'],
  [102, '\xc2\xa0', 'Identity', ''],
  [103, ' ', 'Identity', ','],
  [104, '', 'FermentFirst', '="'],
  [105, '', 'FermentAll', '="'],
  [106, '', 'Identity', 'ous '],
  [107, '', 'FermentAll', ', '],
  [108, '', 'FermentFirst', '=\''],
  [109, ' ', 'FermentFirst', ','],
  [110, ' ', 'FermentAll', '="'],
  [111, ' ', 'FermentAll', ', '],
  [112, '', 'FermentAll', ','],
  [113, '', 'FermentAll', '('],
  [114, '', 'FermentAll', '. '],
  [115, ' ', 'FermentAll', '.'],
  [116, '', 'FermentAll', '=\''],
  [117, ' ', 'FermentAll', '. '],
  [118, ' ', 'FermentFirst', '="'],
  [119, ' ', 'FermentAll', '=\''],
  [120, ' ', 'FermentFirst', '=\''],
];

const word = 'foundation';

const tranformedWords = TRANSFORMS
  .map(([index, prefix, tranformName, suffix]) => {
    const transformedWord = prefix + TRANSFORM_FUNCTIONS[tranformName](word) + suffix;
    return transformedWord
      .replaceAll('\n', '\\n')
      .replaceAll('\t', '\\t')
      .replaceAll(' ', '⎵');
  })
  .sort((a, b) => a.length - b.length);

const MAX_LINE_LENGTH = 110;

const dictLines = [];
let currentLine = '';

for (const word of tranformedWords) {

  if (currentLine.length >= MAX_LINE_LENGTH - word.length) {
    dictLines.push(currentLine);
    currentLine = '';
  }
  currentLine += '  ' + word.padEnd(16, ' ');
}

console.log(dictLines.join('\n'));
