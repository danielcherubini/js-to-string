# js-to-string

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][cov-image]][cov-url] [![Greenkeeper badge](https://badges.greenkeeper.io/danmademe/js-to-string.svg)](https://greenkeeper.io/) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/51e27f21101e492fabf93dc6d81b8f28)](https://www.codacy.com/app/intothemild/js-to-string?utm_source=github.com&utm_medium=referral&utm_content=danmademe/js-to-string&utm_campaign=badger)


```js
const jsToString = require("js-to-string");

function foo(value) {
    let thing = true;
    let array = [1, 2, 3, 4, 5];
    if (!value) {
        thing = false;
    }
    return thing;
}

const stringFoo = jsToString(foo);
```


[npm-image]: https://badge.fury.io/js/js-to-string.svg
[npm-url]: https://npmjs.org/package/js-to-string
[travis-image]: https://travis-ci.org/danmademe/js-to-string.svg?branch=master
[travis-url]: https://travis-ci.org/danmademe/js-to-string
[daviddm-image]: https://david-dm.org/danmademe/js-to-string.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/danmademe/js-to-string
[cov-image]: https://codecov.io/gh/danmademe/js-to-string/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/danmademe/js-to-string

