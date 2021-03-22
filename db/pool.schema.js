const mongoose = require('mongoose');

/**
 * Schema
 */
const Pool = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  network: { type: String, required: true },
  mint: { type: String, required: true },
  author: { type: String, required: true },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Pool', Pool);