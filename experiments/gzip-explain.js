import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

// TODO: move to a property
const COMPRESSED_BITS = '1111100011010001000100000000000000000000000000000000000000000000000000001100000011001111111011111100101000010000000011101011000010110000100010100001000010010000010011111110111110110000000011101011000001001010000100001010111111001110101000000101000000100000101000001101111111011111100000001001100001111101011110010111110001111100011101010101000001110110011111110111100110000011010111100101000001111111000101100101000010000100010011100000110010100101100000110000011010110001000010001010100101111101011100010111100110000011000001001010011100000110110010010000000101011100010000000011100011000001100011101001011101001011100000100110110101000000000000001101011010101011110101011000100111010001000000000000000000000000';

// TODO: move to a property
const COMPRESSED_DETAILS = [
  {
    'start': 0,
    'end': 80,
    'details': 'Gzip headers',
    children: [
      {
        'start': 0,
        'end': 8,
        'bits': '00011111',
        'details': 'Identification byte #1',
      },
      {
        'start': 8,
        'end': 16,
        'bits': '10001011',
        'details': 'Identification byte #2',
      },
      {
        'start': 16,
        'end': 24,
        'bits': '00001000',
        'details': 'Compression method',
      },
      {
        'start': 24,
        'end': 32,
        'bits': '00000000',
        'details': 'Flags',
      },
      {
        'start': 32,
        'end': 64,
        'bits': '00000000000000000000000000000000',
        'details': 'Modification time',
      },
      {
        'start': 64,
        'end': 72,
        'bits': '00000000',
        'details': 'Extra flags',
      },
      {
        'start': 72,
        'end': 80,
        'bits': '00000011',
        'details': 'OS',
      },
    ],
  },
  {
    start: 80,
    'end': COMPRESSED_BITS.length - 64,
    details: 'Block #0',
    children: [
      {
        'start': 80,
        'end': 81,
        'details': 'Is last: yes',
      },
      {
        'start': 81,
        'end': 83,
        'details': 'Type: 1',
      },
      {
        'start': 83,
        'end': 91,
        'data': 'O',
        'details': 'Symbol #79',
      },
      {
        'start': 91,
        'end': 99,
        'data': 'N',
        'details': 'Symbol #78',
      },
      {
        'start': 99,
        'end': 107,
        'data': ' ',
        'details': 'Symbol #32',
      },
      {
        'start': 107,
        'end': 115,
        'data': 'P',
        'details': 'Symbol #80',
      },
      {
        'start': 115,
        'end': 123,
        'data': 'E',
        'details': 'Symbol #69',
      },
      {
        'start': 123,
        'end': 131,
        'data': 'U',
        'details': 'Symbol #85',
      },
      {
        'start': 131,
        'end': 139,
        'data': 'T',
        'details': 'Symbol #84',
      },
      {
        'start': 139,
        'end': 147,
        'data': ' ',
        'details': 'Symbol #32',
      },
      {
        'start': 147,
        'end': 155,
        'data': 'T',
        'details': 'Symbol #84',
      },
      {
        'start': 155,
        'end': 163,
        'data': 'R',
        'details': 'Symbol #82',
      },
      {
        'start': 163,
        'end': 171,
        'data': 'O',
        'details': 'Symbol #79',
      },
      {
        'start': 171,
        'end': 179,
        'data': 'M',
        'details': 'Symbol #77',
      },
      {
        'start': 179,
        'end': 187,
        'data': 'P',
        'details': 'Symbol #80',
      },
      {
        'start': 187,
        'end': 195,
        'data': 'E',
        'details': 'Symbol #69',
      },
      {
        'start': 195,
        'end': 203,
        'data': 'R',
        'details': 'Symbol #82',
      },
      {
        'start': 203,
        'end': 211,
        'data': ' ',
        'details': 'Symbol #32',
      },
      {
        'start': 211,
        'end': 219,
        'data': 'U',
        'details': 'Symbol #85',
      },
      {
        'start': 219,
        'end': 227,
        'data': 'N',
        'details': 'Symbol #78',
      },
      {
        'start': 227,
        'end': 235,
        'data': 'E',
        'details': 'Symbol #69',
      },
      {
        'start': 235,
        'end': 250,
        'data': ' PE',
        'details': 'Repeat (3:17)',
        'type': 'repeat',
      },
      {
        'start': 235,
        'end': 242,
        'data': 'L:3',
        'details': 'Symbol #257 (length: 3)',
        'type': 'repeat-part',
      },
      {
        'start': 242,
        'end': 247,
        'data': 'D:17',
        'details': 'Distance #8 (17)',
        'type': 'repeat-part',
      },
      {
        'start': 247,
        'end': 250,
        'data': '0',
        'details': 'Extra distance (0)',
        'type': 'repeat-part',
      },
      {
        'start': 250,
        'end': 258,
        'data': 'R',
        'details': 'Symbol #82',
      },
      {
        'start': 258,
        'end': 266,
        'data': 'S',
        'details': 'Symbol #83',
      },
      {
        'start': 266,
        'end': 274,
        'data': 'O',
        'details': 'Symbol #79',
      },
      {
        'start': 274,
        'end': 282,
        'data': 'N',
        'details': 'Symbol #78',
      },
      {
        'start': 282,
        'end': 296,
        'data': 'NE ',
        'details': 'Repeat (3:9)',
        'type': 'repeat',
      },
      {
        'start': 282,
        'end': 289,
        'data': 'L:3',
        'details': 'Symbol #257 (length: 3)',
        'type': 'repeat-part',
      },
      {
        'start': 289,
        'end': 294,
        'data': 'D:9',
        'details': 'Distance #6 (9)',
        'type': 'repeat-part',
      },
      {
        'start': 294,
        'end': 296,
        'data': '0',
        'details': 'Extra distance (0)',
        'type': 'repeat-part',
      },
      {
        'start': 296,
        'end': 304,
        'data': 'M',
        'details': 'Symbol #77',
      },
      {
        'start': 304,
        'end': 312,
        'data': 'I',
        'details': 'Symbol #73',
      },
      {
        'start': 312,
        'end': 320,
        'data': 'L',
        'details': 'Symbol #76',
      },
      {
        'start': 320,
        'end': 328,
        'data': 'L',
        'details': 'Symbol #76',
      },
      {
        'start': 328,
        'end': 336,
        'data': 'E',
        'details': 'Symbol #69',
      },
      {
        'start': 336,
        'end': 344,
        'data': ' ',
        'details': 'Symbol #32',
      },
      {
        'start': 344,
        'end': 352,
        'data': 'F',
        'details': 'Symbol #70',
      },
      {
        'start': 352,
        'end': 360,
        'data': 'O',
        'details': 'Symbol #79',
      },
      {
        'start': 360,
        'end': 368,
        'data': 'I',
        'details': 'Symbol #73',
      },
      {
        'start': 368,
        'end': 376,
        'data': 'S',
        'details': 'Symbol #83',
      },
      {
        'start': 376,
        'end': 384,
        'data': '.',
        'details': 'Symbol #46',
      },
      {
        'start': 384,
        'end': 392,
        'data': ' ',
        'details': 'Symbol #32',
      },
      {
        'start': 392,
        'end': 400,
        'data': 'O',
        'details': 'Symbol #79',
      },
      {
        'start': 400,
        'end': 417,
        'data': 'N PEUT TROMPER ',
        'details': 'Repeat (15:41)',
        'type': 'repeat',
      },
      {
        'start': 400,
        'end': 407,
        'data': 'L:15',
        'details': 'Symbol #267 (length: 15)',
        'type': 'repeat-part',
      },
      {
        'start': 407,
        'end': 408,
        'data': '0',
        'details': 'Extra length (0)',
        'type': 'repeat-part',
      },
      {
        'start': 408,
        'end': 413,
        'data': 'D:33',
        'details': 'Distance #10 (33)',
        'type': 'repeat-part',
      },
      {
        'start': 413,
        'end': 417,
        'data': '8',
        'details': 'Extra distance (8)',
        'type': 'repeat-part',
      },
      {
        'start': 417,
        'end': 432,
        'data': 'MILLE ',
        'details': 'Repeat (6:28)',
        'type': 'repeat',
      },
      {
        'start': 417,
        'end': 424,
        'data': 'L:6',
        'details': 'Symbol #260 (length: 6)',
        'type': 'repeat-part',
      },
      {
        'start': 424,
        'end': 429,
        'data': 'D:25',
        'details': 'Distance #9 (25)',
        'type': 'repeat-part',
      },
      {
        'start': 429,
        'end': 432,
        'data': '3',
        'details': 'Extra distance (3)',
        'type': 'repeat-part',
      },
      {
        'start': 432,
        'end': 448,
        'data': 'PERSONNE',
        'details': 'Repeat (8:43)',
        'type': 'repeat',
      },
      {
        'start': 432,
        'end': 439,
        'data': 'L:8',
        'details': 'Symbol #262 (length: 8)',
        'type': 'repeat-part',
      },
      {
        'start': 439,
        'end': 444,
        'data': 'D:33',
        'details': 'Distance #10 (33)',
        'type': 'repeat-part',
      },
      {
        'start': 444,
        'end': 448,
        'data': '10',
        'details': 'Extra distance (10)',
        'type': 'repeat-part',
      },
      {
        'start': 448,
        'end': 456,
        'data': 'S',
        'details': 'Symbol #83',
      },
      {
        'start': 456,
        'end': 472,
        'data': ' UNE ',
        'details': 'Repeat (5:57)',
        'type': 'repeat',
      },
      {
        'start': 456,
        'end': 463,
        'data': 'L:5',
        'details': 'Symbol #259 (length: 5)',
        'type': 'repeat-part',
      },
      {
        'start': 463,
        'end': 468,
        'data': 'D:49',
        'details': 'Distance #11 (49)',
        'type': 'repeat-part',
      },
      {
        'start': 468,
        'end': 472,
        'data': '8',
        'details': 'Extra distance (8)',
        'type': 'repeat-part',
      },
      {
        'start': 472,
        'end': 488,
        'data': 'FOIS. ',
        'details': 'Repeat (6:42)',
        'type': 'repeat',
      },
      {
        'start': 472,
        'end': 479,
        'data': 'L:6',
        'details': 'Symbol #260 (length: 6)',
        'type': 'repeat-part',
      },
      {
        'start': 479,
        'end': 484,
        'data': 'D:33',
        'details': 'Distance #10 (33)',
        'type': 'repeat-part',
      },
      {
        'start': 484,
        'end': 488,
        'data': '9',
        'details': 'Extra distance (9)',
        'type': 'repeat-part',
      },
      {
        'start': 488,
        'end': 496,
        'data': 'M',
        'details': 'Symbol #77',
      },
      {
        'start': 496,
        'end': 504,
        'data': 'A',
        'details': 'Symbol #65',
      },
      {
        'start': 504,
        'end': 512,
        'data': 'I',
        'details': 'Symbol #73',
      },
      {
        'start': 512,
        'end': 520,
        'data': 'S',
        'details': 'Symbol #83',
      },
      {
        'start': 520,
        'end': 536,
        'data': ' ON ',
        'details': 'Repeat (4:47)',
        'type': 'repeat',
      },
      {
        'start': 520,
        'end': 527,
        'data': 'L:4',
        'details': 'Symbol #258 (length: 4)',
        'type': 'repeat-part',
      },
      {
        'start': 527,
        'end': 532,
        'data': 'D:33',
        'details': 'Distance #10 (33)',
        'type': 'repeat-part',
      },
      {
        'start': 532,
        'end': 536,
        'data': '14',
        'details': 'Extra distance (14)',
        'type': 'repeat-part',
      },
      {
        'start': 536,
        'end': 553,
        'data': 'NE PE',
        'details': 'Repeat (5:74)',
        'type': 'repeat',
      },
      {
        'start': 536,
        'end': 543,
        'data': 'L:5',
        'details': 'Symbol #259 (length: 5)',
        'type': 'repeat-part',
      },
      {
        'start': 543,
        'end': 548,
        'data': 'D:65',
        'details': 'Distance #12 (65)',
        'type': 'repeat-part',
      },
      {
        'start': 548,
        'end': 553,
        'data': '9',
        'details': 'Extra distance (9)',
        'type': 'repeat-part',
      },
      {
        'start': 553,
        'end': 569,
        'data': 'UT ',
        'details': 'Repeat (3:50)',
        'type': 'repeat',
      },
      {
        'start': 553,
        'end': 560,
        'data': 'L:3',
        'details': 'Symbol #257 (length: 3)',
        'type': 'repeat-part',
      },
      {
        'start': 560,
        'end': 565,
        'data': 'D:49',
        'details': 'Distance #11 (49)',
        'type': 'repeat-part',
      },
      {
        'start': 565,
        'end': 569,
        'data': '1',
        'details': 'Extra distance (1)',
        'type': 'repeat-part',
      },
      {
        'start': 569,
        'end': 577,
        'data': 'P',
        'details': 'Symbol #80',
      },
      {
        'start': 577,
        'end': 585,
        'data': 'A',
        'details': 'Symbol #65',
      },
      {
        'start': 585,
        'end': 593,
        'data': 'S',
        'details': 'Symbol #83',
      },
      {
        'start': 593,
        'end': 611,
        'data': ' TROMPER MILLE PERSONNES',
        'details': 'Repeat (24:54)',
        'type': 'repeat',
      },
      {
        'start': 593,
        'end': 600,
        'data': 'L:23',
        'details': 'Symbol #270 (length: 23)',
        'type': 'repeat-part',
      },
      {
        'start': 600,
        'end': 602,
        'data': '1',
        'details': 'Extra length (1)',
        'type': 'repeat-part',
      },
      {
        'start': 602,
        'end': 607,
        'data': 'D:49',
        'details': 'Distance #11 (49)',
        'type': 'repeat-part',
      },
      {
        'start': 607,
        'end': 611,
        'data': '5',
        'details': 'Extra distance (5)',
        'type': 'repeat-part',
      },
      {
        'start': 611,
        'end': 619,
        'data': ',',
        'details': 'Symbol #44',
      },
      {
        'start': 619,
        'end': 637,
        'data': ' MILLE FOIS.',
        'details': 'Repeat (12:99)',
        'type': 'repeat',
      },
      {
        'start': 619,
        'end': 626,
        'data': 'L:11',
        'details': 'Symbol #265 (length: 11)',
        'type': 'repeat-part',
      },
      {
        'start': 626,
        'end': 627,
        'data': '1',
        'details': 'Extra length (1)',
        'type': 'repeat-part',
      },
      {
        'start': 627,
        'end': 632,
        'data': 'D:97',
        'details': 'Distance #13 (97)',
        'type': 'repeat-part',
      },
      {
        'start': 632,
        'end': 637,
        'data': '2',
        'details': 'Extra distance (2)',
        'type': 'repeat-part',
      },
      {
        'start': 637,
        'end': 644,
        'details': 'Symbol #256 (end of block)',
      },
      {
        'start': 644,
        'end': 648,
        'details': 'Padding for byte alignment',
      },
      {
        'start': 648,
        'end': 680,
        'details': 'CRC32 checksum',
      },
      {
        'start': 680,
        'end': 712,
        'details': 'Original size',
      },
    ],
  },
  {
    'start': COMPRESSED_BITS.length - 64,
    'end': COMPRESSED_BITS.length,
    'details': 'Gzip footers',
    children: [
      {
        'start': COMPRESSED_BITS.length - 64,
        'end': COMPRESSED_BITS.length - 32,
        'details': 'CRC32 checksum',
      },
      {
        'start': COMPRESSED_BITS.length - 32,
        'end': COMPRESSED_BITS.length,
        'details': 'Original size',
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
      _path: { type: Array },
      _hoveredIndex: { type: Number },
    };
  }

  constructor () {
    super();
    this.mode = 'bits';
    this._bits = COMPRESSED_BITS.split('');
    this._path = [];
    this._hoveredIndex = null;

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

    if (this._path.length >= 1) {
      const currentSegment = this._path[this._path.length - 1];
      const hoveredSegment = currentSegment.children?.find(inRange(index));
      if (hoveredSegment != null) {
        return hoveredSegment;
      }
    }

    if (this._path.length >= 2) {
      const parentSegment = this._path[this._path.length - 2];
      const hoveredSegment = parentSegment.children?.find(inRange(index));
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

    if (this._path.length >= 1) {
      const currentSegment = this._path[this._path.length - 1];
      const clickedSegment = currentSegment.children?.find(inRange(index));
      if (clickedSegment != null && clickedSegment.children != null) {
        this._path = [...this._path, clickedSegment];
        return;
      }
    }

    if (this._path.length >= 2) {
      const parentSegment = this._path[this._path.length - 2];
      const clickedSegment = parentSegment.children?.find(inRange(index));
      if (clickedSegment != null && clickedSegment.children != null) {
        this._path[this._path.length - 1] = clickedSegment;
        this.requestUpdate();
        return;
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
      const segment = COMPRESSED_DETAILS[1].children
        .filter((s) => {
          if (this.mode === 'symbols') {
            return s.type !== 'repeat';
          }
          if (this.mode === 'text') {
            return s.type !== 'repeat-part';
          }
          return false;
        })
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
      <div class="bit-grid">
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
          --bgc: blue;
          color: #fff;
        }

        .bit[data-type="repeat"],
        .bit[data-type="repeat-part"] {
          --bgc: red;
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
