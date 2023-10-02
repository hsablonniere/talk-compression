import http from 'http';
import stream from 'stream';
import { hititipi } from 'hititipi';
import { logRequest } from 'hititipi/src/middlewares/log-request.js';
import { chainAll } from 'hititipi/src/middlewares/chain-all.js';
import { notFound } from 'hititipi/src/middlewares/not-found.js';
import { staticFile } from 'hititipi/src/middlewares/static-file.js';
import { setTimeout } from 'timers/promises';
import { contentEncoding } from './content-encoding.js';
import { cacheControl } from 'hititipi/src/middlewares/cache-control.js';

class SlowResponse extends stream.Transform {

  constructor (size, delay) {
    super();
    this.delay = delay;
    this.size = size;
    this.buffer = Buffer.from([]);
  }

  async _write (chunk, encoding, callback) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    const end = this.buffer.length - (this.buffer.length % this.size);
    for (let i = 0; i < end; i += this.size) {
      await setTimeout(this.delay);
      const slice = this.buffer.slice(i, i + this.size);
      this.push(slice, encoding);
    }
    this.buffer = this.buffer.slice(end);
    callback();
  }

  _final () {
    this.push(this.buffer);
    this.push(null);
  }
}

http
  .createServer(
    hititipi(
      logRequest(
        chainAll([
          staticFile({ root: 'public' }),
          cacheControl({ 'no-store': true }),
          (context) => {
            const compress = context.requestUrl.searchParams.get('compress');
            const gzip = compress === 'gzip';
            return contentEncoding({ gzip });
          },
          (context) => {
            const speed = context.requestUrl.searchParams.get('speed');
            if (speed == null) {
              return;
            }
            const [size, delay] = speed.split(',').map((str) => Number(str));
            const responseTransformers = [
              ...context.responseTransformers,
              new SlowResponse(size, delay),
            ];
            return { ...context, responseTransformers };
          },
          notFound(),
        ]),
      ),
    ),
  )
  .listen(8081);
