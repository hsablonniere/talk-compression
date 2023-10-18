import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

// TODO: move to a property
const COMPRESSED_BITS = '1111100011010001000100000000000000000000000000000000000000000000000000001100000011001111111011111100101000010000000011101011000010110000100010100001000010010000010011111110111110110000000011101011000001001010000100001010111111001110101000000101000000100000101000001101111111011111100000001001100001111101011110010111110001111100011101010101000001110110011111110111100110000011010111100101000001111111000101100101000010000100010011100000110010100101100000110000011010110001000010001010100101111101011100010111100110000011000001001010011100000110110010010000000101011100010000000011100011000001100011101001011101001011100000100110110101000000000000001101011010101011110101011000100111010001000000000000000000000000';

// TODO: move to a property
const COMPRESSED_DETAILS = [
  {
    'start': 0,
    'end': 80,
    'details': 'Headers gzip',
    children: [
      {
        'start': 0,
        'end': 8,
        'details': 'Octet d\'identification n°1',
      },
      {
        'start': 8,
        'end': 16,
        'details': 'Octet d\'identification n°2',
      },
      {
        'start': 16,
        'end': 24,
        'details': 'Méthode de compression',
      },
      {
        'start': 24,
        'end': 32,
        'details': 'Flags',
      },
      {
        'start': 32,
        'end': 64,
        'details': 'Date de modification',
      },
      {
        'start': 64,
        'end': 72,
        'details': 'Extra flags',
      },
      {
        'start': 72,
        'end': 80,
        'details': 'OS',
      },
    ],
  },
  {
    start: 80,
    'end': COMPRESSED_BITS.length - 64,
    details: 'Bloc DEFLATE n°0',
    children: [
      {
        'start': 80,
        'end': 81,
        'details': 'Dernier bloc : oui',
      },
      {
        'start': 81,
        'end': 83,
        'details': 'Type : 1',
      },
      {
        'start': 83,
        'end': 91,
        'data': 'O',
        'details': 'Symbole n°79',
      },
      {
        'start': 91,
        'end': 99,
        'data': 'N',
        'details': 'Symbole n°78',
      },
      {
        'start': 99,
        'end': 107,
        'data': ' ',
        'details': 'Symbole n°32',
      },
      {
        'start': 107,
        'end': 115,
        'data': 'P',
        'details': 'Symbole n°80',
      },
      {
        'start': 115,
        'end': 123,
        'data': 'E',
        'details': 'Symbole n°69',
      },
      {
        'start': 123,
        'end': 131,
        'data': 'U',
        'details': 'Symbole n°85',
      },
      {
        'start': 131,
        'end': 139,
        'data': 'T',
        'details': 'Symbole n°84',
      },
      {
        'start': 139,
        'end': 147,
        'data': ' ',
        'details': 'Symbole n°32',
      },
      {
        'start': 147,
        'end': 155,
        'data': 'T',
        'details': 'Symbole n°84',
      },
      {
        'start': 155,
        'end': 163,
        'data': 'R',
        'details': 'Symbole n°82',
      },
      {
        'start': 163,
        'end': 171,
        'data': 'O',
        'details': 'Symbole n°79',
      },
      {
        'start': 171,
        'end': 179,
        'data': 'M',
        'details': 'Symbole n°77',
      },
      {
        'start': 179,
        'end': 187,
        'data': 'P',
        'details': 'Symbole n°80',
      },
      {
        'start': 187,
        'end': 195,
        'data': 'E',
        'details': 'Symbole n°69',
      },
      {
        'start': 195,
        'end': 203,
        'data': 'R',
        'details': 'Symbole n°82',
      },
      {
        'start': 203,
        'end': 211,
        'data': ' ',
        'details': 'Symbole n°32',
      },
      {
        'start': 211,
        'end': 219,
        'data': 'U',
        'details': 'Symbole n°85',
      },
      {
        'start': 219,
        'end': 227,
        'data': 'N',
        'details': 'Symbole n°78',
      },
      {
        'start': 227,
        'end': 235,
        'data': 'E',
        'details': 'Symbole n°69',
      },
      {
        'start': 235,
        'end': 250,
        'data': ' PE',
        'details': 'Répétition (3:17)',
        'type': 'repeat',
      },
      {
        'start': 235,
        'end': 242,
        'data': 'L:3',
        'details': 'Symbole n°257 (longueur: 3)',
        'type': 'repeat-part',
      },
      {
        'start': 242,
        'end': 247,
        'data': 'D:17',
        'details': 'Distance n°8 (17)',
        'type': 'repeat-part',
      },
      {
        'start': 247,
        'end': 250,
        'data': '0',
        'details': 'Distance extra (0)',
        'type': 'repeat-part',
      },
      {
        'start': 250,
        'end': 258,
        'data': 'R',
        'details': 'Symbole n°82',
      },
      {
        'start': 258,
        'end': 266,
        'data': 'S',
        'details': 'Symbole n°83',
      },
      {
        'start': 266,
        'end': 274,
        'data': 'O',
        'details': 'Symbole n°79',
      },
      {
        'start': 274,
        'end': 282,
        'data': 'N',
        'details': 'Symbole n°78',
      },
      {
        'start': 282,
        'end': 296,
        'data': 'NE ',
        'details': 'Répétition (3:9)',
        'type': 'repeat',
      },
      {
        'start': 282,
        'end': 289,
        'data': 'L:3',
        'details': 'Symbole n°257 (longueur: 3)',
        'type': 'repeat-part',
      },
      {
        'start': 289,
        'end': 294,
        'data': 'D:9',
        'details': 'Distance n°6 (9)',
        'type': 'repeat-part',
      },
      {
        'start': 294,
        'end': 296,
        'data': '0',
        'details': 'Distance extra (0)',
        'type': 'repeat-part',
      },
      {
        'start': 296,
        'end': 304,
        'data': 'M',
        'details': 'Symbole n°77',
      },
      {
        'start': 304,
        'end': 312,
        'data': 'I',
        'details': 'Symbole n°73',
      },
      {
        'start': 312,
        'end': 320,
        'data': 'L',
        'details': 'Symbole n°76',
      },
      {
        'start': 320,
        'end': 328,
        'data': 'L',
        'details': 'Symbole n°76',
      },
      {
        'start': 328,
        'end': 336,
        'data': 'E',
        'details': 'Symbole n°69',
      },
      {
        'start': 336,
        'end': 344,
        'data': ' ',
        'details': 'Symbole n°32',
      },
      {
        'start': 344,
        'end': 352,
        'data': 'F',
        'details': 'Symbole n°70',
      },
      {
        'start': 352,
        'end': 360,
        'data': 'O',
        'details': 'Symbole n°79',
      },
      {
        'start': 360,
        'end': 368,
        'data': 'I',
        'details': 'Symbole n°73',
      },
      {
        'start': 368,
        'end': 376,
        'data': 'S',
        'details': 'Symbole n°83',
      },
      {
        'start': 376,
        'end': 384,
        'data': '.',
        'details': 'Symbole n°46',
      },
      {
        'start': 384,
        'end': 392,
        'data': ' ',
        'details': 'Symbole n°32',
      },
      {
        'start': 392,
        'end': 400,
        'data': 'O',
        'details': 'Symbole n°79',
      },
      {
        'start': 400,
        'end': 417,
        'data': 'N PEUT TROMPER ',
        'details': 'Répétition (15:41)',
        'type': 'repeat',
      },
      {
        'start': 400,
        'end': 407,
        'data': 'L:15',
        'details': 'Symbole n°267 (longueur: 15)',
        'type': 'repeat-part',
      },
      {
        'start': 407,
        'end': 408,
        'data': '0',
        'details': 'Longueur extra (0)',
        'type': 'repeat-part',
      },
      {
        'start': 408,
        'end': 413,
        'data': 'D:33',
        'details': 'Distance n°10 (33)',
        'type': 'repeat-part',
      },
      {
        'start': 413,
        'end': 417,
        'data': '8',
        'details': 'Distance extra (8)',
        'type': 'repeat-part',
      },
      {
        'start': 417,
        'end': 432,
        'data': 'MILLE ',
        'details': 'Répétition (6:28)',
        'type': 'repeat',
      },
      {
        'start': 417,
        'end': 424,
        'data': 'L:6',
        'details': 'Symbole n°260 (longueur: 6)',
        'type': 'repeat-part',
      },
      {
        'start': 424,
        'end': 429,
        'data': 'D:25',
        'details': 'Distance n°9 (25)',
        'type': 'repeat-part',
      },
      {
        'start': 429,
        'end': 432,
        'data': '3',
        'details': 'Distance extra (3)',
        'type': 'repeat-part',
      },
      {
        'start': 432,
        'end': 448,
        'data': 'PERSONNE',
        'details': 'Répétition (8:43)',
        'type': 'repeat',
      },
      {
        'start': 432,
        'end': 439,
        'data': 'L:8',
        'details': 'Symbole n°262 (longueur: 8)',
        'type': 'repeat-part',
      },
      {
        'start': 439,
        'end': 444,
        'data': 'D:33',
        'details': 'Distance n°10 (33)',
        'type': 'repeat-part',
      },
      {
        'start': 444,
        'end': 448,
        'data': '10',
        'details': 'Distance extra (10)',
        'type': 'repeat-part',
      },
      {
        'start': 448,
        'end': 456,
        'data': 'S',
        'details': 'Symbole n°83',
      },
      {
        'start': 456,
        'end': 472,
        'data': ' UNE ',
        'details': 'Répétition (5:57)',
        'type': 'repeat',
      },
      {
        'start': 456,
        'end': 463,
        'data': 'L:5',
        'details': 'Symbole n°259 (longueur: 5)',
        'type': 'repeat-part',
      },
      {
        'start': 463,
        'end': 468,
        'data': 'D:49',
        'details': 'Distance n°11 (49)',
        'type': 'repeat-part',
      },
      {
        'start': 468,
        'end': 472,
        'data': '8',
        'details': 'Distance extra (8)',
        'type': 'repeat-part',
      },
      {
        'start': 472,
        'end': 488,
        'data': 'FOIS. ',
        'details': 'Répétition (6:42)',
        'type': 'repeat',
      },
      {
        'start': 472,
        'end': 479,
        'data': 'L:6',
        'details': 'Symbole n°260 (longueur: 6)',
        'type': 'repeat-part',
      },
      {
        'start': 479,
        'end': 484,
        'data': 'D:33',
        'details': 'Distance n°10 (33)',
        'type': 'repeat-part',
      },
      {
        'start': 484,
        'end': 488,
        'data': '9',
        'details': 'Distance extra (9)',
        'type': 'repeat-part',
      },
      {
        'start': 488,
        'end': 496,
        'data': 'M',
        'details': 'Symbole n°77',
      },
      {
        'start': 496,
        'end': 504,
        'data': 'A',
        'details': 'Symbole n°65',
      },
      {
        'start': 504,
        'end': 512,
        'data': 'I',
        'details': 'Symbole n°73',
      },
      {
        'start': 512,
        'end': 520,
        'data': 'S',
        'details': 'Symbole n°83',
      },
      {
        'start': 520,
        'end': 536,
        'data': ' ON ',
        'details': 'Répétition (4:47)',
        'type': 'repeat',
      },
      {
        'start': 520,
        'end': 527,
        'data': 'L:4',
        'details': 'Symbole n°258 (longueur: 4)',
        'type': 'repeat-part',
      },
      {
        'start': 527,
        'end': 532,
        'data': 'D:33',
        'details': 'Distance n°10 (33)',
        'type': 'repeat-part',
      },
      {
        'start': 532,
        'end': 536,
        'data': '14',
        'details': 'Distance extra (14)',
        'type': 'repeat-part',
      },
      {
        'start': 536,
        'end': 553,
        'data': 'NE PE',
        'details': 'Répétition (5:74)',
        'type': 'repeat',
      },
      {
        'start': 536,
        'end': 543,
        'data': 'L:5',
        'details': 'Symbole n°259 (longueur: 5)',
        'type': 'repeat-part',
      },
      {
        'start': 543,
        'end': 548,
        'data': 'D:65',
        'details': 'Distance n°12 (65)',
        'type': 'repeat-part',
      },
      {
        'start': 548,
        'end': 553,
        'data': '9',
        'details': 'Distance extra (9)',
        'type': 'repeat-part',
      },
      {
        'start': 553,
        'end': 569,
        'data': 'UT ',
        'details': 'Répétition (3:50)',
        'type': 'repeat',
      },
      {
        'start': 553,
        'end': 560,
        'data': 'L:3',
        'details': 'Symbole n°257 (longueur: 3)',
        'type': 'repeat-part',
      },
      {
        'start': 560,
        'end': 565,
        'data': 'D:49',
        'details': 'Distance n°11 (49)',
        'type': 'repeat-part',
      },
      {
        'start': 565,
        'end': 569,
        'data': '1',
        'details': 'Distance extra (1)',
        'type': 'repeat-part',
      },
      {
        'start': 569,
        'end': 577,
        'data': 'P',
        'details': 'Symbole n°80',
      },
      {
        'start': 577,
        'end': 585,
        'data': 'A',
        'details': 'Symbole n°65',
      },
      {
        'start': 585,
        'end': 593,
        'data': 'S',
        'details': 'Symbole n°83',
      },
      {
        'start': 593,
        'end': 611,
        'data': ' TROMPER MILLE PERSONNES',
        'details': 'Répétition (24:54)',
        'type': 'repeat',
      },
      {
        'start': 593,
        'end': 600,
        'data': 'L:23',
        'details': 'Symbole n°270 (longueur: 23)',
        'type': 'repeat-part',
      },
      {
        'start': 600,
        'end': 602,
        'data': '1',
        'details': 'Longueur extra (1)',
        'type': 'repeat-part',
      },
      {
        'start': 602,
        'end': 607,
        'data': 'D:49',
        'details': 'Distance n°11 (49)',
        'type': 'repeat-part',
      },
      {
        'start': 607,
        'end': 611,
        'data': '5',
        'details': 'Distance extra (5)',
        'type': 'repeat-part',
      },
      {
        'start': 611,
        'end': 619,
        'data': ',',
        'details': 'Symbole n°44',
      },
      {
        'start': 619,
        'end': 637,
        'data': ' MILLE FOIS.',
        'details': 'Répétition (12:99)',
        'type': 'repeat',
      },
      {
        'start': 619,
        'end': 626,
        'data': 'L:11',
        'details': 'Symbole n°265 (longueur: 11)',
        'type': 'repeat-part',
      },
      {
        'start': 626,
        'end': 627,
        'data': '1',
        'details': 'Longueur extra (1)',
        'type': 'repeat-part',
      },
      {
        'start': 627,
        'end': 632,
        'data': 'D:97',
        'details': 'Distance n°13 (97)',
        'type': 'repeat-part',
      },
      {
        'start': 632,
        'end': 637,
        'data': '2',
        'details': 'Distance extra (2)',
        'type': 'repeat-part',
      },
      {
        'start': 637,
        'end': 644,
        'details': 'Symbole n°256 (fin de bloc)',
      },
      {
        'start': 644,
        'end': 648,
        'details': 'Padding pour l\'alignement en octets',
      },
      {
        'start': 648,
        'end': 680,
        'details': 'Checksum CRC32',
      },
      {
        'start': 680,
        'end': 712,
        'details': 'Taille originale',
      },
    ],
  },
  {
    'start': COMPRESSED_BITS.length - 64,
    'end': COMPRESSED_BITS.length,
    'details': 'Footers gzip',
    children: [
      {
        'start': COMPRESSED_BITS.length - 64,
        'end': COMPRESSED_BITS.length - 32,
        'details': 'Checksum CRC32',
      },
      {
        'start': COMPRESSED_BITS.length - 32,
        'end': COMPRESSED_BITS.length,
        'details': 'Taille originale',
      },
    ],
  },
];

