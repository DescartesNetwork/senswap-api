const { DBUSERNAME, DBPASSWORD } = process.env


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
  MONGO_HOST: `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@cluster0.evt3v.mongodb.net/senswap_api_testnet?retryWrites=true&w=majority`,
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
  MONGO_HOST: `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@cluster1-pl-0.evt3v.mongodb.net/senswap_api_mainnet?retryWrites=true&w=majority`,
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
