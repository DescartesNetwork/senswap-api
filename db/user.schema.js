var mongoose = require('mongoose');

/**
 * Schema
 */
var User = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  tokenAccounts: { type: Array, required: true, default: [] },
  lptAccounts: { type: Array, required: true, default: [] },
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('User', User);