function inRange (index) {
  return ({ start, end }) => {
    return start <= index && index < end;
  };
}

function formatText (text) {
  return (text ?? '')
    .replaceAll(' ', '⎵');
}

export class GzipExplain extends LitElement {

  static get properties () {
    return {
      mode: { type: String },
      bitIndex: { type: Number },
      _path: { type: Array },
      _hoveredIndex: { type: Number },
      _toggledSegments: { type: Object },
    };
  }

  constructor () {
    super();
    this.mode = 'bits';
    this.bitIndex = 0;
    this._bits = COMPRESSED_BITS.split('');
    this._path = [];
    this._hoveredIndex = null;
    this._toggledSegments = new Set();

    this._onKeypress = this._onKeypress.bind(this);
  }

  _getSegmentDetails (segment) {
    const data = (segment.data != null)
      ? JSON.stringify(formatText(segment.data))
      : null;
    return [
      `[${segment.end - segment.start}]`,
      segment.details,
    ].filter((a) => a != null).join(' ');
  }

  _getFullDetails () {

    if (this._hoveredIndex == null) {
      return;
    }

    const currentSegment = this._getCurrentSegment();
    const hoveredSegment = this._getHoveredSegment();
    if (currentSegment != null && currentSegment.children.includes(hoveredSegment)) {
      return [...this._path, hoveredSegment]
        .map((segment) => this._getSegmentDetails(segment))
        .join(' / ');
    }
    return this._getSegmentDetails(hoveredSegment);
  }

