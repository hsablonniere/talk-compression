import { takeScreenshot } from './screenshot.js';
import chokidar from 'chokidar';
import fs from 'fs-extra';

async function run () {

  // await takeScreenshot('http://localhost:8080/index.slides.html', 'src/img/poster_4-3.jpg', {
  //   width: 1920,
  //   height: 1440,
  // }, true);

  // await takeScreenshot('http://localhost:8080/index.slides.html', 'src/img/poster_16-9.jpg', {
  //   width: 1920,
  //   height: 1080,
  // }, true);

  const observedPaths = ['./*.slides.md'];
  const watcher = chokidar.watch(observedPaths, {
    persistent: true,
    // ignoreInitial: true,
  });

  async function onchange (path) {

    if (path.endsWith('___jb_tmp___') || path.endsWith('___jb_old___')) {
      return;
    }

    const contents = await fs.readFile(path, 'utf-8');
    console.log('Changed: ' + path);

    Promise.all(
      contents
        .split('\n')
        .filter((line) => !line.startsWith('<!--'))
        .map((line) => line.match(/<img src="(.*)" screenshot-url="(.*)"/))
        .filter((matches) => matches != null)
        .map((matches) => {
          const [filename, url] = matches.slice(1);
          console.log(`Screenshot from ${url} to ${filename} ??`);
          return takeScreenshot(url, filename);
        }),
    );

    // console.log('add/change', path);
    // if (path.startsWith('src/templates')) {
    //   return Promise.all([
    //     buildSlideDeck('src/slide-deck/slide-deck.fr.adoc'),
    //     buildSlideDeck('src/slide-deck/slide-deck.en.adoc'),
    //   ]);
    // }
    // if (path === 'src/slide-deck/slide-deck.fr.adoc') {
    //   return Promise.all([
    //     buildSlideDeck('src/slide-deck/slide-deck.fr.adoc'),
    //   ]);
    // }
    // if (path === 'src/slide-deck/slide-deck.en.adoc') {
    //   return Promise.all([
    //     buildSlideDeck('src/slide-deck/slide-deck.en.adoc'),
    //   ]);
    // }
    // return bs.reload(path);
  }

  watcher.on('add', onchange);
  watcher.on('change', onchange);

}

run()
  .then(console.log)
  .catch((e) => {
    process.exit(1);
    console.error(e);
  });
