'use strict';

export default function configurePlugin () {

  return function initPlugin (deck) {

    function activateSlide (index) {
      const indexToActivate = (0 <= index && index < deck.slides.length) ? index : 0;
      if (indexToActivate !== deck.slide()) {
        deck.slide(indexToActivate);
      }
    }

    const bc = new BroadcastChannel('multilang');
    bc.addEventListener('message', ({ data }) => {
      console.log(data.index);
      activateSlide(data.index);
    });

    deck.on('activate', ({ index }) => {
      bc.postMessage({ index });
    });
  };
}
