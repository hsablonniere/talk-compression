#!/usr/bin/env node

import crc32lib from 'crc-32';
import { getParams } from '../lib/cli.js';
import { BitStream, createPrefixTree } from '../lib/bit-stream.js';

// https://www.rfc-editor.org/rfc/rfc1952#page-6
const IDENDIFICATION_1 = 0x1f;
const IDENDIFICATION_2 = 0x8b;
const COMPRESSION_METHOD_DEFLATE = 0x08;

// Section 3.2.2 of https://www.rfc-editor.org/rfc/rfc1951#page-7
function getCodeTable (codeLengths) {

  // Step 1
  const maxLength = Math.max(...codeLengths);
  const lengthsCounts = new Array(maxLength + 1).fill(0);
  for (const length of codeLengths) {
    lengthsCounts[length] += 1;
  }

  // Step 2
  let code = 0;
  lengthsCounts[0] = 0;
  const nextCode = new Array(maxLength + 1).fill(0);
  for (let bits = 1; bits <= maxLength; bits++) {
    code = (code + lengthsCounts[bits - 1]) << 1;
    nextCode[bits] = code;
  }

  // Step 3
  const codeTable = new Array(codeLengths.length).fill([0, 0]);
  for (let n = 0; n < codeLengths.length; n += 1) {
    const length = codeLengths[n];
    if (length !== 0) {
      codeTable[n] = [length, nextCode[length], nextCode[length].toString(2).padStart(length, '0')];
      // codeTable[n] = [length, nextCode[length]];
      nextCode[length] += 1;
    }
  }

  return codeTable;
}

// Section 3.3.6 of https://www.rfc-editor.org/rfc/rfc1951#page-12
const CODE_LENGTH_FOR_LITERALS_AND_LENGTHS = [];
for (let i = 0; i <= 287; i += 1) {
  if (0 <= i && i <= 143) {
    CODE_LENGTH_FOR_LITERALS_AND_LENGTHS[i] = 8;
  }
  if (144 <= i && i <= 255) {
    CODE_LENGTH_FOR_LITERALS_AND_LENGTHS[i] = 9;
  }
  if (256 <= i && i <= 279) {
    CODE_LENGTH_FOR_LITERALS_AND_LENGTHS[i] = 7;
  }
  if (280 <= i && i <= 287) {
    CODE_LENGTH_FOR_LITERALS_AND_LENGTHS[i] = 8;
  }
}
const CODE_TABLE_FOR_LITERALS_AND_LENGTHS = getCodeTable(CODE_LENGTH_FOR_LITERALS_AND_LENGTHS);
const TREE_FOR_LITERALS_AND_LENGTHS = createPrefixTree(CODE_TABLE_FOR_LITERALS_AND_LENGTHS);

const LENGTHS_CODES = {
  257: [0, 3, 3],
  258: [0, 4, 4],
  259: [0, 5, 5],
  260: [0, 6, 6],
  261: [0, 7, 7],
  262: [0, 8, 8],
  263: [0, 9, 9],
  264: [0, 10, 10],
  265: [1, 11, 12],
  266: [1, 13, 14],
  267: [1, 15, 16],
  268: [1, 17, 18],
  269: [2, 19, 22],
  270: [2, 23, 26],
  271: [2, 27, 30],
  272: [2, 31, 34],
  273: [3, 35, 42],
  274: [3, 43, 50],
  275: [3, 51, 58],
  276: [3, 59, 66],
  277: [4, 67, 82],
  278: [4, 83, 98],
  279: [4, 99, 114],
  280: [4, 115, 130],
  281: [5, 131, 162],
  282: [5, 163, 194],
  283: [5, 195, 226],
  284: [5, 227, 257],
  285: [0, 258, 258],
};

