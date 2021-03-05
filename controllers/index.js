const auth = require('./auth.controller');
const faucet = require('./faucet.controller');
const pool = require('./pool.controller');
const user = require('./user.controller');
const mint = require('./mint.controller');

module.exports = {
  auth,
  faucet,
  pool,
  user,
  mint,
}