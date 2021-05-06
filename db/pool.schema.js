const mongoose = require('mongoose');

/**
 * Schema
 */
const Pool = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  mintLPT: { type: String, required: true },
  mintS: { type: String, required: true },
  mintA: { type: String, required: true },
  mintB: { type: String, required: true },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Pool', Pool);