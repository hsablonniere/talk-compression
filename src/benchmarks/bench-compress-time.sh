hyperfine --warmup 3 --runs 10 'gzip -1 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'gzip -2 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'gzip -3 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'gzip -4 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'gzip -5 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'gzip -6 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'gzip -7 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'gzip -8 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'gzip -9 -c jquery-3.7.1.min.js > /dev/null'

hyperfine --warmup 3 --runs 10 'zopfli jquery-3.7.1.min.js -c > /dev/null'

hyperfine --warmup 3 --runs 10 'brotli -q 1 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 2 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 3 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 4 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 5 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 6 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 7 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 8 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 9 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 10 -c jquery-3.7.1.min.js > /dev/null'
hyperfine --warmup 3 --runs 10 'brotli -q 11 -c jquery-3.7.1.min.js > /dev/null'
