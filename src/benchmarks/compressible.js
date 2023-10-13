const mimeDb = require('./mime-db.json');

const compressible = Object
  .entries(mimeDb)
  .filter(([mime, obj]) => obj.compressible)
  .map(([mime]) => mime)
  .filter((mime) => {
    return true
      && !mime.includes('text')
      && !mime.includes('xml')
      && !mime.includes('json')
  });

console.log(compressible.join('\n'));
