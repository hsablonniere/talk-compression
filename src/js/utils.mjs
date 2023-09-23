export function $$ (root, selector) {
  return Array.from(root.querySelectorAll(selector));
}

export function toCamelCase (text) {
  return text.replace(/-(.)/g, (all, letter) => letter.toUpperCase());
}

export function markup (text) {
  return text
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/\+(.*?)\+/g, '<span class="underline">$1</span>')
    .replace(/~(.*?)~/g, '<span class="strike-through">$1</span>')
    .replace(/#(.*?)#/g, '<mark>$1</mark>')
    .replace(/@(.*?)@/g, '<span class="time">$1</span>')
    .replace(/\$(.*?)\$/g, '<span class="question">$1</span>');
}

export function balance (text) {
  return text.includes('  ')
    ? text
      .replace(/ /g, '&nbsp;')
      .replace(/&nbsp;&nbsp;/g, ' ')
    : text;
}

export function trim (text) {
  return (typeof text === 'string') ? text.trim() : text;
}

export function entriesToObject (a, b, index, all) {
  if (index === all.length - 1) {
    return Object.fromEntries(all);
  }
}

export function getTitle () {
  return document.querySelector('title').textContent;
}

export function getMeta () {
  return Array
    .from(document.head.querySelectorAll('meta[name][content]'))
    .map((node) => {
      const name = toCamelCase(node.getAttribute('name'));
      const content = node.getAttribute('content');
      return [name, content];
    })
    .reduce(entriesToObject);
}

export function pipeline (input, ...fns) {
  let tmp = input;
  for (const fn of fns) {
    tmp = fn(tmp);
  }
  return tmp;
}

import twemoji from 'twemoji';

function emoji(text) {
  return twemoji.parse(text, (icon, options, variant) => {
    return '/src/emoji/' + icon + '.svg';
  });
}


