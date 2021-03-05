const mongoose = require('mongoose');

/**
 * Schema
 */
const Pool = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  mint: { type: String, required: true },
  symbol: { type: String, required: true },
  email: { type: String, required: true },
  cgk: { type: String, required: true }, // CoinGecko API
  verified: { type: Boolean, default: false },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Pool', Pool);