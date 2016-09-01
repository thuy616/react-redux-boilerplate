'use strict';

var config = {};

config.port = process.env.PORT || 8080;
config.env = process.env.NODE_ENV || 'development';
config.cookieSecret = process.env.COOKIE_SECRET || 'cypC88uZYmNFYsrRnPHKPAsriwpqUNhXVXrQOe5kGAe';
config.clientId = process.env.CLIENT_ID || 'aF2xUgsBQqkLFmXwDKQgP8dLe';
config.clientSecret = process.env.CLIENT_SECRET || 'BPaXFopxaZZ72wh';

if (config.env === 'development' || config.env === 'test') {
  config.apiBaseUrl = 'https://detour-api-v2-staging.herokuapp.com/v2'
  // config.apiBaseUrl = 'http://localhost:3100';
} else if (config.env === 'staging') {
  config.apiBaseUrl = 'https://detour-api-v2-staging.herokuapp.com/v2'
} else {
  config.apiBaseUrl = 'https://api.detour.com'
}

module.exports = config;