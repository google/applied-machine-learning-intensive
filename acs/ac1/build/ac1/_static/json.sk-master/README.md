json.sk
=======

JSON module for Skulpt

## Current Support

This module is an attempt to reproduce some of the functionality provided by the Python JSON module for use in [Skulpt](http://www.skulpt.org/).

### dump vs dumps

So far, only dumps and its loads counterpart are supported. dump and load deal with streams whereas dumps and loads operate on strings.


### dumps keyword arguments

While support of all arguments is far from complete this implementation passes many of the tests found in the Python distribution. Supported keyword arguments are:

* indent
* ensure_ascii
* separators
* sort_keys

### loads

No arguments for loads are currently supported. This implementation relies on the browser implementation of JSON.parse and Skulpt's ffi.remapToPy.

### Python docs

Complete spec of the Python 2.x JSON implementation can be found at https://docs.python.org/2/library/json.html.

## TODO

While there is much to do to fully support the Python implementation, transformation for basic objects works quite well.

### dumps

Remaining keyword arguments to support include:

* shipkeys
* check_circular
* allow_nan
* cls
* encoding
* default

## Getting Started

Create a basic html page:

```html
<!-- @TODO: replace with example markup... -->
```

Add the json.sk specific Skulpt configuration options
```js
// tell Skulpt where to find json.sk and its dependencies
Sk.externalLibraries = {
  json : {
    path : '/path/to/json.sk/__init__.js',
    dependencies : [
      '/path/to/json.sk/stringify.js'
    ]
  }
};
```

Point your browser to your html page and have fun!

## Dependencies

Currently relies on a [browserify](https://github.com/substack/node-browserify)'d version of [json-stable-stringify](https://github.com/substack/json-stable-stringify).
