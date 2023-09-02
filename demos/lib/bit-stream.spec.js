import { BitStream } from './bit-stream.js';
import { expect } from 'chai';

describe('BitStream', () => {

  /** @type {BitStream} */
  let bs;

  beforeEach(() => {
    bs = new BitStream();
  });

  it('empty', () => {
    expect(bs.toString()).to.equal('');
    expect(bs.toArrayBigEndian()).to.deep.equal([]);
    expect(bs.length).to.equal(0);
  });

  describe('writeBigEndian()', () => {

    it('8 bits chunks', () => {
      bs.writeBigEndian(1, 8);
      bs.writeBigEndian(3, 8);
      bs.writeBigEndian(6, 8);
      bs.writeBigEndian(12, 8);
      bs.writeBigEndian(29, 8);
      bs.writeBigEndian(55, 8);
      bs.writeBigEndian(109, 8);
      bs.writeBigEndian(236, 8);
      expect(bs.toString()).to.equal([
        '00000001', //   1 on 8 bits
        '00000011', //   3 on 8 bits
        '00000110', //   6 on 8 bits
        '00001100', //  12 on 8 bits
        '00011101', //  29 on 8 bits
        '00110111', //  55 on 8 bits
        '01101101', // 109 on 8 bits
        '11101100', // 236 on 8 bits
      ].join(''));
      expect(bs.length).to.equal(8 * 8);
    });

    it('4 bits chunks', () => {
      bs.writeBigEndian(1, 4);
      bs.writeBigEndian(3, 4);
      bs.writeBigEndian(6, 4);
      bs.writeBigEndian(12, 4);
      expect(bs.toString()).to.equal([
        '0001', //   1 on 4 bits
        '0011', //   3 on 4 bits
        '0110', //   6 on 4 bits
        '1100', //  12 on 4 bits
      ].join(''));
      expect(bs.length).to.equal(4 * 4);
    });

    it('11 bits chunks', () => {
      bs.writeBigEndian(1, 11);
      bs.writeBigEndian(3, 11);
      bs.writeBigEndian(6, 11);
      bs.writeBigEndian(12, 11);
      bs.writeBigEndian(29, 11);
      bs.writeBigEndian(55, 11);
      bs.writeBigEndian(109, 11);
      bs.writeBigEndian(236, 11);
      expect(bs.toString()).to.equal([
        '00000000001', //   1 on 11 bits
        '00000000011', //   3 on 11 bits
        '00000000110', //   6 on 11 bits
        '00000001100', //  12 on 11 bits
        '00000011101', //  29 on 11 bits
        '00000110111', //  55 on 11 bits
        '00001101101', // 109 on 11 bits
        '00011101100', // 236 on 11 bits
      ].join(''));
      expect(bs.length).to.equal(8 * 11);
    });

    it('19 bits chunks', () => {
      bs.writeBigEndian(1, 19);
      bs.writeBigEndian(3, 19);
      bs.writeBigEndian(6, 19);
      bs.writeBigEndian(12, 19);
      bs.writeBigEndian(29, 19);
      bs.writeBigEndian(55, 19);
      bs.writeBigEndian(109, 19);
      bs.writeBigEndian(236, 19);
      expect(bs.toString()).to.equal([
        '0000000000000000001', //   1 on 19 bits
        '0000000000000000011', //   3 on 19 bits
        '0000000000000000110', //   6 on 19 bits
        '0000000000000001100', //  12 on 19 bits
        '0000000000000011101', //  29 on 19 bits
        '0000000000000110111', //  55 on 19 bits
        '0000000000001101101', // 109 on 19 bits
        '0000000000011101100', // 236 on 19 bits
      ].join(''));
      expect(bs.length).to.equal(8 * 19);
    });

    it('chunks with various number of bits', () => {
      bs.writeBigEndian(1, 3);
      bs.writeBigEndian(3, 2);
      bs.writeBigEndian(6, 5);
      bs.writeBigEndian(12, 4);
      bs.writeBigEndian(29, 6);
      bs.writeBigEndian(55, 8);
      bs.writeBigEndian(109, 7);
      bs.writeBigEndian(236, 8);
      expect(bs.toString()).to.equal([
        '001',      //   1 on 3 bits
        '11',       //   3 on 2 bits
        '00110',    //   6 on 5 bits
        '1100',     //  12 on 4 bits
        '011101',   //  29 on 6 bits
        '00110111', //  55 on 8 bits
        '1101101',  // 109 on 7 bits
        '11101100', // 236 on 8 bits
      ].join(''));
      expect(bs.length).to.equal(2 + 3 + 5 + 4 + 6 + 8 + 7 + 8);
    });
  });

  describe('writeLittleEndian()', () => {

    it('8 bits chunks', () => {
      bs.writeLittleEndian(1, 8);
      bs.writeLittleEndian(3, 8);
      bs.writeLittleEndian(6, 8);
      bs.writeLittleEndian(12, 8);
      bs.writeLittleEndian(29, 8);
      bs.writeLittleEndian(55, 8);
      bs.writeLittleEndian(109, 8);
      bs.writeLittleEndian(236, 8);
      expect(bs.toString()).to.equal([
        '10000000', //   1 on 8 bits as little endian
        '11000000', //   3 on 8 bits as little endian
        '01100000', //   6 on 8 bits as little endian
        '00110000', //  12 on 8 bits as little endian
        '10111000', //  29 on 8 bits as little endian
        '11101100', //  55 on 8 bits as little endian
        '10110110', // 109 on 8 bits as little endian
        '00110111', // 236 on 8 bits as little endian
      ].join(''));
      expect(bs.length).to.equal(8 * 8);
    });

    it('4 bits chunks', () => {
      bs.writeLittleEndian(1, 4);
      bs.writeLittleEndian(3, 4);
      bs.writeLittleEndian(6, 4);
      bs.writeLittleEndian(12, 4);
      expect(bs.toString()).to.equal([
        '1000', //   1 on 4 bits as little endian
        '1100', //   3 on 4 bits as little endian
        '0110', //   6 on 4 bits as little endian
        '0011', //  12 on 4 bits as little endian
      ].join(''));
      expect(bs.length).to.equal(4 * 4);
    });

    it('11 bits chunks', () => {
      bs.writeLittleEndian(1, 11);
      bs.writeLittleEndian(3, 11);
      bs.writeLittleEndian(6, 11);
      bs.writeLittleEndian(12, 11);
      bs.writeLittleEndian(29, 11);
      bs.writeLittleEndian(55, 11);
      bs.writeLittleEndian(109, 11);
      bs.writeLittleEndian(236, 11);
      expect(bs.toString()).to.equal([
        '10000000000', //   1 on 11 bits as little endian
        '11000000000', //   3 on 11 bits as little endian
        '01100000000', //   6 on 11 bits as little endian
        '00110000000', //  12 on 11 bits as little endian
        '10111000000', //  29 on 11 bits as little endian
        '11101100000', //  55 on 11 bits as little endian
        '10110110000', // 109 on 11 bits as little endian
        '00110111000', // 236 on 11 bits as little endian
      ].join(''));
      expect(bs.length).to.equal(8 * 11);
    });

    it('19 bits chunks', () => {
      bs.writeLittleEndian(1, 19);
      bs.writeLittleEndian(3, 19);
      bs.writeLittleEndian(6, 19);
      bs.writeLittleEndian(12, 19);
      bs.writeLittleEndian(29, 19);
      bs.writeLittleEndian(55, 19);
      bs.writeLittleEndian(109, 19);
      bs.writeLittleEndian(236, 19);
      expect(bs.toString()).to.equal([
        '1000000000000000000', //   1 on 19 bits as little endian
        '1100000000000000000', //   3 on 19 bits as little endian
        '0110000000000000000', //   6 on 19 bits as little endian
        '0011000000000000000', //  12 on 19 bits as little endian
        '1011100000000000000', //  29 on 19 bits as little endian
        '1110110000000000000', //  55 on 19 bits as little endian
        '1011011000000000000', // 109 on 19 bits as little endian
        '0011011100000000000', // 236 on 19 bits as little endian
      ].join(''));
      expect(bs.length).to.equal(8 * 19);
    });

    it('chunks with various number of bits', () => {
      bs.writeLittleEndian(1, 3);
      bs.writeLittleEndian(3, 2);
      bs.writeLittleEndian(6, 5);
      bs.writeLittleEndian(12, 4);
      bs.writeLittleEndian(29, 6);
      bs.writeLittleEndian(55, 8);
      bs.writeLittleEndian(109, 7);
      bs.writeLittleEndian(236, 8);
      expect(bs.toString()).to.equal([
        '100',      //   1 on 3 bits as little endian
        '11',       //   3 on 2 bits as little endian
        '01100',    //   6 on 5 bits as little endian
        '0011',     //  12 on 4 bits as little endian
        '101110',   //  29 on 6 bits as little endian
        '11101100', //  55 on 8 bits as little endian
        '1011011',  // 109 on 7 bits as little endian
        '00110111', // 236 on 8 bits as little endian
      ].join(''));
      expect(bs.length).to.equal(2 + 3 + 5 + 4 + 6 + 8 + 7 + 8);
    });
  });

  describe('toArrayBigEndian()', () => {

    it('default (8 bits)', () => {
      bs.writeBigEndian(1, 8);
      bs.writeBigEndian(3, 8);
      bs.writeBigEndian(6, 8);
      bs.writeBigEndian(12, 8);
      bs.writeBigEndian(29, 8);
      bs.writeBigEndian(55, 8);
      bs.writeBigEndian(109, 8);
      bs.writeBigEndian(236, 8);
      expect(bs.toArrayBigEndian()).to.deep.equal([1, 3, 6, 12, 29, 55, 109, 236]);
    });

    it('4 bits', () => {
      bs.writeBigEndian(1, 4);
      bs.writeBigEndian(3, 4);
      bs.writeBigEndian(6, 4);
      bs.writeBigEndian(12, 4);
      expect(bs.toArrayBigEndian(4)).to.deep.equal([1, 3, 6, 12]);
    });

    it('4 bits, start at 8', () => {
      bs.writeBigEndian(1, 4);
      bs.writeBigEndian(3, 4);
      bs.writeBigEndian(6, 4);
      bs.writeBigEndian(12, 4);
      expect(bs.toArrayBigEndian(4, 8)).to.deep.equal([6, 12]);
    });

    it('4 bits, start at 8, end at 12', () => {
      bs.writeBigEndian(1, 4);
      bs.writeBigEndian(3, 4);
      bs.writeBigEndian(6, 4);
      bs.writeBigEndian(12, 4);
      expect(bs.toArrayBigEndian(4, 8, 12)).to.deep.equal([6]);
    });

    it('12 bits', () => {
      bs.writeBigEndian(1, 12);
      bs.writeBigEndian(3, 12);
      bs.writeBigEndian(6, 12);
      bs.writeBigEndian(12, 12);
      expect(bs.toArrayBigEndian(12)).to.deep.equal([1, 3, 6, 12]);
    });

    it('3 bits, start at 8 (last 2 bits are ignored)', () => {
      bs.writeBigEndian(27, 8);
      bs.writeBigEndian(1, 3);
      bs.writeBigEndian(3, 3);
      bs.writeBigEndian(6, 3);
      bs.writeBigEndian(5, 3);
      bs.writeBigEndian(3, 2);
      expect(bs.toArrayBigEndian(3, 8)).to.deep.equal([1, 3, 6, 5]);
    });

    it('8 bits, start at 8, end at 16 (last bits are 0 padded)', () => {
      bs.writeBigEndian(1, 8);
      bs.writeBigEndian(3, 3);
      expect(bs.toArrayBigEndian(8, 0, 16)).to.deep.equal([1, 3 << 5]);
    });
  });

  describe('toArrayLittleEndian()', () => {

    it('default (8 bits)', () => {
      bs.writeLittleEndian(1, 8);
      bs.writeLittleEndian(3, 8);
      bs.writeLittleEndian(6, 8);
      bs.writeLittleEndian(12, 8);
      bs.writeLittleEndian(29, 8);
      bs.writeLittleEndian(55, 8);
      bs.writeLittleEndian(109, 8);
      bs.writeLittleEndian(236, 8);
      expect(bs.toArrayLittleEndian()).to.deep.equal([1, 3, 6, 12, 29, 55, 109, 236]);
    });

    it('4 bits', () => {
      bs.writeLittleEndian(1, 4);
      bs.writeLittleEndian(3, 4);
      bs.writeLittleEndian(6, 4);
      bs.writeLittleEndian(12, 4);
      expect(bs.toArrayLittleEndian(4)).to.deep.equal([1, 3, 6, 12]);
    });

    it('4 bits, start at 8', () => {
      bs.writeLittleEndian(1, 4);
      bs.writeLittleEndian(3, 4);
      bs.writeLittleEndian(6, 4);
      bs.writeLittleEndian(12, 4);
      expect(bs.toArrayLittleEndian(4, 8)).to.deep.equal([6, 12]);
    });

    it('4 bits, start at 8, end at 12', () => {
      bs.writeLittleEndian(1, 4);
      bs.writeLittleEndian(3, 4);
      bs.writeLittleEndian(6, 4);
      bs.writeLittleEndian(12, 4);
      expect(bs.toArrayLittleEndian(4, 8, 12)).to.deep.equal([6]);
    });

    it('12 bits', () => {
      bs.writeLittleEndian(1, 12);
      bs.writeLittleEndian(3, 12);
      bs.writeLittleEndian(6, 12);
      bs.writeLittleEndian(12, 12);
      expect(bs.toArrayLittleEndian(12)).to.deep.equal([1, 3, 6, 12]);
    });

    it('3 bits, start at 8 (last 2 bits are ignored)', () => {
      bs.writeLittleEndian(27, 8);
      bs.writeLittleEndian(1, 3);
      bs.writeLittleEndian(3, 3);
      bs.writeLittleEndian(6, 3);
      bs.writeLittleEndian(5, 3);
      bs.writeLittleEndian(3, 2);
      expect(bs.toArrayLittleEndian(3, 8)).to.deep.equal([1, 3, 6, 5]);
    });

    it('8 bits, start at 8, end at 16 (last bits are 0 padded)', () => {
      bs.writeLittleEndian(1, 8);
      bs.writeLittleEndian(3, 3);
      expect(bs.toArrayLittleEndian(8, 0, 16)).to.deep.equal([1, 3]);
    });
  });
});