  _getCurrentSegment () {
    if (this._path.length >= 1) {
      return this._path[this._path.length - 1];
    }
  }

  _getHoveredSegment () {

    const index = this._hoveredIndex;

    if (index == null) {
      return;
    }

    // Not really used lol
    if (this._path.length >= 2) {
      const parentSegment = this._path[this._path.length - 2];
      const hoveredSegment = parentSegment.children?.find(inRange(index));
      if (hoveredSegment != null) {
        return hoveredSegment;
      }
    }

    if (this._path.length >= 1) {
      console.log('hey');
      const currentSegment = this._path[this._path.length - 1];
      const hoveredSegment = currentSegment.children
        ?.filter((s) => {
          if (this.mode === 'symbols-h') {
            return s.type !== 'repeat';
          }
          if (this.mode === 'text-h') {
            return s.type !== 'repeat-part';
          }
          return true;
        })
        ?.find(inRange(index));
      if (hoveredSegment != null) {
        return hoveredSegment;
      }
    }

    const hoveredSegment = COMPRESSED_DETAILS.find(inRange(index));
    if (hoveredSegment != null) {
      return hoveredSegment;
    }

  }

  _onClick (index) {

    console.log('click', this._path.length);

    if (this._path.length >= 2) {
      const parentSegment = this._path[this._path.length - 2];
      const clickedSegment = parentSegment.children?.find(inRange(index));
      if (clickedSegment != null && clickedSegment.children != null) {
        this._path[this._path.length - 1] = clickedSegment;
        this.requestUpdate();
        return;
      }
    }

    if (this._path.length >= 1) {
      const currentSegment = this._path[this._path.length - 1];
      const clickedSegment = currentSegment.children
        ?.filter((s) => {
          if (this.mode === 'symbols-h') {
            return s.type !== 'repeat';
          }
          if (this.mode === 'text-h') {
            return s.type !== 'repeat-part';
          }
          return true;
        })
        ?.find(inRange(index));
      if (clickedSegment != null) {

        if (this._toggledSegments.has(clickedSegment)) {
          this._toggledSegments.delete(clickedSegment);
        }
        else {
          this._toggledSegments.add(clickedSegment);
        }

        if (clickedSegment.children != null) {
          this._path = [...this._path, clickedSegment];
          return;
        }
      }
    }

    const clickedSegment = COMPRESSED_DETAILS.find(inRange(index));
    if (clickedSegment != null && clickedSegment.children != null) {
      this._path = [clickedSegment];
      return;
    }
  }

