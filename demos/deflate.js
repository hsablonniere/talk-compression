



















import { deflateRawSync, deflateSync, gzipSync, brotliCompressSync } from 'zlib';

// const source = 'Lorem ipsum dolor sit amet.';
// let source = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat dui at leo porta dignissim. Etiam ut purus ultrices, pulvinar tellus quis, cursus massa. Mauris dignissim accumsan ex, at vestibulum lectus fermentum id. Quisque nec magna arcu. Quisque in metus sed erat sodales euismod eget id purus. Sed sagittis rhoncus mauris. Ut sit amet urna ac nunc semper porta. Nam ut felis eu velit luctus rutrum. Nam leo nisl, molestie a varius non, ullamcorper sit amet tortor. Donec in convallis ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent hendrerit venenatis erat, eu malesuada nulla viverra eu. Curabitur porta risus augue, non rutrum lectus hendrerit a. Sed volutpat dolor nec rutrum vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer rhoncus turpis orci, at tempor tortor scelerisque varius. Integer nec fermentum dui. Integer vitae dolor sit amet erat ullamcorper elementum. Donec blandit lacinia erat, vitae blandit libero ornare id. In luctus odio a lacus dignissim, id posuere tortor lacinia. Pellentesque sed massa ac tellus tincidunt rutrum. Praesent commodo enim nibh, ut consectetur tortor consequat non. Aliquam mi enim, mattis eu velit quis, sollicitudin fringilla ex. Donec at augue ultrices, porta justo in, mattis tortor. Nunc sollicitudin nisi eget urna condimentum semper. Pellentesque sagittis quam eu mollis viverra. Proin tincidunt auctor nibh quis suscipit.';
const source = 'Hello. The bar';
// const source = 'Hello@ Piz bar';

const sourceDeflate = deflateSync(source);
const sourceDeflateRaw = deflateRawSync(source);
const sourceGzip = gzipSync(source);
const sourceBrotli = brotliCompressSync(source);

console.log('');

console.log('SOURCE:');
console.log(source);
console.log('');

console.log('SOURCE HEX:', Buffer.from(source).length);
console.log(Buffer.from(source));
console.log('');

console.log('SOURCE DEFLATE:', sourceDeflate.length);
console.log(sourceDeflate);
console.log('');

console.log('SOURCE DEFLATE RAW:', sourceDeflateRaw.length);
console.log(sourceDeflateRaw);
console.log('');

console.log('SOURCE GZIP:', sourceGzip.length);
console.log(sourceGzip);
console.log('');

console.log('SOURCE BROTLI:', sourceBrotli.length);
console.log(sourceBrotli);
console.log('');
