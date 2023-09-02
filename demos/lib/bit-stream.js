export class BitStream {

  constructor () {
    this._bits = '';
  }

  /**
   * @return {number}
   */
  get length () {
    return this._bits.length;
  }

  /**
   * @param {number} number
   * @param {number} bitLength
   */
  writeBigEndian (number, bitLength) {
    this._write(number, bitLength, false);
  }

  /**
   * @param {number} number
   * @param {number} bitLength
   */
  writeLittleEndian (number, bitLength) {
    this._write(number, bitLength, true);
  }

  /**
   * @param {number} number
   * @param {number} bitLength
   */
  _write (number, bitLength, littleEndian) {
    const binaryString = toBinaryString(number, bitLength, littleEndian);
    this._bits += binaryString;
  }

  toString (bigEndian = true) {
    return this._bits;
  }

  /**
   * @param {number} [size=8]
   * @param {number} [start=0]
   * @param {number} [end]
   * @return {number[]}
   */
  toArrayBigEndian (size, start, end) {
    return this._toArray(false, size, start, end);
  }

  /**
   * @param {number} [size=8]
   * @param {number} [start=0]
   * @param {number} [end]
   * @return {number[]}
   */
  toArrayLittleEndian (size, start, end) {
    return this._toArray(true, size, start, end);
  }

  /**
   * @param {number} [size=8]
   * @param {number} [start=0]
   * @param {number} [end]
   * @return {number[]}
   */
  _toArray (littleEndian, size = 8, start = 0, end) {

    // Default to last extractable bit (using size)
    end = end ?? (this._bits.length - (this._bits.length - start) % size);

    const array = [];

    for (let i = start; i + size <= end + 1; i += size) {
      const valueString = this._bits
        .substring(i, i + size)
        .padEnd(size, '0');
      const value = toNumber(valueString, size, littleEndian);
      array.push(value);
    }

    return array;
  }
}

function toBinaryString (number, bitLength, littleEndian) {
  const string = number.toString(2).padStart(bitLength, '0');
  return littleEndian
    ? string.split('').reverse().join('')
    : string;
}

function toNumber (string, bitLength, littleEndian) {
  const value = littleEndian
    ? string.split('').reverse().join('')
    : string;
  return parseInt(value, 2);
}
