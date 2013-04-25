var OAuth = require('oauth').OAuth;
var byline = require('byline');
var config = require('./config');
var byline = require('byline');


var oa = new OAuth('http://twitter.com/oauth/request_token',
  'http://twitter.com/oauth/access_token',
  config.consumer_key,
  config.consumer_secret,
  '1.0A', null, 'HMAC-SHA1');

var endpoint = 'https://userstream.twitter.com/1.1/user.json';
var req = oa.get(endpoint, config.access_token, config.access_secret);
req.on('response', function (res) {
  res.setEncoding('utf8');
  var ls = byline.createLineStream(res);

  ls.on('data', function(line) {
    if(line != '') {
      var data = JSON.parse(line);
      console.log(data);
    }
  });

  ls.on('end', function () {
    console.log('--- END ---');
  });
});
req.end();
