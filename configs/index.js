var env = process.env.NODE_ENV;

var settings = require('./settings.config');
var db = require('./db.config');

/**
 * Module exports
 */
module.exports = {
  settings: settings[env],
  db: db[env],
};
