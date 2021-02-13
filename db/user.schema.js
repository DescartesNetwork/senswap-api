const mongoose = require('mongoose');

/**
 * Schema
 */
const User = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  tokens: { type: Array, required: true, default: [] },
  delegates: { type: Array, required: true, default: [] },
  pools: { type: Array, required: true, default: [] },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('User', User);