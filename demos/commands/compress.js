#!/usr/bin/env node

import { BitStream } from '../lib/bit-stream.js';
import { getParams } from '../lib/cli.js';
import { SymbolTable } from '../lib/symbol-table.js';

const MAGIC_NUMBERS = [0x1f, 0x9d];
const DEFAULT_MODE = 0x90;
const RESET_MARKER = Symbol();

{
  const { options, input } = getParams();
  const transform = options.decompress ? decompressData : compressData;
  const ouput = transform(input);
  process.stdout.write(Buffer.from(ouput));
}

function initSymbolTable () {

  // Init symbol table with all chars from 0 to 255
  const symbolTable = new SymbolTable(256);

  // Add an empty symbol for RESET
  symbolTable.push(RESET_MARKER);

  return symbolTable;
}

function compressData (data) {

  const bytes = [];

  // File header
  bytes.push(...MAGIC_NUMBERS);
  bytes.push(DEFAULT_MODE);

  const symbolTable = initSymbolTable();

  const dataStream = new BitStream();

  const MAX_BITS = 16;
  let bitLength = 9;
  let workingString = '';
  let augmentedString = '';

  for (const byte of data) {
    const char = String.fromCharCode(byte);
    augmentedString = workingString + char;
    if (symbolTable.hasSymbol(augmentedString)) {
      workingString = augmentedString;
    }
    else if (2 ** MAX_BITS > symbolTable.length) {
      symbolTable.push(augmentedString);
      const workingIndex = symbolTable.getIndex(workingString);
      dataStream.writeLittleEndian(workingIndex, bitLength);
      workingString = char;
      if (2 ** bitLength < symbolTable.length) {
        bitLength += 1;
      }
    }
    else {
      const workingIndex = symbolTable.getIndex(workingString);
      dataStream.writeLittleEndian(workingIndex, bitLength);
      workingString = char;
    }
  }

  if (workingString.length > 0) {
    const workingIndex = symbolTable.getIndex(workingString);
    dataStream.writeLittleEndian(workingIndex, bitLength);
  }

  // Add padding to fit bytes
  if (dataStream.length % 8 !== 0 && dataStream.length % 8 !== 8) {
    const paddingLength = 8 - dataStream.length % 8;
    dataStream.writeLittleEndian(0, paddingLength);
  }

  // Swap endianness again "because" compress does it that way
  dataStream
    .toArrayLittleEndian(8)
    .forEach((n) => bytes.push(n));

  return bytes;
}

function decompressData (data) {

  if (data[0] !== MAGIC_NUMBERS[0] || data[1] !== MAGIC_NUMBERS[1]) {
    throw new Error('Invalid magic number');
  }

  if (data[2] !== DEFAULT_MODE) {
    throw new Error('Invalid mode');
  }

  const dataBs = new BitStream();
  data.slice(3).forEach((b) => dataBs.writeLittleEndian(b, 8));

  let symbolTable = initSymbolTable();

  const MAX_BITS = 16;
  let bitLength = 9;
  let workingString = '';
  let augmentedString = '';
  const bytes = [];

  for (let i = 0; i + bitLength < dataBs.length; i += bitLength) {

    const symbol = dataBs.toArrayLittleEndian(bitLength, i, i + bitLength)[0];

    const symbolString = symbolTable.hasIndex(symbol)
      ? symbolTable.getSymbol(symbol)
      // cScSc problem
      : workingString + workingString[0];

    if (symbolString === RESET_MARKER) {
      throw new Error('Cannot handle reset markers');
    }

    for (let charIndex = 0; charIndex < symbolString.length; charIndex += 1) {
      const char = symbolString[charIndex];
      const byte = symbolString.charCodeAt(charIndex);
      bytes.push(byte);
      augmentedString = workingString + char;
      if (symbolTable.hasSymbol(augmentedString)) {
        workingString = augmentedString;
      }
      else if (2 ** MAX_BITS > symbolTable.length) {
        symbolTable.push(augmentedString);
        workingString = char;
        if (2 ** bitLength < symbolTable.length) {
          bitLength += 1;
        }
      }
      else {
        workingString = char;
      }
    }
  }

  return bytes;
}
