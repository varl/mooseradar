'use strict';

var express = require('express'),
    get = require('./lib/xhr');

// setup local server parameters
var port = process.env.PORT || 3000,
    app = express();

// application-wide constants
var KEY = 'AIzaSyCJbM70-MigqM9NdfSkDMEMtM14W-JGA78',
    NEARBY_PATH = '/maps/api/place/nearbysearch/json',
    DETAILS_PATH = '/maps/api/place/details/json',
    SERVICE_URL = 'maps.googleapis.com';

/*
 * min/max lat:   -90/90    = 180 = 100%
 * min/max long:  -180/180  = 360 = 100%
 */

app.get('/place/:location/:type', function (req, res) {
  var location = req.params.location,
      type = req.params.type;

  var options = {
    key: KEY,
    radius: 300,
    rating: 4 
  };

  var url = NEARBY_PATH +
    '?location=' + location +
    '&key=' + options.key +
    '&radius=' + options.radius +
    '&rating=' + options.rating +
    '&type=' + type;

  var callback = function (client_res, body) {
    client_res.send(JSON.stringify(body));
  }.bind(null, res);

  return get({host: SERVICE_URL, path: url}, callback);
});

// serve the client assets
app.use(express.static('public'));

app.listen(port, function () {
    console.log('Example app listening on port %d!', port);
});
