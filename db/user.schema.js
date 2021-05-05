const mongoose = require('mongoose');

/**
 * Schema
 */
const User = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'operator', 'admin'], required: true, default: 'user' }
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('User', User);