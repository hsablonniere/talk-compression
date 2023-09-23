'use strict';

// adapted from https://github.com/bespokejs/bespoke-hash/blob/master/lib/bespoke-hash.js

export default function configurePlugin () {

  return function initPlugin (deck) {

    function activateSlide (index) {
      const indexToActivate = (0 <= index && index < deck.slides.length) ? index : 0;
      if (indexToActivate !== deck.slide()) {
        deck.slide(indexToActivate);
      }
    }

    function parseHash () {
      const hash = window.location.hash.slice(1);
      const slideNumber = parseInt(hash, 10);
      // console.log(deck.slide(), hash, slideNumber);
      if (!Number.isNaN(slideNumber) && slideNumber !== deck.slide()) {
        activateSlide(slideNumber);
      }
    }

    deck.on('destroy', () => {
      window.removeEventListener('hashchange', parseHash);
    });

    window.addEventListener('hashchange', parseHash);

    deck.on('activate', (e) => {
      window.location.replace(`#${e.index}`);
    });

    // make sure we do this after all plugins are setup
    parseHash();
  };
}
