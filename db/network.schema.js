const mongoose = require('mongoose');

/**
 * Schema
 */
const Network = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  mints: { type: Array, required: true, default: [] }
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Network', Network);