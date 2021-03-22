const configs = global.configs;
const swap = global.swap;

const db = require('../db');


module.exports = {

  /**
   * Middleware to parse pool data
   * @function parseNetwork
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  parseNetwork: function (req, res, next) {
    const { network } = req.body;
    if (!network || !network.address) return next('Invalid input');
    return swap.getNetworkData(network.address).then(data => {
      const { mints } = data;
      req.body.network.mints = mints;
      return next();
    }).catch(er => {
      return next(er);
    });
  },

  /**
   * Get an network
   * @function getNetwork
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getNetwork: function (req, res, next) {
    const { _id } = req.query;
    if (!_id) return next('Invalid input');

    return db.Network.findOne({ _id }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Get all networks
   * @function getNetworks
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getNetworks: function (req, res, next) {
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    return db.Network.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      { $skip: limit * page },
      { $limit: limit },
      { $project: { _id: 1 } }
    ]).exec(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re, pagination: { limit, page } });
    });
  },

  /**
   * Add a network
   * @function addNetwork
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addNetwork: function (req, res, next) {
    const { network } = req.body;
    if (!network) return next('Invalid input');

    const newNetwork = new db.Network({ ...network });
    return newNetwork.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },
}