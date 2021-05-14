const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ssjs = require('senswapjs');

const middlewares = require('./helpers/middlewares');

const env = process.env.NODE_ENV || 'development';

/**
 * Watch env
 */
console.info('*** Environment:', env);

/**
 * Configs
 */
const configs = require('./configs');
global.configs = configs;

/**
 * Creating a MongoDB connection
 */
mongoose.Promise = Promise;
mongoose.set('debug', configs.db.MONGO_DEBUG_MODE);
mongoose.connect(configs.db.MONGO_HOST, configs.db.MONGO_CONNECT_OPTION, function (er) {
  if (er) throw er;
  console.info('*** Database successfully connected');
});

/**
 * Creating express server
 */
const app = express();
const server = http.createServer(app);

/**
 * Middlewares
 */
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middlewares.filterBody);
app.use(middlewares.parseParams);

/**
 * SenswapJS
 */
const { sol: { node, swapAddress, spltAddress, splataAddress } } = configs;
global.splt = new ssjs.SPLT(spltAddress, splataAddress, node);
global.swap = new ssjs.LiteSwap(swapAddress, spltAddress, splataAddress, node);

/**
 * Router
 */

// Main APIs
const api = require('./routes/api');
app.use('/', api);

// Error handler
const { uncatchableAPI, errorHandler } = require('./routes/error');
app.use(uncatchableAPI);
app.use(errorHandler);

/**
 * Start server
 */
server.listen(configs.settings.port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof configs.settings.port === 'string' ? 'Pipe ' + configs.settings.port : 'Port ' + configs.settings.port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      return process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      return process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.info('*** Listening on ' + bind);
}