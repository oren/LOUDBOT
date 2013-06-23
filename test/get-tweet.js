'use strict';

// Make sure to expor the LOUD_CONFIG environment variable before running the test
// export LOUD_CONFIG=../config.js

var test = require('tape');
var loud = require('../index.js');

test('get random tweet', function (t) {
  t.plan(1);

  loud(function(err, tweet) {
    if (err) {
      t.fail(err);
    };

    t.ok(tweet && typeof tweet === 'string');
  });
});
