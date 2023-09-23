'use strict';

const fs = require('fs-extra');
let puppeteer;
puppeteer = require('puppeteer');

const defaultViewport = {
  width: 1500,
  height: 1050,
  isLandscape: true,
};

function wait (delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function takeScreenshot (url, filename, customViewport, force = false) {

  if (puppeteer == null) {
    return Promise.resolve();
  }

  const viewport = Object.assign({}, defaultViewport);
  Object.assign(viewport, customViewport);

  viewport.deviceScaleFactor = viewport.deviceScaleFactor || (2880 / viewport.width);

  const exists = await fs.pathExists(filename);
  if (exists && force === false) {
    return Promise.resolve();
  }

  const browser = await puppeteer.launch({
    // headless:false,
  });
  const page = await browser.newPage();

  await page.setViewport(viewport);
  await page.goto(url);

  if (url.includes('rfc-editor.org')) {
    await page.addStyleTag({
      // language=CSS
      content: `
        body {
          font-size: 1.5em;
          margin: 0 auto;
          width: 35em;
        }
        .h1 {
          display: block;
          font-size: 1.5em;
          text-align: center;
          white-space: normal;
        }
      `,
    });
  }

  // if (url.includes('github.com')) {
  //   console.log('inject');
  //   await page.addStyleTag({
  //     content: `.commit-tease, .file-wrap, .signup-prompt-bg { display: none }`,
  //   });
  // }

//   if (url.includes('caniuse.com')) {
//
//     await page.evaluate(() => localStorage.setItem('config-agents', 'ie,edge,firefox,chrome,safari,ios_saf,and_chr,samsung'));
//     await page.evaluate(() => localStorage.setItem('config-default_showmode', '0'));
//     await page.evaluate(() => localStorage.setItem('config-default_viewmode', 'view-mode-normal'));
//     await page.reload();
//     await wait(1000);
//
//     console.log('inject');
//     await page.addStyleTag({
//       content: `.feature-title { font-weight: bold; font-size: 3em; }
// .support-list h4 { height:55px; font-weight: bold; font-size: 1.2em; }
// .stat-cell { font-weight: bold; font-size: 1.6em; }
// .view-mode-control { display: none; }`,
//     });
//
//     const element = await page.$('.feature-block');
//     await element.screenshot({ path: filename });
//   }
//   else if (url.includes('twitter.com') && url.includes('/status/')) {
//
//     console.log('inject');
//     await page.addStyleTag({
//       content: `.js-banners { display: none; }`,
//     });
//     await wait(1000);
//
//     const element = await page.$('.permalink-tweet-container');
//     await element.screenshot({ path: filename });
//   }
//   else {
//     // LOOOOOOOOOOOOOOOOOOOOL
//     if (url.startsWith('https://www.clever-cloud.com/doc/clever-components/')) {
//       await wait(15000);
//     }
//     await wait(3000);
//     await page.screenshot({ path: filename });
//   }

  await wait(3000);
  await page.screenshot({ path: filename });

  console.log(`saving file to ${filename}`);

  // await browser.close();
}

module.exports = { takeScreenshot };
