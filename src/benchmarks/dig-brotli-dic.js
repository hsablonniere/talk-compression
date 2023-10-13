const brotliDic = require('./brotli-dic.raw.json');

const HTML_TAGS = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'search',
  'section',
  'select',
  'slot',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
];

const htmlWords = new Set();
const knownTags = [];
const unknownTags = [];

for (const tag of HTML_TAGS) {
  const sizeBefore = htmlWords.size;
  brotliDic.filter((word) => word.includes(`<${tag}/>`)).forEach((word) => htmlWords.add(word));
  brotliDic.filter((word) => word.includes(`<${tag} />`)).forEach((word) => htmlWords.add(word));
  brotliDic.filter((word) => word.includes(`<${tag}>`)).forEach((word) => htmlWords.add(word));
  brotliDic.filter((word) => word.includes(`<${tag} `)).forEach((word) => htmlWords.add(word));
  brotliDic.filter((word) => word.includes(`</${tag}>`)).forEach((word) => htmlWords.add(word));
  const sizeAfter = htmlWords.size;
  if (sizeAfter !== sizeBefore) {
    knownTags.push(tag);
  }
  else {
    unknownTags.push(tag);
  }
}

console.log(htmlWords);

console.log({
  knownTags,
  unknownTags,
});
