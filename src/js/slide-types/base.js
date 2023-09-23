import { css, LitElement } from 'lit';
import { $$, entriesToObject, toCamelCase, trim } from '../utils.mjs';
import { vsCss } from '../vs.css.js';
import { atomOneLightCss } from '../atom-one-light.css.js';

// language=CSS
export const defaultSlideStyles = css`
  .hljs-built_in, .hljs-class .hljs-title, .hljs-title.class_ {
    color: #7b5502;
  }

  .hljs-attr {
    color: #aa0000;
  }

  :host {
    display: block;
    background-color: #fff;
  }

  :host([todo]) {
    position: relative;
  }

  .todo-banner,
  :host([todo])::after {
    content: 'TODO';
    display: block;
    position: absolute;
    left: 0;
    background-color: #ff0;
    border-style: solid;
    border-color: #000;
    border-width: 0.1rem 0;
    font-family: Arial, sans-serif;
    padding: 0 5rem;
    top: 0;
    transform: translateX(-35%) translateY(60%) rotate(-45deg);
  }

  audio {
    display: none;
  }
`;

// language=CSS
export const codeBlocksStyles = css`

  .code-blocks {
    align-content: center;
    display: grid;
    gap: 1rem;
    justify-content: center;
  }

  pre {
    background-color: #f5f5f5;
    white-space: pre-wrap;
    margin: 0 2rem;
    padding: 1rem;
    border-radius: 0.5rem;
    font-family: "Operator Mono Book", monospace;
    font-size: 1.25rem;
    font-weight: bold;
  }

  pre[big] {
    font-size: 1.5rem;
  }

  pre[medium] {
    font-size: 1.1rem;
  }

  pre[small] {
    font-size: 0.8rem;
  }

  pre[tiny] {
    font-size: 0.6rem;
  }

  pre[invisible] {
    opacity: 0;
  }

  pre[dim] {
    opacity: 0.5;
  }
`;

export function defineSlideType (slideType, options) {

  window.customElements.define(slideType, class extends LitElement {

    static get properties () {
      return {
        position: { type: String, attribute: 'data-position', reflect: true },
      };
    }

    render () {

      const attrs = this.getAttributeNames()
        .map((name) => [toCamelCase(name), this.getAttribute(name)])
        .reduce(entriesToObject);

      if (trim(this.innerHTML) === '') {
        this.innerHTML = '';
      }

      const content = (this.innerHTML !== '') ? this.innerHTML : null;

      return options.render
        ? options.render({ attrs, content })
        : '';
    }

    update (changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has('position')) {
        const elements = Array
          .from(this.shadowRoot.querySelectorAll('[id]'))
          .map((node) => [node.id, node])
          .reduce(entriesToObject, []);
        elements['host'] = this.shadowRoot;
        if (this.position === 'current') {
          if (options.onEnter != null) {
            options.onEnter(elements);
          }
          $$(this.shadowRoot, 'audio.global, video').forEach((media) => {
            console.log({ media });
            playMedia(media);
          });
          $$(this, 'audio.global').forEach((media) => {
            console.log({ media });
            playMedia(media);
          });
        }
        if (this.position !== 'current') {
          if (options.onLeave != null) {
            options.onLeave(this.position, elements);
          }
          $$(this, 'audio, video').forEach((media) => stopMedia(media));
        }
      }
    }

    static get styles () {
      return [
        atomOneLightCss,
        vsCss,
        defaultSlideStyles,
        codeBlocksStyles,
        options.styles ?? '',
      ];
    }
  });
}

export class Slide extends LitElement {

  static get properties () {
    return {
      position: { type: String, attribute: 'data-position', reflect: true },
    };
  }

  render () {

    const attrs = this.getAttributeNames()
      .map((name) => [toCamelCase(name), this.getAttribute(name)])
      .reduce(entriesToObject);

    if (trim(this.innerHTML) === '') {
      this.innerHTML = '';
    }

    const content = (this.innerHTML !== '') ? this.innerHTML : null;

    return this?.renderSlide({ attrs, content }) ?? '';
  }

  update (changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has('position')) {
      const elements = Array
        .from(this.shadowRoot.querySelectorAll('[id]'))
        .map((node) => [node.id, node])
        .reduce(entriesToObject, []);
      elements['host'] = this.shadowRoot;
      if (this.position === 'current') {
        if (this.onEnter != null) {
          this.onEnter(elements);
        }
        $$(this.shadowRoot, 'audio.global, video').forEach((media) => {
          console.log({ media });
          playMedia(media);
        });
        $$(this, 'audio.global').forEach((media) => {
          console.log({ media });
          playMedia(media);
        });
      }
      if (this.position !== 'current') {
        if (this.onLeave != null) {
          this.onLeave(this.position, elements);
        }
        $$(this, 'audio, video').forEach((media) => stopMedia(media));
      }
    }
  }

  static get styles () {
    return [
      atomOneLightCss,
      vsCss,
      defaultSlideStyles,
      codeBlocksStyles,
    ];
  }

}

const timeoutIds = new WeakMap();

export function playMedia (media, delay = 0) {
  if (media == null) {
    return;
  }
  const id = setTimeout(() => {
    try {
      media.pause();
      media.currentTime = 0;
      media.play();
    }
    catch (e) {
      console.log(e);
    }
  }, delay);
  timeoutIds.set(media, id);
}

export function stopMedia (media) {
  if (media == null) {
    return;
  }
  media.pause();
  media.currentTime = 0;
  if (timeoutIds.has(media)) {
    clearTimeout(timeoutIds.get(media));
    timeoutIds.delete(media);
  }
}
