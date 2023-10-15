import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

// TODO: move to a property
const COMPRESSED_BITS = '1111100011010001000100000000000000000000000000000000000000000000000000001100000011001111111100111100101000010100000100101011010010110100100010100001010010010100010100111111001110110100000100101011010001001010000101001011001111010010101000000101000000101000101010001110011111100111100000001001100010011101100110011001110010011100100101010101000010010110100111111001100110100011010111100101000001111111000101100101000010000100010011100000110010100101101000110000011010110001000010001010100101111101100100011001100110100011010100001001111110011110010100000000011011001001000000010101110001010000010010001101000110001110100101110100101110000010011011010100000111010000000000000001111101011010001010000011011100110001000000000000000000000000';

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
        'details': 'Identification byte #1',
      },
      {
        'start': 8,
        'end': 16,
        'details': 'Identification byte #2',
      },
      {
        'start': 16,
        'end': 24,
        'details': 'Compression method',
      },
      {
        'start': 24,
        'end': 32,
        'details': 'Flags',
      },
      {
        'start': 32,
        'end': 64,
        'details': 'Modification time',
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
        'data': 'n',
        'details': 'Symbol #110',
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
        'data': 'p',
        'details': 'Symbol #112',
      },
      {
        'start': 115,
        'end': 123,
        'data': 'e',
        'details': 'Symbol #101',
      },
      {
        'start': 123,
        'end': 131,
        'data': 'u',
        'details': 'Symbol #117',
      },
      {
        'start': 131,
        'end': 139,
        'data': 't',
        'details': 'Symbol #116',
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
        'data': 't',
        'details': 'Symbol #116',
      },
      {
        'start': 155,
        'end': 163,
        'data': 'r',
        'details': 'Symbol #114',
      },
      {
        'start': 163,
        'end': 171,
        'data': 'o',
        'details': 'Symbol #111',
      },
      {
        'start': 171,
        'end': 179,
        'data': 'm',
        'details': 'Symbol #109',
      },
      {
        'start': 179,
        'end': 187,
        'data': 'p',
        'details': 'Symbol #112',
      },
      {
        'start': 187,
        'end': 195,
        'data': 'e',
        'details': 'Symbol #101',
      },
      {
        'start': 195,
        'end': 203,
        'data': 'r',
        'details': 'Symbol #114',
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
        'data': 'u',
        'details': 'Symbol #117',
      },
      {
        'start': 219,
        'end': 227,
        'data': 'n',
        'details': 'Symbol #110',
      },
      {
        'start': 227,
        'end': 235,
        'data': 'e',
        'details': 'Symbol #101',
      },
      // {
      //   'start': 235,
      //   'end': 250,
      //   'data': ' pe',
      //   'details': 'Repeat <17,3>',
      //   'type': 'repeat',
      // },
      {
        'start': 235,
        'end': 242,
        'details': 'Symbol #257 (length: 3)',
        data: 'L:3',
      },
      {
        'start': 242,
        'end': 247,
        'details': 'Distance #8 (17)',
        data: 'D:17',
      },
      {
        'start': 247,
        'end': 250,
        'details': 'Extra distance (0)',
        data: '0',
      },
      {
        'start': 250,
        'end': 258,
        'data': 'r',
        'details': 'Symbol #114',
      },
      {
        'start': 258,
        'end': 266,
        'data': 's',
        'details': 'Symbol #115',
      },
      {
        'start': 266,
        'end': 274,
        'data': 'o',
        'details': 'Symbol #111',
      },
      {
        'start': 274,
        'end': 282,
        'data': 'n',
        'details': 'Symbol #110',
      },
      {
        'start': 282,
        'end': 296,
        'data': 'ne ',
        'details': 'Repeat <9,3>',
        'type': 'repeat',
      },
      {
        'start': 282,
        'end': 289,
        'details': 'Symbol #257 (length: 3)',
      },
      {
        'start': 289,
        'end': 294,
        'details': 'Distance #6 (9)',
      },
      {
        'start': 294,
        'end': 296,
        'details': 'Extra distance (0)',
      },
      {
        'start': 296,
        'end': 304,
        'data': 'm',
        'details': 'Symbol #109',
      },
      {
        'start': 304,
        'end': 312,
        'data': 'i',
        'details': 'Symbol #105',
      },
      {
        'start': 312,
        'end': 320,
        'data': 'l',
        'details': 'Symbol #108',
      },
      {
        'start': 320,
        'end': 328,
        'data': 'l',
        'details': 'Symbol #108',
      },
      {
        'start': 328,
        'end': 336,
        'data': 'e',
        'details': 'Symbol #101',
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
        'data': 'f',
        'details': 'Symbol #102',
      },
      {
        'start': 352,
        'end': 360,
        'data': 'o',
        'details': 'Symbol #111',
      },
      {
        'start': 360,
        'end': 368,
        'data': 'i',
        'details': 'Symbol #105',
      },
      {
        'start': 368,
        'end': 376,
        'data': 's',
        'details': 'Symbol #115',
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
        'data': 'n peut tromper ',
        'details': 'Repeat <41,15>',
        'type': 'repeat',
      },
      {
        'start': 400,
        'end': 407,
        'details': 'Symbol #267 (length: 15)',
      },
      {
        'start': 407,
        'end': 408,
        'details': 'Extra length (0)',
      },
      {
        'start': 408,
        'end': 413,
        'details': 'Distance #10 (33)',
      },
      {
        'start': 413,
        'end': 417,
        'details': 'Extra distance (8)',
      },
      {
        'start': 417,
        'end': 432,
        'data': 'mille ',
        'details': 'Repeat <28,6>',
        'type': 'repeat',
      },
      {
        'start': 417,
        'end': 424,
        'details': 'Symbol #260 (length: 6)',
      },
      {
        'start': 424,
        'end': 429,
        'details': 'Distance #9 (25)',
      },
      {
        'start': 429,
        'end': 432,
        'details': 'Extra distance (3)',
      },
      {
        'start': 432,
        'end': 448,
        'data': 'personne',
        'details': 'Repeat <43,8>',
        'type': 'repeat',
      },
      {
        'start': 432,
        'end': 439,
        'details': 'Symbol #262 (length: 8)',
      },
      {
        'start': 439,
        'end': 444,
        'details': 'Distance #10 (33)',
      },
      {
        'start': 444,
        'end': 448,
        'details': 'Extra distance (10)',
      },
      {
        'start': 448,
        'end': 456,
        'data': 's',
        'details': 'Symbol #115',
      },
      {
        'start': 456,
        'end': 472,
        'data': ' une ',
        'details': 'Repeat <57,5>',
        'type': 'repeat',
      },
      {
        'start': 456,
        'end': 463,
        'details': 'Symbol #259 (length: 5)',
      },
      {
        'start': 463,
        'end': 468,
        'details': 'Distance #11 (49)',
      },
      {
        'start': 468,
        'end': 472,
        'details': 'Extra distance (8)',
      },
      {
        'start': 472,
        'end': 488,
        'data': 'fois. ',
        'details': 'Repeat <42,6>',
        'type': 'repeat',
      },
      {
        'start': 472,
        'end': 479,
        'details': 'Symbol #260 (length: 6)',
      },
      {
        'start': 479,
        'end': 484,
        'details': 'Distance #10 (33)',
      },
      {
        'start': 484,
        'end': 488,
        'details': 'Extra distance (9)',
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
        'data': 'a',
        'details': 'Symbol #97',
      },
      {
        'start': 504,
        'end': 512,
        'data': 'i',
        'details': 'Symbol #105',
      },
      {
        'start': 512,
        'end': 520,
        'data': 's',
        'details': 'Symbol #115',
      },
      {
        'start': 520,
        'end': 528,
        'data': ' ',
        'details': 'Symbol #32',
      },
      {
        'start': 528,
        'end': 536,
        'data': 'o',
        'details': 'Symbol #111',
      },
      {
        'start': 536,
        'end': 544,
        'data': 'n',
        'details': 'Symbol #110',
      },
      {
        'start': 544,
        'end': 552,
        'data': ' ',
        'details': 'Symbol #32',
      },
      {
        'start': 552,
        'end': 569,
        'data': 'ne pe',
        'details': 'Repeat <74,5>',
        'type': 'repeat',
      },
      {
        'start': 552,
        'end': 559,
        'details': 'Symbol #259 (length: 5)',
      },
      {
        'start': 559,
        'end': 564,
        'details': 'Distance #12 (65)',
      },
      {
        'start': 564,
        'end': 569,
        'details': 'Extra distance (9)',
      },
      {
        'start': 569,
        'end': 585,
        'data': 'ut ',
        'details': 'Repeat <50,3>',
        'type': 'repeat',
      },
      {
        'start': 569,
        'end': 576,
        'details': 'Symbol #257 (length: 3)',
      },
      {
        'start': 576,
        'end': 581,
        'details': 'Distance #11 (49)',
      },
      {
        'start': 581,
        'end': 585,
        'details': 'Extra distance (1)',
      },
      {
        'start': 585,
        'end': 593,
        'data': 'p',
        'details': 'Symbol #112',
      },
      {
        'start': 593,
        'end': 601,
        'data': 'a',
        'details': 'Symbol #97',
      },
      {
        'start': 601,
        'end': 609,
        'data': 's',
        'details': 'Symbol #115',
      },
      {
        'start': 609,
        'end': 627,
        'data': ' tromper mille personnes',
        'details': 'Repeat <54,24>',
        'type': 'repeat',
      },
      {
        'start': 609,
        'end': 616,
        'details': 'Symbol #270 (length: 23)',
      },
      {
        'start': 616,
        'end': 618,
        'details': 'Extra length (1)',
      },
      {
        'start': 618,
        'end': 623,
        'details': 'Distance #11 (49)',
      },
      {
        'start': 623,
        'end': 627,
        'details': 'Extra distance (5)',
      },
      {
        'start': 627,
        'end': 635,
        'data': ',',
        'details': 'Symbol #44',
      },
      {
        'start': 635,
        'end': 653,
        'data': ' mille fois.',
        'details': 'Repeat <99,12>',
        'type': 'repeat',
      },
      {
        'start': 635,
        'end': 642,
        'details': 'Symbol #265 (length: 11)',
      },
      {
        'start': 642,
        'end': 643,
        'details': 'Extra length (1)',
      },
      {
        'start': 643,
        'end': 648,
        'details': 'Distance #13 (97)',
      },
      {
        'start': 648,
        'end': 653,
        'details': 'Extra distance (2)',
      },
      {
        'start': 653,
        'end': 661,
        'data': '\n',
        'details': 'Symbol #10',
      },
      {
        'start': 661,
        'end': 668,
        'details': 'Symbol #256 (end of block)',
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
    .replaceAll(' ', '⎵')
    .replaceAll('\n', '\\n');
}

