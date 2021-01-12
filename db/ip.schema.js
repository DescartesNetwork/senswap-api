const mongoose = require('mongoose');

/**
 * Schema
 */
const IP = new mongoose.Schema({
  ipAddress: { type: String, required: true, unique: true },
  tpm: { type: Number, default: 0 },
  expireAt: { type: Date, default: Date.now, index: { expires: 60 } },
});

/**
 * Module exports
 */
module.exports = mongoose.model('IP', IP);