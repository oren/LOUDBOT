# Get a random tweet from @LOUDBOT

## Index

* [Example](#example)
* [Methods](#methods)
* [Install](#install)
* [Test](#test)

## Example

```js
export LOUD_CONFIG=/tmp/config.js
loud = require('loudbot');
loud();

// Output: GUYS I TRIED TO USE A MULTITHREADED REGEXP TO PARSE HTML BUT IT DIDN'T WORK: HELP???
```

`LOUD_CONFIG` is an environment variable with the absolute path to the config file. The file should look like:

```js
'use strict';

module.exports = {
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  ''
};
```

You get those keys after creating application on Twitter.  
If you don't have a twitter application, create one [here](https://dev.twitter.com/apps).

## Methods

```js
var loud = require('loudbot');
```

### loud(cb)

`cb(err, tweet)` is an optional callback. It fires with a random tweet as a string.

## Install

    npm install loudbot

## Test

    export LOUD_CONFIG=/tmp/config.js
    npm test
