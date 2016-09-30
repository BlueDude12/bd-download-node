var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


console.log("here in index.js");

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'hk0XBfSvWboyV8kMIhWRQY7jf',
  consumer_secret: 'x0do8FoZhLVPM0fHyFeeyIwc3bQmQsjBvHbWonTgV63Hnqc9z9',
  access_token_key: '701430958784802816-QKKk5iWWLAdiRerTJ9TftdKcIB2ssTn',
  access_token_secret: 'yU9ES0gsA72ux72smaumol6tk5AsfOBxcEOx1A7LJjFLG'
});
 
var params = {screen_name: 'BlueDude12'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log("Have " + tweets.length + " tweets available");
  } else {
  	console.log(error);
  }
});




var Twit = require('twit')

var T = new Twit({
  consumer_key:         'hk0XBfSvWboyV8kMIhWRQY7jf',
  consumer_secret:      'x0do8FoZhLVPM0fHyFeeyIwc3bQmQsjBvHbWonTgV63Hnqc9z9',
  access_token:         '701430958784802816-QKKk5iWWLAdiRerTJ9TftdKcIB2ssTn',
  access_token_secret:  'yU9ES0gsA72ux72smaumol6tk5AsfOBxcEOx1A7LJjFLG',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var stream = T.stream('statuses/filter', { track: 'NeverTrump' })
stream.on('tweet', function (tweet) {
  console.log(tweet.text)
})

var stream = T.stream('statuses/filter', { track: ['Evan McMullin'] })
stream.on('tweet', function (tweet) {
  console.log(tweet.text)
// 		T.post('statuses/update', { status: 'Who?' }, function(err, data, response) {
// 			//.
// 			console.log(data)
// 		})
})



//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})


var stream = T.stream('user')

stream.on('tweet', function (tweet) {
	console.log("Received tweet");
	console.log("\"" + tweet.text + "\"");
	console.log("\n");
	
	var urls = tweet.entities.urls || [];
	
	console.log("URLs = " + JSON.stringify(urls));
	
	for (var i = 0; i < urls.length; i ++) {
		
		var url = urls[i].expanded_url;
		
		console.log(url);
	}
	
	console.log(tweet.text);
	
	if (0 == tweet.text.indexOf("foo")) {
	
		console.log("***** POSTING RESPONSE *****");
		
		T.post('statuses/update', { status: 'bar ' + Date.now() }, function(err, data, response) {
			//.
			console.log(data)
		})
		
	} else {
		console.log("***** Doesnt start with 'foo' *****");
	}
	
})
