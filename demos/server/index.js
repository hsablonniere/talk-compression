import http from 'http';
import { hititipi } from 'hititipi';
import { logRequest } from 'hititipi/src/middlewares/log-request.js';
import { chainAll } from 'hititipi/src/middlewares/chain-all.js';
import { chainUntilResponse } from 'hititipi/src/middlewares/chain-until-response.js';
import { serverName } from 'hititipi/src/middlewares/server-name.js';
import { socketId } from 'hititipi/src/middlewares/socket-id.js';
import { contentEncoding } from 'hititipi/src/middlewares/content-encoding.js';
import { contentLength } from 'hititipi/src/middlewares/content-length.js';
import { notModified } from 'hititipi/src/middlewares/not-modified.js';
import { notFound } from 'hititipi/src/middlewares/not-found.js';
import { route } from 'hititipi/src/middlewares/route.js';
import {sendFileSlowStream} from "./sendFileSlowStream.js";



http
    .createServer(
        hititipi(
            logRequest(
                chainAll([
                    chainUntilResponse([
                        route('*', '/', (context) => sendFileSlowStream(context, 200)),
                    ]),
                    serverName({ serverName: 'hititipi-json' }),
                    socketId(),
                    contentEncoding({ gzip: true, brotli: true }),
                    contentLength(),
                    notModified({ etag: true, notModified: true }),
                    notFound(),
                ]),
            ),
        ),
    )
    .listen(8080);
