'use strict';

export default function configurePlugin () {

  const startTimeCache = new WeakMap();

  return function initPlugin (deck) {

    deck.on('activate', ({ slide }) => {
      Array.from(slide.querySelectorAll('video'))
        .forEach((video) => {
          const startTime = startTimeCache.get(video);
          if (!startTime) {
            startTimeCache.set(video, video.currentTime);
          }
          return video.play();
        });
    });

    deck.on('deactivate', ({ slide }) => {
      Array.from(slide.querySelectorAll('video'))
        .forEach((video) => {
          video.pause();
          const startTime = startTimeCache.get(video);
          video.currentTime = startTime;
        });
    });
  };
}
