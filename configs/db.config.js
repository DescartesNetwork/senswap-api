/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  // MongoDB
  MONGO_HOST: 'mongodb://localhost/senswap_api_dev',
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: false,
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 0,
}

/**
 * Development configurations
 */
configs.staging = {
  // MongoDB
  MONGO_HOST: `mongodb+srv://${null /* username */}:${null /* password */}@cluster0-rl4kc.mongodb.net/${null /* dbname */}?retryWrites=true&w=majority`,
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: false,
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 0,
}

/**
 * Production configurations
 */
configs.production = {
  // MongoDB
  MONGO_HOST: null,
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: true,
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 0,
}

/**
 * Module exports
 */
module.exports = configs;
