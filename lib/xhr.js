var https = require('https');

/*
 * opts = { host: '', path: '' }
 *
 * https://nodejs.org/api/https.html
 */

module.exports = function (opts, callback) { 
  https.get(opts, function(response) {
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
};
