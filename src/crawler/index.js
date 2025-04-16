var myRequest = require('request');

var headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

function crawlerRequest(url, callback) {
  var options = {
      url: url,
      encoding: null,
      headers: headers,
      timeout: 10000 
  }
  myRequest(options, callback)
}

module.exports = crawlerRequest;