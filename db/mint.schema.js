const mongoose = require('mongoose');

/**
 * Schema
 */
const Mint = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Mint', Mint);