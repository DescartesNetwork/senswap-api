/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  port: 3001,
  tpm: 4, // times per minute
};

/**
 * Staging configurations
 */
configs.staging = {
  port: 80,
  tpm: 4, // times per minute
};

/**
 * Production configurations
 */
configs.production = {
  port: 80,
  tpm: 4, // times per minute
};

/**
 * Module exports
 */
module.exports = configs;