const DISTANCES_CODES = [
  [0, 1, 1],
  [0, 2, 2],
  [0, 3, 3],
  [0, 4, 4],
  [1, 5, 6],
  [1, 7, 8],
  [2, 9, 12],
  [2, 13, 16],
  [3, 17, 24],
  [3, 25, 32],
  [4, 33, 48],
  [4, 49, 64],
  [5, 65, 96],
  [5, 97, 128],
  [6, 129, 192],
  [6, 193, 256],
  [7, 257, 384],
  [7, 385, 512],
  [8, 513, 768],
  [8, 769, 1024],
  [9, 1025, 1536],
  [9, 1537, 2048],
  [10, 2049, 3072],
  [10, 3073, 4096],
  [11, 4097, 6144],
  [11, 6145, 8192],
  [12, 8193, 12288],
  [12, 12289, 16384],
  [13, 16385, 24576],
  [13, 24577, 32768],
];

const CL_CODE_LENGTH_INDEXES = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

const explanations = [];

{
  const { options, input } = getParams();
  const transform = options.decompress ? decompressData : compressData;
  const ouput = transform(input);
  // process.stdout.write(Buffer.from(ouput));
  console.log(JSON.stringify(explanations, null, 2));
}

function compressData (data) {
  return data;
}

function explain (start, size, number, { data, details, type }) {
  const end = start + size;
  explanations.push({
    start,
    end,
    data,
    details,
    type,
  });
  // console.log(bits, hex, number, decoded ?? '', message ?? '');
}

function decompressData (data) {

  const deflateBitStream = new BitStream();
  data.forEach((byte) => deflateBitStream.writeLittleEndian(byte, 8));

  let cursor = 0;

  const [identOne] = deflateBitStream.toArrayLittleEndian(8, cursor, cursor + 8);
  explain(cursor, 8, identOne, { details: 'Identification byte #1' });
  cursor += 8;

  const [identTwo] = deflateBitStream.toArrayLittleEndian(8, cursor, cursor + 8);
  explain(cursor, 8, identTwo, { details: 'Identification byte #2' });
  cursor += 8;
  if (identOne !== IDENDIFICATION_1 || identTwo !== IDENDIFICATION_2) {
    throw new Error('Invalid identification header');
  }

  const [compressionMethod] = deflateBitStream.toArrayLittleEndian(8, cursor, cursor + 8);
  explain(cursor, 8, compressionMethod, { details: 'Compression method' });
  cursor += 8;
  if (compressionMethod !== COMPRESSION_METHOD_DEFLATE) {
    throw new Error('Invalid compression method header');
  }

  const [flags] = deflateBitStream.toArrayLittleEndian(8, cursor, cursor + 8);
  explain(cursor, 8, flags, { details: 'Flags' });
  cursor += 8;
  if (flags !== 0) {
    throw new Error('Some flags in the header are not implemented');
  }

  const [modificationTime] = deflateBitStream.toArrayLittleEndian(32, cursor, cursor + 32);
  explain(cursor, 32, modificationTime, { details: 'Modification time' });
  cursor += 32;

  const [extraFlags] = deflateBitStream.toArrayLittleEndian(8, cursor, cursor + 8);
  explain(cursor, 8, extraFlags, { details: 'Extra flags' });
  cursor += 8;
  if (extraFlags !== 0) {
    // throw new Error('Some extra flags in the header are not implemented');
  }

  const [operatingSystem] = deflateBitStream.toArrayLittleEndian(8, cursor, cursor + 8);
  explain(cursor, 8, operatingSystem, { details: 'OS' });
  cursor += 8;

  // CRC32 check sum is in 4 before the last 4 bytes
  const originalCrc32 = data
    .slice(data.length - 8, data.length - 4)
    .reduce((a, b, i) => a + (b << (8 * i)), 0);
  // console.log({ crc32 });

  // Original size is in last 4 bytes
  const originalSize = data
    .slice(data.length - 4, data.length)
    .reduce((a, b, i) => a + (b << (8 * i)), 0);
  // console.log({ originalSize });

  const bytes = [];

  let blockNumber = 0;
  let isLast = false;
  while (isLast === false) {

    [isLast] = deflateBitStream.toArrayBigEndian(1, cursor, cursor + 1);
    explain(cursor, 1, isLast, { details: `Is last: ${isLast ? 'yes' : 'no'}` });
    cursor += 1;

    const [blockType] = deflateBitStream.toArrayLittleEndian(2, cursor, cursor + 2);
    explain(cursor, 2, blockType, { details: `Type: ${blockType}` });
    cursor += 2;

    if (blockType === 1) {
      const deflateResult = decompressBlockOne(deflateBitStream, cursor);
      bytes.push(...deflateResult.bytes);
      cursor = deflateResult.cursor;
    }
    else if (blockType === 2) {
      const deflateResult = decompressBlockTwo(deflateBitStream, cursor);
      bytes.push(...deflateResult.bytes);
      cursor = deflateResult.cursor;
    }
    else {
      throw new Error(`Cannot read block type ${blockType}`);
    }

    blockNumber += 1;
  }

  const padding = (data.length - 8) * 8 - cursor;
  explain(cursor, padding, 0, { details: `Padding for byte alignment` });

  const crc32 = crc32lib.buf(bytes);
  if (crc32 !== originalCrc32) {
    throw new Error(`Content checksum check failed, expected ${originalCrc32}, decoded ${crc32}`);
  }
  explain((data.length - 8) * 8, 32, originalCrc32, { details: 'CRC32 checksum' });

  // Original size is in last 4 bytes
  if (bytes.length !== originalSize) {
    throw new Error(`Content size check failed, expected ${originalSize}, decoded ${bytes.length}`);
  }
  explain((data.length - 4) * 8, 32, originalSize, { details: 'Original size' });

  return bytes;
}

