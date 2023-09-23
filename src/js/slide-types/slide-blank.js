import { css } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-blank', {
  // language=CSS
  styles: css`
    :host {
      /* TODO */
    }

    :host([white]) {
      background: #fff;
    }

    :host([black]) {
      background: #000;
    }
  `,
});
