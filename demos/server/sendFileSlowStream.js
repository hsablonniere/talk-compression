import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import {getStrongEtagHash} from "hititipi/src/lib/etag.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function asyncTimeout(callback){
    return new Promise((resolve) => {
        setTimeout(() => {
            callback()
            resolve()
        }, 10)
    })
};
export async function sendFileSlowStream(context, status) {
    const responseStatus = status;
    const content = fs.readFileSync(path.join(__dirname, '../data/rfc_gzip.html'), 'utf-8')
    const contentByPage = content.split('<hr class="noprint">');
    const readableStream = new Readable({
        read() {
            return contentByPage.reduce((previous, currentValue) => {
                return previous.then(() =>  console.log("yeah", currentValue)).then(asyncTimeout(() => this.push(currentValue)))
            }, Promise.resolve())
        }
    })
    const responseBody = readableStream;
    const responseSize = content.length;
    const responseEtag = getStrongEtagHash(content);
    const responseHeaders = {
        ...context.responseHeaders,
        'content-type': 'text/html; charset=utf-8',
    };
    return {...context, responseStatus, responseHeaders, responseBody, responseSize, responseEtag};
}
