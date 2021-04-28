const auth = require('./auth.controller');
const faucet = require('./faucet.controller');
const pool = require('./pool.controller');
const user = require('./user.controller');
const mint = require('./mint.controller');
const ping = require('./ping.controller');

module.exports = {
  auth,
  faucet,
  pool,
  user,
  mint,
  ping,
}