export class GzipExplain extends LitElement {

  static get properties () {
    return {
      _path: { type: Array },
      _hoveredIndex: { type: Number },
      _toggledSegments: { type: Object },
    };
  }

  constructor () {
    super();
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
      data,
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
      const hoveredSegment = currentSegment.children
        ?.filter((s) => s.type !== 'repeat')
        ?.find(inRange(index));
      if (hoveredSegment != null) {
        return hoveredSegment;
      }
    }

    if (this._path.length >= 2) {
      const parentSegment = this._path[this._path.length - 2];
      const hoveredSegment = parentSegment.children
        ?.filter((s) => s.type !== 'repeat')
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

  _toggleSegment (segment) {
    if (segment == null || segment.children != null) {
      return;
    }
    if (segment.type === 'repeat-part') {
      const currentSegment = this._getCurrentSegment();
      if (currentSegment.children != null) {
        const segmentIndex = currentSegment.children.indexOf(segment);
        const repeatSegment = currentSegment.children.slice(segmentIndex + 1).find((s) => s.type === 'repeat');
        return this._toggleSegment(repeatSegment);
      }
    }
    if (this._toggledSegments.has(segment)) {
      this._toggledSegments.delete(segment);
    }
    else {
      this._toggledSegments.add(segment);
    }
    this.requestUpdate();
  }

  _onClick (index) {
    console.log('_onClick', index);

    if (this._path.length >= 1) {
      const currentSegment = this._path[this._path.length - 1];
      const clickedSegment = currentSegment.children?.find(inRange(index));
      this._toggleSegment(clickedSegment);
      if (clickedSegment != null && clickedSegment.children != null) {
        this._path = [...this._path, clickedSegment];
        return;
      }
    }

    if (this._path.length >= 2) {
      const parentSegment = this._path[this._path.length - 2];
      const clickedSegment = parentSegment.children?.find(inRange(index));
      this._toggleSegment(clickedSegment);
      if (clickedSegment != null && clickedSegment.children != null) {
        this._path[this._path.length - 1] = clickedSegment;
        this.requestUpdate();
        return;
      }
    }

    const clickedSegment = COMPRESSED_DETAILS.find(inRange(index));
    this._toggleSegment(clickedSegment);
    if (clickedSegment != null && clickedSegment.children != null) {
      this._path = [clickedSegment];
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

  updated () {
    const MARGIN_V = 4; // 4
    const MARGIN_H = 4; // 6
    const parentBox = this.shadowRoot.querySelector('.bit-grid').getBoundingClientRect();
    Array
      .from(this.shadowRoot.querySelectorAll('.segment'))
      .forEach(($segment) => {

        const start = Number($segment.dataset.start);
        const end = Number($segment.dataset.end);
        const $start = this.shadowRoot.querySelector('.bit-grid').children[start];
        const $end = this.shadowRoot.querySelector('.bit-grid').children[end - 1];
        const startBox = $start.getBoundingClientRect();
        const endBox = $end.getBoundingClientRect();

        const side = $segment.dataset.side;
        if (startBox.top === endBox.top) {
          $segment.style.display = (side === 'b') ? 'none' : null;
          $segment.classList.toggle('full', side === 'a');
          let newTop = startBox.top - parentBox.top + MARGIN_V;
          let newLeft = startBox.left - parentBox.left + MARGIN_H;
          let newHeight = endBox.bottom - startBox.top - (MARGIN_V * 2);
          let newWidth = endBox.right - startBox.left - (MARGIN_H * 2);
          $segment.style.top = newTop + 'px';
          $segment.style.left = newLeft + 'px';
          $segment.style.width = newWidth + 'px';
          $segment.style.height = newHeight + 'px';
          const textLength = $segment.dataset.text.length;
          const bitLength = end - start;
          if (bitLength < textLength) {
            $segment.style.fontSize = (0.9 * bitLength / textLength) + 'em';
          }
          $segment.innerHTML = `<span>${$segment.dataset.text}</span>`;
        }
        else if (side === 'a') {
          const segmentChildren = Array.from(this.shadowRoot.querySelector('.bit-grid').children).slice(start, end);
          const segmentChildrenBoxes = segmentChildren.map(($child) => $child.getBoundingClientRect());
          const bStartIndex = segmentChildrenBoxes.findIndex((box) => box.top === endBox.top);
          const aEndIndex = bStartIndex - 1;
          const $aEnd = segmentChildren[aEndIndex];
          const aEndBox = $aEnd.getBoundingClientRect();

          let newTop = startBox.top - parentBox.top + MARGIN_V;
          let newLeft = startBox.left - parentBox.left + MARGIN_H;
          let newHeight = aEndBox.bottom - startBox.top - (MARGIN_V * 2);
          let newWidth = aEndBox.right - startBox.left - MARGIN_H;
          $segment.style.top = newTop + 'px';
          $segment.style.left = newLeft + 'px';
          $segment.style.width = newWidth + 'px';
          $segment.style.height = newHeight + 'px';
          const textLength = $segment.dataset.text.length;
          const bitLength = aEndIndex;
          $segment.innerHTML = `<span>${$segment.dataset.text.slice(0, bitLength + 1)}</span>`;
        }
        else if (side === 'b') {
          const segmentChildren = Array.from(this.shadowRoot.querySelector('.bit-grid').children).slice(start, end);
          const segmentChildrenBoxes = segmentChildren.map(($child) => $child.getBoundingClientRect());
          const bStartIndex = segmentChildrenBoxes.findIndex((box) => box.top === endBox.top);
          const $bStart = segmentChildren[bStartIndex];
          const bStartBox = $bStart.getBoundingClientRect();

          let newTop = bStartBox.top - parentBox.top + MARGIN_V;
          let newLeft = bStartBox.left - parentBox.left;
          let newHeight = endBox.bottom - bStartBox.top - (MARGIN_V * 2);
          let newWidth = endBox.right - bStartBox.left - MARGIN_H;
          $segment.style.top = newTop + 'px';
          $segment.style.left = newLeft + 'px';
          $segment.style.width = newWidth + 'px';
          $segment.style.height = newHeight + 'px';
          const textLength = $segment.dataset.text.length;
          const bitLength = bStartIndex;
          $segment.innerHTML = `<span>${$segment.dataset.text.slice(bitLength + 1)}</span>`;
        }

      });
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

    const toggledIndexes = [];
    Array.from(this._toggledSegments).forEach((segment) => {
      for (let i = segment.start; i < segment.end; i += 1) {
        if (!toggledIndexes.includes(i)) {
          toggledIndexes.push(i);
        }
      }
    });

    return html`
      <div class="details">${details}</div>
      <div class="bit-grid">
        ${this._bits.map((bit, index) => {
          const cssClasses = {
            bit: true,
            current: currentIndexes.includes(index),
            'current--first': currentIndexes[0] === index,
            'current--last': currentIndexes[currentIndexes.length - 1] === index,
            hovered: hoveredIndexes.includes(index),
            toggled: toggledIndexes.includes(index),
          };
          return html`
            <span
                data-index=${index}
                class="${classMap(cssClasses)}"
                @click=${(e) => this._onClick(index)}
                @mouseenter=${(e) => this._onMouseEnter(index)}
                @mouseleave=${(e) => this._onMouseLeave(index)}
            >
              ${bit}
            </span>
          `;
        })}
        ${Array.from(this._toggledSegments).map((segment) => {
          const text = formatText(segment?.data);
          return html`
            <div
                class="segment"
                data-side="a"
                data-start=${segment.start}
                data-end=${segment.end}
                data-text=${text}
                data-type=${segment.type}
                @click=${() => this._toggleSegment(segment)}
                @mouseenter=${(e) => this._onMouseEnter(segment.start)}
                @mouseleave=${(e) => this._onMouseLeave(segment.start)}
            ></div>
            <div
                class="segment"
                data-side="b"
                data-start=${segment.start}
                data-end=${segment.end}
                data-text=${text}
                data-type=${segment.type}
                @click=${() => this._toggleSegment(segment)}
                @mouseenter=${(e) => this._onMouseEnter(segment.start)}
                @mouseleave=${(e) => this._onMouseLeave(segment.start)}
            ></div>
          `;
        })}
      </div>
      <div class="debug">
        <div>this._hoveredIndex:${JSON.stringify(this._hoveredIndex)}</div>
        <div>this._path:${JSON.stringify(this._path)}</div>
        <div>currentSegment:${JSON.stringify(currentSegment?.details)}</div>
        <div>hoveredSegment:${JSON.stringify(hoveredSegment?.details)}</div>
      </div>
    `;
  }

  static get styles () {
    return [
      // language=CSS
      css`
        :host {
          display: grid;
          grid-template-rows: 5rem auto;
          gap: 2em;
        }

        .details {
          font-family: "Yanone Kaffeesatz", sans-serif;
          font-weight: bold;
          font-size: 0.8em;
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
          user-select: none;
          /*border-width: 1px;*/
          /*border-style: solid;*/
          /*border-color: transparent;*/
        }

        .bit.current {
          background-color: #eee;
          /*border-top-color: #000;*/
          /*border-bottom-color: #000;*/
        }

        .bit.current--first {
          /*border-left-color: #000;*/
        }

        .bit.current--last {
          /*border-right-color: #000;*/
        }

        .bit.hovered {
          background-color: yellow;
        }

        .bit.toggled {
          color: transparent;
        }

        .segment {
          font-size: 0.85em;
          position: absolute;
          box-sizing: border-box;
          z-index: 2;
          --bdrs: 0.25rem;
          display: flex;
          justify-content: start;
          align-items: center;
          padding-left: 0.2em;
          font-weight: bold;
        }

        /*.segment.literal,*/
        .segment {
          background-color: #235e42;
          background-color: #777;
          color: #fff;
        }

        .segment[data-type="repeat"] {
          background-color: #ea3820;
          color: #fff;
        }

        .segment[data-side="a"] {
          border-radius: var(--bdrs) 0 0 var(--bdrs);
        }

        .segment[data-side="b"] {
          border-radius: 0 var(--bdrs) var(--bdrs) 0;
        }

        .segment.full {
          border-radius: var(--bdrs);
        }

        .debug {
          display: none;
          font-family: monospace;
          font-size: 0.2em;
        }
      `,
    ];
  }
}

window.customElements.define('gzip-explain', GzipExplain);
