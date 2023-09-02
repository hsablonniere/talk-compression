#!/usr/bin/env node

import { BitStream } from '../lib/bit-stream.js';
import { getParams } from '../lib/cli.js';

{
  const { options, input } = getParams();
  const transform = options.decompress ? decompressData : compressData;
  const ouput = transform(input);
  process.stdout.write(Buffer.from(ouput));
}

function compressData (data) {

  const bs = new BitStream();

  // Init dictionnary with NUL char for padding
  const dictionnary = [0];
  for (const char of data) {
    if (!dictionnary.includes(char)) {
      dictionnary.push(char);
    }
  }

  // Start bit stream with bit length
  const bitLength = Math.ceil(Math.log2(dictionnary.length));
  bs.writeBigEndian(bitLength, 8);

  // Add dictionnary
  const dictionnaryLength = 2 ** bitLength;
  for (let i = 0; i < dictionnaryLength; i += 1) {
    const char = dictionnary[i] || 0;
    bs.writeBigEndian(char, 8);
  }

  // Add data
  for (const char of data) {
    const index = dictionnary.indexOf(char);
    bs.writeBigEndian(index, bitLength);
  }

  // Add padding to fit bytes
  if (bs.length % 8 !== 0 && bs.length % 8 !== 8) {
    bs.writeBigEndian(0, 8 - bs.length % 8);
  }

  // Convert to array
  const bytes = bs.toArrayBigEndian(8);

  return bytes;

}

function decompressData (data) {

  const dataBs = new BitStream();
  data.forEach((b) => dataBs.writeBigEndian(b, 8));

  // Extract bit length
  const [bitLength] = dataBs.toArrayBigEndian(8, 0, 8);

  // Exctract dictionnary
  const dictionnaryLength = 2 ** bitLength;
  const dictionnary = dataBs.toArrayBigEndian(8, 8, 8 + dictionnaryLength * 8);

  // Exctract data
  const bytes = dataBs
    .toArrayBigEndian(bitLength, 8 + dictionnaryLength * 8)
    .map((index) => dictionnary[index]);

  return bytes;
}
