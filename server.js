var express = require('express');
var app = express();
var https = require('https');

var KEY = 'AIzaSyCJbM70-MigqM9NdfSkDMEMtM14W-JGA78',
    NEARBY_PATH = '/maps/api/place/nearbysearch/json'
    SERVICE_URL = 'maps.googleapis.com';

app.get('/place/:location', function (req, res) {
  console.log('bing');

  var options = {
    details_url: SERVICE_URL + '/details/json',
    key: KEY,
    radius: 300,
    type: 'restaurant',
    rating: 4 
  };

  var url = NEARBY_PATH +
    '?location='+ req.params.location +
    '&key=' + options.key +
    '&radius=' + options.radius +
    '&rating=' + options.rating +
    '&type=' + options.type;

  function callback(response) {
    console.log(response);

    res.send(JSON.stringify(response)); //send this back to the client
  }

  https.get({
    host: SERVICE_URL,
    path: url,
  }, function(response) {
    // Continuously update stream with data
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      // Data reception is done, do whatever with it!
      var parsed = JSON.parse(body);
      callback(parsed);
    });
  });
});




app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