  _onMouseEnter (index) {
    this._hoveredIndex = index;
  }

  _onMouseLeave () {
    this._hoveredIndex = null;
  }

  _onKeypress (e) {
    if (e.code === 'KeyU') {
      if (this._path.length > 0) {
        this._path = this._path.slice(0, this._path.length - 1);
      }
    }
  }

  connectedCallback () {
    super.connectedCallback();
    window.addEventListener('keydown', this._onKeypress);
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._onKeypress);
  }

  firstUpdated () {
    if (this.bitIndex != null) {
      COMPRESSED_DETAILS[1].children
        .filter((segement) => {
          return segement.end <= this.bitIndex;
        })
        .forEach((segment) => {
          console.log(segment);
          this._toggledSegments.add(segment);
        });
      this._path = [COMPRESSED_DETAILS[1]];
    }
    this.requestUpdate();
  }

  render () {

    const details = this._getFullDetails();

    const currentSegment = this._getCurrentSegment();
    const currentIndexes = (currentSegment != null)
      ? Array.from({ length: currentSegment.end - currentSegment.start }).map((_, i) => i + currentSegment.start)
      : [];

    const hoveredSegment = this._getHoveredSegment();
    const hoveredIndexes = (hoveredSegment != null)
      ? Array.from({ length: hoveredSegment.end - hoveredSegment.start }).map((_, i) => i + hoveredSegment.start)
      : [];

    const bits = this._bits.map((bit, i) => {
      const segment = Array.from(this._toggledSegments)
        .find(inRange(i));
      if (segment?.data != null) {
        const bitLength = segment.end - segment.start;
        const text = (segment.data.length > bitLength)
          ? formatText(segment.data).substring(0, bitLength - 1) + '…'
          : formatText(segment.data).padEnd(bitLength, ' ');
        return {
          // bit,
          bit: text[i - segment.start],
          first: i === segment.start,
          middle: segment.start < i && i < segment.end - 1,
          last: i === segment.end - 1,
          type: segment.type,
        };
      }
      return { bit };
    });

    return html`
      <div class="details">${details}</div>
      <div class="bit-grid" data-path-length=${this._path.length}>
        ${bits.map(({ bit, first, middle, last, type }, index) => {
          const cssClasses = {
            bit: true,
            current: currentIndexes.includes(index),
            'segment--first': first,
            'segment--middle': middle,
            'segment--last': last,
            'current--first': currentIndexes[0] === index,
            'current--last': currentIndexes[currentIndexes.length - 1] === index,
            hovered: hoveredIndexes.includes(index),
            // toggled: inRange(index)(segment),
          };
          return html`
            <span
                data-index=${index}
                class="${classMap(cssClasses)}"
                data-type="${type}"
                @click=${(e) => this._onClick(index)}
                @mouseenter=${(e) => this._onMouseEnter(index)}
                @mouseleave=${(e) => this._onMouseLeave(index)}
            >
              <span class="bg"></span>
              <span class="text">${bit}</span>
            </span>
          `;
        })}
      </div>
    `;
  }

  static get styles () {
    return [
      // language=CSS
      css`
        :host {
          display: grid;
          grid-template-rows: 2em auto;
          gap: 1em;
          font-weight: bold;
        }

        .details {
          font-family: "Yanone Kaffeesatz", sans-serif;
          font-weight: bold;
          font-size: 1.5em;
          justify-self: start;
          align-self: end;
        }

        .bit-grid {
          font-family: "Operator Mono Book", monospace;
          display: flex;
          flex-wrap: wrap;
          position: relative;
        }

        .bit {
          --h: 1.2em;
          --margin: 0.05em;
          --bdrs: 0.15em;
          --bgc: transparent;
          height: var(--h);
          line-height: var(--h);
          text-align: center;
          width: 0.75em;
          box-sizing: border-box;
          position: relative;
          user-select: none;
        }

        .bit .text {
          position: relative;
          white-space: pre;
        }

        .bit .bg {
          background-color: var(--bgc);
          bottom: var(--margin);
          left: 0;
          position: absolute;
          right: 0;
          top: var(--margin);
        }

        .bit.current {
          background-color: #eee;
        }

        .bit-grid[data-path-length="1"] .bit:not(.current) {
          opacity: 0.1;
        }

        .bit.segment--first,
        .bit.segment--middle,
        .bit.segment--last {
          --bgc: #777;
          color: #fff;
        }

        .bit.segment--first .bg {
          border-bottom-left-radius: var(--bdrs);
          border-top-left-radius: var(--bdrs);
          bottom: var(--margin);
          display: block;
          left: var(--margin);
        }

        .bit.segment--middle .bg {
          display: block;
        }

        .bit.segment--last .bg {
          border-bottom-right-radius: var(--bdrs);
          border-top-right-radius: var(--bdrs);
          display: block;
          right: var(--margin);
        }

        .bit {
          /*--bgc: blue;*/
          /*color: #fff;*/
        }

        .bit[data-type="repeat"],
        .bit[data-type="repeat-part"] {
          --bgc: red;
          color: #fff;
        }

        .bit.hovered {
          --bgc: yellow;
          color: #000;
          /*background-color: yellow;*/
        }

        .bit.toggled {
          /*background-color: red;*/
        }
      `,
    ];
  }
}

window.customElements.define('gzip-explain', GzipExplain);
