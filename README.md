# js-to-string

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][cov-image]][cov-url] [![Greenkeeper badge](https://badges.greenkeeper.io/danmademe/js-to-string.svg)](https://greenkeeper.io/)


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

