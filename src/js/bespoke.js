'use strict';

// adapted from https://github.com/bespokejs/bespoke

function from ({ parentSelector, slidesSelector }, plugins = []) {

  const parent = document.querySelector(parentSelector);
  const slides = Array.from(parent.querySelectorAll(slidesSelector));
  let activeSlide;
  let listeners = {};

  function createEventData (el, eventData) {
    // console.log('createEventData', el, eventData);
    eventData = eventData || {};
    eventData.index = slides.indexOf(el);
    eventData.slide = el;
    return eventData;
  }

  function off (eventName, callback) {
    // console.log('off', eventName, callback);
    listeners[eventName] = (listeners[eventName] || []).filter((listener) => {
      return listener !== callback;
    });
  }

  function on (eventName, callback) {
    // // console.log('on', eventName, callback);
    (listeners[eventName] || (listeners[eventName] = [])).push(callback);
    return off.bind(null, eventName, callback);
  }

  function fire (eventName, eventData) {
    // // console.log('fire', eventName, eventData);
    return (listeners[eventName] || [])
      .reduce((notCancelled, callback) => {
        return notCancelled && callback(eventData) !== false;
      }, true);
  }

  function destroy (customData) {
    // console.log('destroy', customData);
    fire('destroy', createEventData(activeSlide, customData));
    listeners = {};
  }

  function activate (index, customData) {
    // console.log('activate', index, customData);
    if (!slides[index]) {
      return;
    }
    if (activeSlide) {
      fire('deactivate', createEventData(activeSlide, customData));
    }
    activeSlide = slides[index];
    fire('activate', createEventData(activeSlide, customData));
  }

  function slide (index, customData) {
    // console.log('slide', index, customData);
    if (arguments.length) {
      fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
    } else {
      return slides.indexOf(activeSlide);
    }
  }

  function step (offset, customData) {
    // console.log('step', offset, customData);
    const slideIndex = slides.indexOf(activeSlide) + offset;
    fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
  }

  const deck = {
    off,
    on,
    fire,
    slide,
    next: step.bind(null, 1),
    prev: step.bind(null, -1),
    parent,
    slides,
    destroy,
  };

  plugins.forEach((plugin) => plugin(deck));

  if (!activeSlide) {
    activate(0);
  }

  return deck;
};

export { from };
