const auth = require('./auth.controller');
const faucet = require('./faucet.controller');
const pool = require('./pool.controller');
const user = require('./user.controller');
const mint = require('./mint.controller');
const ping = require('./ping.controller');
const network = require('./network.controller');

module.exports = {
  auth,
  faucet,
  pool,
  user,
  mint,
  ping,
  network,
}