function decompressBlockOne (deflateBitStream, initCursor) {

  let cursor = initCursor;
  const bytes = [];

  let endOfBlock = false;
  while (endOfBlock === false) {

    const [symbol, bitLength] = deflateBitStream.readFromTree(cursor, TREE_FOR_LITERALS_AND_LENGTHS);
    cursor += bitLength;

    if (symbol === 256) {
      explain(cursor - bitLength, bitLength, symbol, { details: `Symbol #256 (end of block)` });
      endOfBlock = true;
    }
    else if (symbol <= 256) {
      const char = String.fromCharCode(symbol);
      explain(cursor - bitLength, bitLength, symbol, {
        data: char,
        details: `Symbol #${symbol}`,
      });
      bytes.push(symbol);
    }
    else {

      const repeatParts = [];

      const labelStart = cursor - bitLength;

      const [lengthExtraBits, minLength, maxLength] = LENGTHS_CODES[symbol];
      repeatParts.push({
        start: cursor - bitLength,
        end: bitLength,
        number: symbol,
        details: `Symbol #${symbol} (length: ${minLength})`,
        data: `L:${minLength}`,
        type: 'length',
      });

      let length = minLength;
      if (lengthExtraBits > 0) {
        const [extraLength] = deflateBitStream.toArrayLittleEndian(lengthExtraBits, cursor, cursor + lengthExtraBits);
        cursor += lengthExtraBits;
        length += extraLength;
        repeatParts.push({
          start: cursor - lengthExtraBits,
          end: lengthExtraBits,
          number: extraLength,
          details: `Extra length (${extraLength})`,
          data: `${extraLength}`,
          type: 'length-extra',
        });
      }

      const [distanceCode] = deflateBitStream.toArrayBigEndian(5, cursor, cursor + 5);
      const [distanceExtraBits, minDistance, maxDistance] = DISTANCES_CODES[distanceCode];
      cursor += 5;
      repeatParts.push({
        start: cursor - 5,
        end: 5,
        number: distanceCode,
        details: `Distance #${distanceCode} (${minDistance})`,
        data: `D:${minDistance}`,
        type: 'distance',
      });

      let distance = minDistance;
      if (distanceExtraBits > 0) {
        const [extraDistance] = deflateBitStream.toArrayLittleEndian(distanceExtraBits, cursor, cursor + distanceExtraBits);
        cursor += distanceExtraBits;
        distance += extraDistance;
        repeatParts.push({
          start: cursor - distanceExtraBits,
          end: distanceExtraBits,
          number: extraDistance,
          details: `Extra distance (${extraDistance})`,
          data: `${extraDistance}`,
          type: 'distance-extra',
        });
      }

      const bytesLength = bytes.length;
      const chars = [];
      for (let i = bytesLength - distance; i < bytesLength - distance + length; i += 1) {
        bytes.push(bytes[i]);
        chars.push(String.fromCharCode(bytes[i]));
      }

      const labelEnd = cursor;

      const [data] = deflateBitStream.toArrayLittleEndian(labelEnd - labelStart, labelStart, labelEnd);
      // explain(labelStart, labelEnd - labelStart, data, {
      //   data: chars.join(''),
      //   details: `Repeat (${length}:${distance})`,
      //   type: 'repeat',
      // });

      repeatParts.forEach(({ start, end, number, data, details, type }) => {
        explain(start, end, number, { data, details, type });
      });

    }
  }

  return { bytes, cursor };
}

