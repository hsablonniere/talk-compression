'use strict';

export default function configurePlugin () {

  return function initPlugin (deck) {

    const metas = {};
    Array.from(document.querySelectorAll('head meta[name]')).forEach((meta) => {
      metas[meta.getAttribute('name')] = meta.getAttribute('content');
    });

    const steps = deck.slides.map((slide, slideIdx) => {
      const notes = slide.nextElementSibling != null && slide.nextElementSibling.classList.contains('notes')
        ? slide.nextElementSibling.innerHTML
        : '';
      return {
        cursor: String(slideIdx),
        states: [],
        notes,
      };
    });

    const details = {
      title: document.title || '',
      metas,
      steps,
    };

    const recordingTs = new Date().getTime();
    const events = [];

    window.addEventListener('message', ({ source, data: { command, commandArgs } }) => {
      if (command === 'get-slide-deck-details') {
        return source.postMessage({ event: 'slide-deck-details', eventData: { details } }, '*');
      }
      if (command === 'go-to-step') {
        const { cursor } = commandArgs;
        deck.slide(Number(cursor));
        let theSlide = deck.slides[deck.slide()];
        const viewport = theSlide.dataset.viewport;

        const ts = new Date().getTime();
        events.push({ ts: ts - recordingTs, cursor });
        // localStorage.setItem(`recording-${recordingTs}`, JSON.stringify(events));

        if (viewport != null) {
          return source.postMessage({ event: 'set-viewport', eventData: { viewport } }, '*');
        }
        return;
      }
      if (command === 'toggle-slide-deck-state') {
        const { state, enabled } = commandArgs;
        deck.fire('toggle-slide-deck-state', { slideIndex: deck.slide(), state, enabled });
      }
      // console.debug(`unknown protocol command ${command} with args`, commandArgs);
    });
  };
}
