"use strict";

// Get random tweet from @LOUDBOT
// 
// Usage:
// export LOUD_CONFIG=config.js   // absolute path to config file
// loud = require('loudbot');
// loud();
// output: GUYS I TRIED TO USE A MULTITHREADED REGEXP TO PARSE HTML BUT IT DIDN'T WORK: HELP???

// On error you'll get something similar to this
// { statusCode: 401,
//   data: '{"errors":[{"message":"Could not authenticate you","code":32}]}',
//   twitterReply: '{"errors":[{"message":"Could not authenticate you","code":32}]}' 
//  }

var Twit = require('twit');

var config = null;

if (process.env.LOUD_CONFIG) {
  config = require(process.env.LOUD_CONFIG);
} else {
  throw new Error('LOUD_CONFIG environment variable does\'t exist');
};

var T = new Twit(config);

// https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2&trim_user=true
var options = {
  screen_name: 'loudbot', 
  count: 200,
  trim_user: true,
  exclude_replies: true, 
  include_rts: false
};

var index = 0;
var tweet = '';
var replies = [];

// hit twitter only if the cached replies is empty
module.exports = function(cb) {
  if (replies.length === 0) {
    return hitTwitter(cb);  
  };
  
  index = Math.floor(Math.random() * (replies.length - 1));
  tweet = replies[index].text.replace(/^@[\S]+ /, '');
  replies.splice(index,1);

  if (cb) { return cb(null, tweet) };
  return console.log(tweet);
};

function hitTwitter(cb) {
  T.get('/statuses/user_timeline', options, function(err, reply) {
    if (err) {
      if(err.data) {
        err = JSON.parse(err.data);
        err = err.errors[0].message;
      };
    
      if (cb) { return cb(err); };
      return console.error(err);
    };

    index = Math.floor(Math.random() * (reply.length - 1));
    tweet = reply[index].text.replace(/^@[\S]+ /, '');
    reply.splice(index,1);
    replies = reply;

    if (cb) { return cb(null, tweet) };
    return console.log(tweet);
  });
};
