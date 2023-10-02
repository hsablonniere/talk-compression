import isCompressible from 'compressible';
import zlib, { createBrotliCompress, createGzip } from 'zlib';
import { transformEtag } from 'hititipi/src/lib/etag.js';

// TODO add test without etag
export function contentEncoding (options = {}) {

  return async (context) => {

    if (context.responseBody == null || !isCompressible(context.responseHeaders['content-type'])) {
      return;
    }

    // Very naïve way to do this #sorry
    const acceptedEncodings = (context.requestHeaders['accept-encoding'] || '')
      .toLowerCase()
      .split(',')
      .map((encoding) => encoding.trim());

    if (options.brotli && acceptedEncodings.includes('br')) {

      const responseHeaders = { ...context.responseHeaders, 'content-encoding': 'br', 'vary': 'accept-encoding' };

      if (context.brotliFile != null) {
        return { ...context, responseHeaders, ...context.brotliFile };
      }
      else {
        const responseTransformers = [
          ...context.responseTransformers,
          createBrotliCompress({
            params: {
              [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
              [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
              [zlib.constants.BROTLI_PARAM_SIZE_HINT]: context.responseSize,
            },
          }),
        ];
        // Don't try to compute reponseSize post compression, can be done with another middleware
        const responseSize = null;
        // Don't try to compute new strong etag
        const responseEtag = transformEtag(context.responseEtag, '.br');
        return { ...context, responseHeaders, responseTransformers, responseSize, responseEtag };
      }
    }

    if (options.gzip && acceptedEncodings.includes('gzip')) {

      const responseHeaders = { ...context.responseHeaders, 'content-encoding': 'gzip', 'vary': 'accept-encoding' };

      if (context.gzipFile != null) {
        return { ...context, responseHeaders, ...context.gzipFile };
      }
      else {
        const responseTransformers = [
          ...context.responseTransformers,
          createGzip({ level: 6 }),
        ];
        // Don't try to compute reponseSize post compression, can be done with another middleware
        const responseSize = null;
        // Don't try to compute new strong etag
        const responseEtag = transformEtag(context.responseEtag, '.gz');
        return { ...context, responseHeaders, responseTransformers, responseSize, responseEtag };
      }
    }
  };
}