function decompressBlockTwo (deflateBitStream, initCursor) {

  let cursor = initCursor;
  const bytes = [];

  const [hlit] = deflateBitStream.toArrayLittleEndian(5, cursor, cursor + 5);
  cursor += 5;
  // console.log({ hlit });
  const llCodeSize = 257 + hlit;
  // console.log({ llCodeSize });

  const [hdist] = deflateBitStream.toArrayLittleEndian(5, cursor, cursor + 5);
  cursor += 5;
  // console.log({ hdist });
  const distanceCodeSize = hdist + 1;
  // console.log({ distanceCodeSize });

  const [hclen] = deflateBitStream.toArrayLittleEndian(4, cursor, cursor + 4);
  cursor += 4;
  // console.log({ hclen });
  const clCodeLengthsSize = hclen + 4;
  // console.log({ clCodeLengthsSize });

  const clCodeLengths = new Array(19);
  for (let i = 0; i < 19; i += 1) {
    const clCode = CL_CODE_LENGTH_INDEXES[i];
    if (i < clCodeLengthsSize) {
      const [clCodeLength] = deflateBitStream.toArrayLittleEndian(3, cursor, cursor + 3);
      cursor += 3;
      clCodeLengths[clCode] = clCodeLength;
    }
    else {
      clCodeLengths[clCode] = 0;
    }
  }
  // console.log(clCodeLengths);
  const clCodeLengthsTable = getCodeTable(clCodeLengths);
  // console.log(clCodeLengthsTable);
  const clCodeLengthsTree = createPrefixTree(clCodeLengthsTable);
  // console.log(clCodeLengthsTree);

  const llCodeLengths = [];
  let previousCodeLength;
  while (llCodeLengths.length < llCodeSize) {

    const [codeLength, bitLength] = deflateBitStream.readFromTree(cursor, clCodeLengthsTree);
    cursor += bitLength;
    // console.log({ codeLength });

    if (codeLength < 16) {
      llCodeLengths.push(codeLength);
    }
    else if (codeLength === 16) {
      const [repeatExtra] = deflateBitStream.toArrayLittleEndian(2, cursor);
      cursor += 2;
      const repeat = 3 + repeatExtra;
      for (let j = 0; j < repeat; j += 1) {
        llCodeLengths.push(previousCodeLength);
      }
    }
    else if (codeLength === 17) {
      const [repeatExtra] = deflateBitStream.toArrayLittleEndian(3, cursor);
      cursor += 3;
      const repeat = 3 + repeatExtra;
      for (let j = 0; j < repeat; j += 1) {
        llCodeLengths.push(0);
      }
    }
    else if (codeLength === 18) {
      const [repeatExtra] = deflateBitStream.toArrayLittleEndian(7, cursor);
      cursor += 7;
      const repeat = 11 + repeatExtra;
      for (let j = 0; j < repeat; j += 1) {
        llCodeLengths.push(0);
      }
    }

    previousCodeLength = codeLength;
  }

  // console.log(llCodeLengths.map((l, i) => [l, i]).filter(([l]) => l > 0).map(([l, i]) => i + ':' + l).join('\t'));
  const llCodeLengthsTable = getCodeTable(llCodeLengths);
  // console.log(llCodeLengthsTable);
  const llCodeLengthsTree = createPrefixTree(llCodeLengthsTable);
  // console.log(llCodeLengthsTree);

  const distanceCodeLengths = [];
  previousCodeLength = null;
  while (distanceCodeLengths.length < distanceCodeSize) {

    const [codeLength, bitLength] = deflateBitStream.readFromTree(cursor, clCodeLengthsTree);
    cursor += bitLength;

    if (codeLength < 16) {
      distanceCodeLengths.push(codeLength);
    }
    else if (codeLength === 16) {
      const [repeatExtra] = deflateBitStream.toArrayLittleEndian(2, cursor);
      cursor += 2;
      const repeat = 3 + repeatExtra;
      // console.log({ repeat });
      for (let j = 0; j < repeat; j += 1) {
        distanceCodeLengths.push(previousCodeLength);
      }
    }
    else if (codeLength === 17) {
      const [repeatExtra] = deflateBitStream.toArrayLittleEndian(3, cursor);
      cursor += 3;
      const repeat = 3 + repeatExtra;
      for (let j = 0; j < repeat; j += 1) {
        distanceCodeLengths.push(0);
      }
    }
    else if (codeLength === 18) {
      const [repeatExtra] = deflateBitStream.toArrayLittleEndian(7, cursor);
      cursor += 7;
      const repeat = 11 + repeatExtra;
      for (let j = 0; j < repeat; j += 1) {
        distanceCodeLengths.push(0);
      }
    }

    previousCodeLength = codeLength;
  }

  // console.log(llCodeLengths.map((l, i) => [l, i]).filter(([l]) => l > 0).map(([l, i]) => i + ':' + l).join('\t'));
  const distanceCodeLengthsTable = getCodeTable(distanceCodeLengths);
  // console.log(distanceCodeLengthsTable);
  const distanceCodeLengthsTree = createPrefixTree(distanceCodeLengthsTable);
  // console.log(distanceCodeLengthsTree);

  let endOfBlock = false;
  while (endOfBlock === false) {

    const [symbol, bitLength] = deflateBitStream.readFromTree(cursor, llCodeLengthsTree);
    cursor += bitLength;

    if (symbol === 256) {

      // console.log(' '.repeat(charsLength) + chars.join(''));
      // charsLength += chars.length;
      // chars.length = 0;

      endOfBlock = true;
    }
    else if (symbol <= 256) {
      bytes.push(symbol);
      // chars.push(String.fromCharCode(symbol));
    }
    else {

      // console.log(' '.repeat(charsLength) + chars.join(''));
      // charsLength += chars.length;
      // chars.length = 0;

      const [lengthExtraBits, minLength, maxLength] = LENGTHS_CODES[symbol];

      let length = minLength;
      if (lengthExtraBits > 0) {
        const [extraLength] = deflateBitStream.toArrayLittleEndian(lengthExtraBits, cursor, cursor + lengthExtraBits);
        cursor += lengthExtraBits;
        length += extraLength;
      }

      const [distanceCode, bitLength] = deflateBitStream.readFromTree(cursor, distanceCodeLengthsTree);
      const [distanceExtraBits, minDistance, maxDistance] = DISTANCES_CODES[distanceCode];
      cursor += bitLength;

      let distance = minDistance;
      if (distanceExtraBits > 0) {
        const [extraDistance] = deflateBitStream.toArrayLittleEndian(distanceExtraBits, cursor, cursor + distanceExtraBits);
        cursor += distanceExtraBits;
        distance += extraDistance;
      }

      const bytesLength = bytes.length;
      for (let i = bytesLength - distance; i < bytesLength - distance + length; i += 1) {
        bytes.push(bytes[i]);
        // chars.push(String.fromCharCode(bytes[i]));
      }

      // console.log(' '.repeat(bytesLength - distance) + '^'.repeat(length) + '_'.repeat(charsLength - (bytesLength - distance) - length) + chars.join(''));
      // charsLength += chars.length;
      // chars.length = 0;
    }

  }

  return { bytes, cursor };
}
