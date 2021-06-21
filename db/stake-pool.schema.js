const mongoose = require('mongoose');

/**
 * Schema
 */
const stakePool = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  mintShare: { type: String, required: true },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('stakePool', stakePool);