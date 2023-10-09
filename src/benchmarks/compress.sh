gzip -f -1 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.1.gz
gzip -f -2 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.2.gz
gzip -f -3 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.3.gz
gzip -f -4 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.4.gz
gzip -f -5 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.5.gz
gzip -f -6 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.6.gz
gzip -f -7 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.7.gz
gzip -f -8 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.8.gz
gzip -f -9 jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.9.gz

zopfli -f jquery-3.7.1.min.js -c > jquery-3.7.1.min.js.zopfli.gz

brotli -f -q 1 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.1.br
brotli -f -q 2 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.2.br
brotli -f -q 3 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.3.br
brotli -f -q 4 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.4.br
brotli -f -q 5 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.5.br
brotli -f -q 6 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.6.br
brotli -f -q 7 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.7.br
brotli -f -q 8 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.8.br
brotli -f -q 9 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.9.br
brotli -f -q 10 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.10.br
brotli -f -q 11 jquery-3.7.1.min.js -o jquery-3.7.1.min.js.11.br
