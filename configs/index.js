const env = process.env.NODE_ENV;

const db = require('./db.config');
const settings = require('./settings.config');
const sol = require('./sol.config');

/**
 * Module exports
 */
module.exports = {
  db: db[env],
  settings: settings[env],
  sol: sol[env],
};
